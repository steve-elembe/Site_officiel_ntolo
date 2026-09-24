/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Utilitaires de Sécurité, de Protection contre les Injections & de Validation
 * Portail Numérique Officiel de Ntolo (Nlonako, Cameroun)
 */

/**
 * Nettoie une chaîne de texte pour neutraliser toute tentative d'injection XSS
 * et supprimer les balises HTML ou scripts malveillants.
 */
export function sanitizeText(input: unknown): string {
  if (input === null || input === undefined) return '';
  let str = String(input);

  // Supprimer les caractères de contrôle non imprimables (sauf tab et retour à la ligne)
  str = str.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, '');

  // Échapper les balises HTML principales
  const map: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#x27;',
    '/': '&#x2F;',
    '`': '&#96;',
  };

  return str.replace(/[&<>"'`\/]/g, (m) => map[m] || m).trim();
}

/**
 * Nettoie une chaîne destinée à être affichée dans un contexte textuel sans balises
 */
export function stripHtml(input: string): string {
  if (!input) return '';
  return input
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, '')
    .replace(/<[^>]+>/g, '')
    .trim();
}

/**
 * Valide une adresse e-mail selon les normes RFC standards
 */
export function isValidEmail(email: string): boolean {
  if (!email || typeof email !== 'string') return false;
  const clean = email.trim();
  if (clean.length > 254) return false;
  const re = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;
  return re.test(clean);
}

/**
 * Valide un numéro de téléphone (formats internationaux E.164 et camerounais)
 * Supporte : +237 6xx xx xx xx, 2376xxxxxxxx, +33, etc.
 */
export function isValidPhone(phone: string): boolean {
  if (!phone || typeof phone !== 'string') return false;
  const digitsOnly = phone.replace(/[^0-9]/g, '');
  // Numéros internationaux ont généralement entre 8 et 15 chiffres
  return digitsOnly.length >= 8 && digitsOnly.length <= 15;
}

/**
 * Valide et assainit une URL externe pour éviter les attaques "javascript:" ou malveillantes
 */
export function sanitizeSafeUrl(url?: string): string | null {
  if (!url || typeof url !== 'string') return null;
  const clean = url.trim();

  // Rejeter explicitement javascript:, data:, vbscript:, file:
  if (/^(javascript|data|vbscript|file):/i.test(clean)) {
    console.warn('URL potentiellement dangereuse bloquée :', clean);
    return null;
  }

  // Autoriser http, https, mailto, tel
  if (/^(https?:\/\/|mailto:|tel:)/i.test(clean)) {
    return clean;
  }

  // Si c'est un chemin relatif interne sécurisé
  if (clean.startsWith('/') && !clean.startsWith('//')) {
    return clean;
  }

  return null;
}

/**
 * Nettoie un nom de fichier pour éviter les attaques par traversée de répertoire (Path Traversal)
 * et neutraliser les extensions exécutables.
 */
export function sanitizeFilename(filename: string): string {
  if (!filename) return 'document_ntolo';
  // Supprimer les chemins relatifs (../, ..\, etc.)
  let clean = filename.replace(/^.*[\\\/]/, '');
  // Remplacer les caractères dangereux
  clean = clean.replace(/[^a-zA-Z0-9._-]/g, '_');
  // Éviter les noms débutant par un point
  clean = clean.replace(/^\.+/, '');
  // Limiter la longueur
  return clean.substring(0, 100) || 'fichier_ntolo';
}

/**
 * Types MIME et extensions autorisés pour les téléchargements de fichiers
 */
export const ALLOWED_FILE_TYPES = {
  images: {
    mimes: ['image/jpeg', 'image/png', 'image/webp', 'image/avif'],
    extensions: ['jpg', 'jpeg', 'png', 'webp', 'avif'],
    maxSizeBytes: 5 * 1024 * 1024, // 5 MB
  },
  documents: {
    mimes: ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'],
    extensions: ['pdf', 'doc', 'docx'],
    maxSizeBytes: 10 * 1024 * 1024, // 10 MB
  },
};

/**
 * Valide un fichier téléchargé (taille, extension, type MIME)
 */
export function validateUploadedFile(
  file: File,
  category: 'images' | 'documents' = 'images'
): { valid: boolean; error?: string } {
  const rules = ALLOWED_FILE_TYPES[category];

  if (file.size > rules.maxSizeBytes) {
    const maxMb = rules.maxSizeBytes / (1024 * 1024);
    return {
      valid: false,
      error: `Le fichier est trop volumineux. La taille maximale autorisée est de ${maxMb} Mo.`,
    };
  }

  const ext = file.name.split('.').pop()?.toLowerCase() || '';
  if (!rules.extensions.includes(ext)) {
    return {
      valid: false,
      error: `Format de fichier .${ext} non autorisé. Extensions acceptées : ${rules.extensions.join(', ')}.`,
    };
  }

  if (file.type && !rules.mimes.includes(file.type)) {
    return {
      valid: false,
      error: `Type MIME (${file.type}) non valide pour ce type de fichier.`,
    };
  }

  return { valid: true };
}

/**
 * Protection anti-bruteforce en mémoire / session
 */
const LOGIN_ATTEMPTS_KEY = 'ntolo_sec_login_attempts';
const MAX_FAILED_ATTEMPTS = 5;
const LOCKOUT_DURATION_MS = 15 * 60 * 1000; // 15 minutes

interface LoginAttemptRecord {
  count: number;
  lockedUntil: number;
}

export function recordFailedLogin(identifier: string): { isLocked: boolean; remainingMinutes?: number } {
  if (typeof window === 'undefined') return { isLocked: false };
  try {
    const raw = sessionStorage.getItem(LOGIN_ATTEMPTS_KEY);
    const records: Record<string, LoginAttemptRecord> = raw ? JSON.parse(raw) : {};
    const cleanId = identifier.trim().toLowerCase();
    const current = records[cleanId] || { count: 0, lockedUntil: 0 };

    current.count += 1;
    if (current.count >= MAX_FAILED_ATTEMPTS) {
      current.lockedUntil = Date.now() + LOCKOUT_DURATION_MS;
    }

    records[cleanId] = current;
    sessionStorage.setItem(LOGIN_ATTEMPTS_KEY, JSON.stringify(records));

    if (current.lockedUntil > Date.now()) {
      const remainingMinutes = Math.ceil((current.lockedUntil - Date.now()) / (60 * 1000));
      return { isLocked: true, remainingMinutes };
    }
    return { isLocked: false };
  } catch {
    return { isLocked: false };
  }
}

export function checkLoginLockout(identifier: string): { isLocked: boolean; remainingMinutes?: number } {
  if (typeof window === 'undefined') return { isLocked: false };
  try {
    const raw = sessionStorage.getItem(LOGIN_ATTEMPTS_KEY);
    if (!raw) return { isLocked: false };
    const records: Record<string, LoginAttemptRecord> = JSON.parse(raw);
    const cleanId = identifier.trim().toLowerCase();
    const current = records[cleanId];
    if (!current) return { isLocked: false };

    if (current.lockedUntil && current.lockedUntil > Date.now()) {
      const remainingMinutes = Math.ceil((current.lockedUntil - Date.now()) / (60 * 1000));
      return { isLocked: true, remainingMinutes };
    }
    return { isLocked: false };
  } catch {
    return { isLocked: false };
  }
}

export function clearLoginLockout(identifier: string) {
  if (typeof window === 'undefined') return;
  try {
    const raw = sessionStorage.getItem(LOGIN_ATTEMPTS_KEY);
    if (!raw) return;
    const records: Record<string, LoginAttemptRecord> = JSON.parse(raw);
    const cleanId = identifier.trim().toLowerCase();
    delete records[cleanId];
    sessionStorage.setItem(LOGIN_ATTEMPTS_KEY, JSON.stringify(records));
  } catch {}
}
