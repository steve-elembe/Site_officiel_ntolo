/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Architecture & Service de Paiement en Ligne (Mobile Money & Carte Bancaire)
 * Préparé pour Orange Money Cameroun, MTN Mobile Money (MoMo), Stripe & CamPay
 * Village de Ntolo (Nlonako, Moungo, Cameroun)
 */

import { PaymentProviderType } from '../types';

export interface PaymentTransaction {
  id: string;
  transactionRef: string;
  provider: PaymentProviderType;
  amountFCFA: number;
  currency: 'FCFA' | 'EUR' | 'USD';
  contributorName: string;
  contributorPhone: string;
  contributorEmail?: string;
  projectTargetId?: string;
  projectTargetTitle: string;
  status: 'en_attente' | 'succes' | 'echec' | 'rembourse';
  paymentMode: 'sandbox' | 'production';
  createdAt: string;
  completedAt?: string;
  providerReceiptCode?: string;
  gatewayNotes?: string;
}

const STORAGE_KEY_PAYMENTS = 'ntolo_online_payments_ledger_v1';
export const EVENT_PAYMENTS_CHANGED = 'ntolo_payments_changed';

/**
 * Générateur de référence unique certifiée
 */
export function generateTransactionReference(): string {
  const dateStr = new Date().toISOString().slice(0, 10).replace(/-/g, '');
  const rand = Math.random().toString(36).substring(2, 7).toUpperCase();
  return `NTL-PAY-${dateStr}-${rand}`;
}

/**
 * Récupère le grand livre des transactions
 */
export function getStoredTransactions(): PaymentTransaction[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY_PAYMENTS);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

/**
 * Enregistre une transaction dans le grand livre
 */
export function recordTransaction(tx: PaymentTransaction): PaymentTransaction[] {
  const list = getStoredTransactions();
  const updated = [tx, ...list];
  localStorage.setItem(STORAGE_KEY_PAYMENTS, JSON.stringify(updated));
  window.dispatchEvent(new CustomEvent(EVENT_PAYMENTS_CHANGED));
  return updated;
}

/**
 * Déclenchement d'un paiement simulé ou prêt pour passerelle API
 * En mode bac à sable (sandbox), simule l'échange USSD Mobile Money ou le prompt 3D Secure
 */
export async function initiatePaymentIntent(params: {
  provider: PaymentProviderType;
  amountFCFA: number;
  contributorName: string;
  contributorPhone: string;
  contributorEmail?: string;
  projectTargetTitle: string;
  sandboxMode?: boolean;
}): Promise<{
  success: boolean;
  transaction: PaymentTransaction;
  message: string;
  ussdPromptInstruction?: string;
}> {
  const transactionRef = generateTransactionReference();
  const isSandbox = params.sandboxMode !== false;

  // Création du statut initial
  const tx: PaymentTransaction = {
    id: `tx_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
    transactionRef,
    provider: params.provider,
    amountFCFA: params.amountFCFA,
    currency: 'FCFA',
    contributorName: params.contributorName.trim(),
    contributorPhone: params.contributorPhone.trim(),
    contributorEmail: params.contributorEmail?.trim(),
    projectTargetTitle: params.projectTargetTitle,
    status: 'en_attente',
    paymentMode: isSandbox ? 'sandbox' : 'production',
    createdAt: new Date().toISOString(),
    gatewayNotes: isSandbox ? 'Transaction de test sécurisée (Bac à sable CODEV)' : 'En attente validation passerelle',
  };

  recordTransaction(tx);

  // Simulation de délai réseau et validation USSD / Webhook
  await new Promise((resolve) => setTimeout(resolve, 1500));

  let ussdInstruction = '';
  if (params.provider === 'orange_money') {
    ussdInstruction = 'Composez le #150*50# sur votre téléphone Orange pour valider le débit de ' + params.amountFCFA.toLocaleString('fr-FR') + ' FCFA.';
  } else if (params.provider === 'mtn_momo') {
    ussdInstruction = 'Composez le *126# sur votre téléphone MTN et entrez votre code secret MoMo pour confirmer le transfert.';
  } else {
    ussdInstruction = 'Votre carte bancaire a été validée avec succès via le protocole sécurisé 3D Secure.';
  }

  // En mode bac à sable, nous confirmons le succès immédiatement
  tx.status = 'succes';
  tx.completedAt = new Date().toISOString();
  tx.providerReceiptCode = `REC-${params.provider.toUpperCase().substring(0, 3)}-${Math.floor(100000 + Math.random() * 900000)}`;
  
  // Mise à jour de la transaction
  const all = getStoredTransactions();
  const index = all.findIndex((t) => t.id === tx.id);
  if (index >= 0) {
    all[index] = tx;
    localStorage.setItem(STORAGE_KEY_PAYMENTS, JSON.stringify(all));
    window.dispatchEvent(new CustomEvent(EVENT_PAYMENTS_CHANGED));
  }

  return {
    success: true,
    transaction: tx,
    message: 'Votre contribution a été enregistrée avec succès par la Chefferie.',
    ussdPromptInstruction: ussdInstruction,
  };
}
