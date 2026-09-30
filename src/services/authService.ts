import { AdminUser, UserRole } from '../types';
import { checkLoginLockout, recordFailedLogin, clearLoginLockout, sanitizeText } from '../utils/securityUtils';
import { db, auth } from './firebase';
import { collection, doc, setDoc, deleteDoc, getDocs, onSnapshot } from 'firebase/firestore';
import { createUserWithEmailAndPassword } from 'firebase/auth';

const STORAGE_KEY_USERS = 'ntolo_admin_users_v1';
const STORAGE_KEY_SESSION = 'ntolo_admin_session_v1';
export const EVENT_ADMIN_AUTH_CHANGED = 'ntolo_admin_auth_changed';
const SESSION_MAX_AGE_MS = 12 * 60 * 60 * 1000; // 12 heures d'expiration automatique

// Quota strict de 5 personnes maximum autorisées à modifier le portail
export const MAX_ADMIN_USERS = 5;

// Sel cryptographique fixe pour garantir le hachage sécurisé
const CRYPTO_SALT = 'ntolo_village_moungo_sec_salt_2026_#';

/**
 * Fonction de hachage cryptographique SHA-256 avec salage.
 * Les mots de passe ne sont JAMAIS stockés en clair.
 */
export async function hashPassword(plainText: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(CRYPTO_SALT + plainText.trim());
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
}

// Utilisateurs initiaux autorisés (Avec Sa Majesté comme Administrateur Principal)
// Mots de passe initiaux par défaut : Ntolo2026! (hash: 6c5c0ca1a2560581117e8387f4a8e6ad0990fb93c5e54cb6a5012a19017ea674)
const INITIAL_USERS: AdminUser[] = [
  {
    id: 'usr-admin-1',
    fullName: 'Sa Majesté le Chef Traditionnel de Ntolo',
    email: 'admin@ntolo-village.cm',
    username: 'admin',
    role: 'administrateur_principal',
    passwordHash: '6c5c0ca1a2560581117e8387f4a8e6ad0990fb93c5e54cb6a5012a19017ea674',
    active: true,
    createdAt: '2026-01-01',
    lastLogin: '2026-09-29 09:30',
    avatar: 'Crown',
    isSuperAdmin: true,
    addedBy: 'Fondation Royale de Ntolo',
  },
  {
    id: 'usr-editeur-2',
    fullName: 'Secrétaire Général & Communication CODEV',
    email: 'editeur@ntolo-village.cm',
    username: 'editeur',
    role: 'editeur',
    passwordHash: '5e135c4bfa2206034512a55339ee77dcfd9b73868f06d19de36bd90e7094834f',
    active: true,
    createdAt: '2026-01-15',
    lastLogin: '2026-09-28 17:15',
    avatar: 'Edit3',
    addedBy: 'Sa Majesté le Chef Traditionnel',
  },
  {
    id: 'usr-redacteur-3',
    fullName: 'Délégué aux Médias, Archives & Galerie',
    email: 'galerie@ntolo-village.cm',
    username: 'gestionnaire',
    role: 'gestionnaire_contenu',
    passwordHash: '1d3ff035274d5015bf44a6e1f2ee86efa898166cb25c09591854f724ed7c44e0',
    active: true,
    createdAt: '2026-02-01',
    lastLogin: '2026-09-27 11:40',
    avatar: 'FolderHeart',
    addedBy: 'Sa Majesté le Chef Traditionnel',
  },
];

/**
 * Initialise la synchronisation Firestore pour la collection des administrateurs
 */
export function initAuthSync() {
  if (typeof window === 'undefined') return;

  try {
    const colRef = collection(db, 'admin_users');

    onSnapshot(colRef, (snapshot) => {
      if (!snapshot.empty) {
        const firestoreUsers: AdminUser[] = [];
        snapshot.forEach((docSnap) => {
          firestoreUsers.push(docSnap.data() as AdminUser);
        });

        if (firestoreUsers.length > 0) {
          localStorage.setItem(STORAGE_KEY_USERS, JSON.stringify(firestoreUsers));
          window.dispatchEvent(new CustomEvent(EVENT_ADMIN_AUTH_CHANGED));
        }
      } else {
        // First boot: Seed initial users into Firestore
        INITIAL_USERS.forEach(async (u) => {
          try {
            await setDoc(doc(db, 'admin_users', u.id), u);
          } catch (e) {
            console.warn('Initial admin seed Firestore warning:', e);
          }
        });
      }
    }, (err) => {
      console.warn('Firestore onSnapshot admin_users:', err);
    });
  } catch (err) {
    console.warn('Erreur initAuthSync:', err);
  }
}

// Lancement automatique du sync
initAuthSync();

/**
 * Récupère la liste des utilisateurs du système
 */
export function getStoredUsers(): AdminUser[] {
  if (typeof window === 'undefined') return INITIAL_USERS;
  try {
    const raw = localStorage.getItem(STORAGE_KEY_USERS);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY_USERS, JSON.stringify(INITIAL_USERS));
      return INITIAL_USERS;
    }
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed) || parsed.length === 0) {
      localStorage.setItem(STORAGE_KEY_USERS, JSON.stringify(INITIAL_USERS));
      return INITIAL_USERS;
    }
    return parsed;
  } catch (e) {
    console.error('Erreur lecture utilisateurs:', e);
    return INITIAL_USERS;
  }
}

/**
 * Enregistre ou met à jour un administrateur dans la base locale et Firestore
 * Enforce le quota strict de 5 administrateurs au maximum.
 */
export function saveUser(user: AdminUser, operatorName?: string): AdminUser[] {
  const users = getStoredUsers();
  const index = users.findIndex((u) => u.id === user.id);

  // Si c'est un nouvel administrateur et qu'on a déjà 5 comptes
  if (index < 0 && users.length >= MAX_ADMIN_USERS) {
    throw new Error(
      `Quota maximal atteint : Seules ${MAX_ADMIN_USERS} personnes sont autorisées à disposer des droits de modification sur le portail officiel de Ntolo. Supprimez ou désactivez un compte existant avant d'en ajouter un nouveau.`
    );
  }

  const userToSave: AdminUser = {
    ...user,
    addedBy: user.addedBy || operatorName || 'Administrateur Principal',
  };

  let updated: AdminUser[];
  if (index >= 0) {
    updated = [...users];
    updated[index] = userToSave;
  } else {
    updated = [...users, userToSave];
  }

  localStorage.setItem(STORAGE_KEY_USERS, JSON.stringify(updated));

  // Sync to Firestore in real time
  try {
    setDoc(doc(db, 'admin_users', userToSave.id), userToSave).catch((err) => {
      console.warn('Firestore setDoc admin_users error:', err);
    });
  } catch (e) {
    console.warn('Firestore offline:', e);
  }

  window.dispatchEvent(new CustomEvent(EVENT_ADMIN_AUTH_CHANGED));
  return updated;
}

/**
 * Supprime un utilisateur (interdit de supprimer le dernier administrateur principal)
 */
export function deleteUser(id: string): { success: boolean; error?: string } {
  const users = getStoredUsers();
  const user = users.find((u) => u.id === id);
  if (!user) return { success: false, error: 'Utilisateur introuvable' };

  if (user.role === 'administrateur_principal') {
    const adminCount = users.filter((u) => u.role === 'administrateur_principal').length;
    if (adminCount <= 1) {
      return { success: false, error: 'Impossible de supprimer le dernier Administrateur Principal du village.' };
    }
  }

  const updated = users.filter((u) => u.id !== id);
  localStorage.setItem(STORAGE_KEY_USERS, JSON.stringify(updated));

  // Sync delete to Firestore in real time
  try {
    deleteDoc(doc(db, 'admin_users', id)).catch((err) => {
      console.warn('Firestore deleteDoc admin_users error:', err);
    });
  } catch (e) {
    console.warn('Firestore offline:', e);
  }

  window.dispatchEvent(new CustomEvent(EVENT_ADMIN_AUTH_CHANGED));
  return { success: true };
}

/**
 * Validation stricte des permissions de l'administrateur appelant
 */
export function validateAdminPermissions(operatorId: string, requiredRole: UserRole = 'administrateur_principal'): boolean {
  const users = getStoredUsers();
  const operator = users.find((u) => u.id === operatorId);
  if (!operator) {
    throw new Error('Opérateur non authentifié dans le système.');
  }
  if (!operator.active) {
    throw new Error('Le compte de l’administrateur a été révoqué.');
  }
  if (operator.role !== 'administrateur_principal' && operator.role !== requiredRole) {
    throw new Error('Permission refusée : action réservée exclusivement à l’Administrateur Principal.');
  }
  return true;
}

/**
 * Révoque ou réactive l'accès d'un administrateur
 */
export function revokeUserAccess(
  userId: string,
  revoked: boolean,
  operatorId: string
): { success: boolean; error?: string } {
  try {
    validateAdminPermissions(operatorId, 'administrateur_principal');
    const users = getStoredUsers();
    const target = users.find((u) => u.id === userId);
    if (!target) return { success: false, error: 'Compte administrateur introuvable.' };

    if (target.id === operatorId && revoked) {
      return { success: false, error: 'Vous ne pouvez pas révoquer votre propre compte actif.' };
    }

    if (target.role === 'administrateur_principal' && revoked) {
      const activePrincipals = users.filter((u) => u.role === 'administrateur_principal' && u.active);
      if (activePrincipals.length <= 1) {
        return { success: false, error: 'Impossible de révoquer le dernier Administrateur Principal actif du village.' };
      }
    }

    target.active = !revoked;
    saveUser(target, operatorId);
    return { success: true };
  } catch (err: any) {
    return { success: false, error: err?.message || 'Erreur de permission' };
  }
}

/**
 * Modifie le rôle d'un administrateur
 */
export function updateUserRole(
  userId: string,
  newRole: UserRole,
  operatorId: string
): { success: boolean; error?: string } {
  try {
    validateAdminPermissions(operatorId, 'administrateur_principal');
    const users = getStoredUsers();
    const target = users.find((u) => u.id === userId);
    if (!target) return { success: false, error: 'Compte administrateur introuvable.' };

    if (target.role === 'administrateur_principal' && newRole !== 'administrateur_principal') {
      const principals = users.filter((u) => u.role === 'administrateur_principal');
      if (principals.length <= 1) {
        return { success: false, error: 'Impossible de rétrograder le dernier Administrateur Principal du village.' };
      }
    }

    target.role = newRole;
    target.isSuperAdmin = newRole === 'administrateur_principal';
    saveUser(target, operatorId);
    return { success: true };
  } catch (err: any) {
    return { success: false, error: err?.message || 'Erreur de permission' };
  }
}

/**
 * Synchronise ou enregistre un administrateur dans Firebase Auth
 */
export async function syncUserWithFirebaseAuth(user: AdminUser, plainPassword?: string): Promise<{ success: boolean; error?: string }> {
  try {
    if (plainPassword && plainPassword.length >= 6) {
      try {
        await createUserWithEmailAndPassword(auth, user.email, plainPassword);
      } catch (err: any) {
        if (err?.code !== 'auth/email-already-in-use') {
          console.warn('Firebase Auth note:', err?.message || err);
        }
      }
    }
    return { success: true };
  } catch (e: any) {
    return { success: false, error: e?.message || 'Erreur Firebase Auth' };
  }
}

/**
 * Réinitialise le mot de passe d'un utilisateur (hachage obligatoire)
 */
export async function resetUserPassword(userId: string, newPlainText: string): Promise<boolean> {
  const users = getStoredUsers();
  const user = users.find((u) => u.id === userId);
  if (!user) return false;

  const hashed = await hashPassword(newPlainText);
  user.passwordHash = hashed;
  saveUser(user);
  return true;
}

/**
 * Session active de l'administrateur
 */
export interface AdminSession {
  user: Omit<AdminUser, 'passwordHash'>;
  token: string;
  loginTime: string;
}

export function getCurrentSession(): AdminSession | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY_SESSION) || localStorage.getItem(STORAGE_KEY_SESSION);
    if (!raw) return null;
    const session: AdminSession = JSON.parse(raw);

    // Vérifier l'âge de la session (expiration automatique après 12 heures)
    if (session.loginTime) {
      const sessionAge = Date.now() - new Date(session.loginTime).getTime();
      if (sessionAge > SESSION_MAX_AGE_MS) {
        logoutAdmin();
        return null;
      }
    }

    return session;
  } catch (e) {
    return null;
  }
}

/**
 * Renvoie l'utilisateur administrateur actuellement connecté ou null
 */
export function getCurrentAdminUser(): Omit<AdminUser, 'passwordHash'> | null {
  const session = getCurrentSession();
  return session ? session.user : null;
}

/**
 * Authentification sécurisée de l'administrateur avec protection anti-force brute
 */
export async function loginAdmin(
  identifier: string,
  plainPassword: string,
  rememberMe: boolean = true
): Promise<{ success: boolean; user?: Omit<AdminUser, 'passwordHash'>; error?: string }> {
  const cleanId = sanitizeText(identifier).trim().toLowerCase();

  // 1. Vérification du verrouillage anti-force brute
  const lockout = checkLoginLockout(cleanId);
  if (lockout.isLocked) {
    return {
      success: false,
      error: `Trop de tentatives infructueuses. Compte temporairement verrouillé par mesure de sécurité. Réessayez dans ${lockout.remainingMinutes} minute(s).`,
    };
  }

  const users = getStoredUsers();
  const user = users.find(
    (u) => u.email.toLowerCase() === cleanId || u.username.toLowerCase() === cleanId
  );

  if (!user) {
    const status = recordFailedLogin(cleanId);
    return {
      success: false,
      error: status.isLocked
        ? `Trop de tentatives. Sécurité activée : réessayez dans ${status.remainingMinutes} minute(s).`
        : 'Identifiant ou mot de passe incorrect.',
    };
  }

  if (!user.active) {
    return { success: false, error: 'Ce compte administrateur a été désactivé par Sa Majesté.' };
  }

  const computedHash = await hashPassword(plainPassword);

  if (computedHash !== user.passwordHash) {
    const status = recordFailedLogin(cleanId);
    return {
      success: false,
      error: status.isLocked
        ? `Trop de tentatives. Sécurité activée : réessayez dans ${status.remainingMinutes} minute(s).`
        : 'Identifiant ou mot de passe incorrect.',
    };
  }

  // Connexion réussie : effacement du compteur d'erreurs
  clearLoginLockout(cleanId);

  // Mise à jour de la date de dernière connexion
  user.lastLogin = new Date().toLocaleString('fr-FR', {
    dateStyle: 'short',
    timeStyle: 'short',
  });
  saveUser(user);

  const { passwordHash: _, ...safeUser } = user;
  const session: AdminSession = {
    user: safeUser,
    token: `tkn_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`,
    loginTime: new Date().toISOString(),
  };

  const serialized = JSON.stringify(session);
  if (rememberMe) {
    localStorage.setItem(STORAGE_KEY_SESSION, serialized);
  } else {
    sessionStorage.setItem(STORAGE_KEY_SESSION, serialized);
  }

  window.dispatchEvent(new CustomEvent(EVENT_ADMIN_AUTH_CHANGED));
  return { success: true, user: safeUser };
}

/**
 * Déconnexion de la session administrative
 */
export function logoutAdmin() {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(STORAGE_KEY_SESSION);
  sessionStorage.removeItem(STORAGE_KEY_SESSION);
  window.dispatchEvent(new CustomEvent(EVENT_ADMIN_AUTH_CHANGED));
}
