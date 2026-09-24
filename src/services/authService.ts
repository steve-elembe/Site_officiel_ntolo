import { AdminUser, UserRole } from '../types';
import { checkLoginLockout, recordFailedLogin, clearLoginLockout, sanitizeText } from '../utils/securityUtils';

const STORAGE_KEY_USERS = 'ntolo_admin_users_v1';
const STORAGE_KEY_SESSION = 'ntolo_admin_session_v1';
export const EVENT_ADMIN_AUTH_CHANGED = 'ntolo_admin_auth_changed';
const SESSION_MAX_AGE_MS = 12 * 60 * 60 * 1000; // 12 heures d'expiration automatique

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

// Utilisateurs initiaux de référence avec mots de passe déjà hachés en SHA-256
// (Mots de passe par défaut initiaux : ntolo2026, editeur2026, redaction2026)
const INITIAL_USERS: AdminUser[] = [
  {
    id: 'usr-admin-1',
    fullName: 'Sa Majesté & Cabinet de la Chefferie (Admin Principal)',
    email: 'admin@ntolo.cm',
    username: 'admin',
    role: 'administrateur_principal',
    passwordHash: '6c5c0ca1a2560581117e8387f4a8e6ad0990fb93c5e54cb6a5012a19017ea674',
    active: true,
    createdAt: '2026-01-01',
    lastLogin: '2026-09-23 09:30',
    avatar: 'Crown',
  },
  {
    id: 'usr-editeur-2',
    fullName: 'Directeur de Publication & Communication CODEV',
    email: 'editeur@ntolo.cm',
    username: 'editeur',
    role: 'editeur',
    passwordHash: '5e135c4bfa2206034512a55339ee77dcfd9b73868f06d19de36bd90e7094834f',
    active: true,
    createdAt: '2026-01-15',
    lastLogin: '2026-09-22 17:15',
    avatar: 'Edit3',
  },
  {
    id: 'usr-redacteur-3',
    fullName: 'Chargé des Médias, Archives & Galerie',
    email: 'redacteur@ntolo.cm',
    username: 'gestionnaire',
    role: 'gestionnaire_contenu',
    passwordHash: '1d3ff035274d5015bf44a6e1f2ee86efa898166cb25c09591854f724ed7c44e0',
    active: true,
    createdAt: '2026-02-01',
    lastLogin: '2026-09-21 11:40',
    avatar: 'FolderHeart',
  },
];

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
 * Enregistre ou met à jour un utilisateur dans la base
 */
export function saveUser(user: AdminUser): AdminUser[] {
  const users = getStoredUsers();
  const index = users.findIndex((u) => u.id === user.id);
  let updated: AdminUser[];
  if (index >= 0) {
    updated = [...users];
    updated[index] = user;
  } else {
    updated = [...users, user];
  }
  localStorage.setItem(STORAGE_KEY_USERS, JSON.stringify(updated));
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
  window.dispatchEvent(new CustomEvent(EVENT_ADMIN_AUTH_CHANGED));
  return { success: true };
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
  localStorage.removeItem(STORAGE_KEY_SESSION);
  sessionStorage.removeItem(STORAGE_KEY_SESSION);
  window.dispatchEvent(new CustomEvent(EVENT_ADMIN_AUTH_CHANGED));
}

/**
 * Matrice des permissions selon le rôle
 */
export function checkPermission(
  role: UserRole,
  action: 'create' | 'edit' | 'publish' | 'unpublish' | 'delete' | 'manage_users' | 'manage_settings',
  resource?: string
): boolean {
  // L'Administrateur Principal a TOUS les pouvoirs
  if (role === 'administrateur_principal') {
    return true;
  }

  // L'Éditeur peut créer, modifier, publier, dépublier et supprimer du contenu
  if (role === 'editeur') {
    if (action === 'manage_users' || action === 'manage_settings') {
      return false; // Réservé à l'Admin Principal
    }
    return true;
  }

  // Le Gestionnaire de Contenu peut créer et modifier des brouillons, mais pas supprimer ni gérer le système
  if (role === 'gestionnaire_contenu') {
    if (action === 'create' || action === 'edit') return true;
    if (action === 'publish' || action === 'unpublish') return false; // Validation requise
    if (action === 'delete') return false;
    if (action === 'manage_users' || action === 'manage_settings') return false;
    return false;
  }

  return false;
}
