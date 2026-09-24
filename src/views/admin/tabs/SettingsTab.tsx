import React, { useState } from 'react';
import {
  Settings, Save, Megaphone, Download, Upload, AlertTriangle,
  CheckCircle2, RefreshCw, ShieldCheck, Database, Building2, AlertCircle
} from 'lucide-react';
import { SiteSettings, UserRole } from '../../../types';
import { exportFullDatabaseBackup, importFullDatabaseBackup } from '../../../services/adminService';

interface SettingsTabProps {
  settings: SiteSettings;
  onSaveSettings: (settings: SiteSettings) => void;
  userRole: UserRole;
}

export const SettingsTab: React.FC<SettingsTabProps> = ({
  settings,
  onSaveSettings,
  userRole,
}) => {
  const [formData, setFormData] = useState<SiteSettings>({ ...settings });
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [importStatus, setImportStatus] = useState<string | null>(null);

  const canEdit = userRole === 'administrateur_principal' || userRole === 'editeur';

  const handleChange = (key: keyof SiteSettings, value: any) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveSettings({
      ...formData,
      lastUpdated: new Date().toLocaleDateString('fr-FR'),
    });
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  const handleDownloadBackup = () => {
    const jsonStr = exportFullDatabaseBackup();
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ntolo_backup_${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      if (content) {
        const ok = importFullDatabaseBackup(content);
        if (ok) {
          setImportStatus('Base de données restaurée avec succès !');
          setTimeout(() => window.location.reload(), 1500);
        } else {
          setImportStatus('Erreur : fichier de sauvegarde JSON invalide.');
        }
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="space-y-8 animate-in fade-in max-w-4xl">
      {saveSuccess && (
        <div className="p-4 rounded-2xl bg-emerald-950/60 border border-emerald-800 text-emerald-200 text-xs flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>Paramètres institutionnels enregistrés avec succès.</span>
        </div>
      )}

      {importStatus && (
        <div className="p-4 rounded-2xl bg-amber-950/60 border border-amber-800 text-amber-200 text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-amber-400" />
          <span>{importStatus}</span>
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-6">
        {/* 1. Identité Officielle */}
        <div className="bg-stone-900 border border-stone-800 rounded-3xl p-6 sm:p-8 space-y-5 shadow-xl">
          <div className="flex items-center space-x-2 border-b border-stone-800 pb-3">
            <Building2 className="w-5 h-5 text-amber-400" />
            <h3 className="font-serif-royal text-base sm:text-lg font-bold text-white">
              Identité Officielle de la Communauté
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="space-y-1">
              <label className="font-bold text-stone-300">Nom du village / Titre du portail</label>
              <input
                type="text"
                disabled={!canEdit}
                value={formData.siteTitle}
                onChange={(e) => handleChange('siteTitle', e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-stone-950 border border-stone-800 text-white focus:ring-1 focus:ring-amber-500 disabled:opacity-50"
              />
            </div>

            <div className="space-y-1">
              <label className="font-bold text-stone-300">Sous-titre officiel</label>
              <input
                type="text"
                disabled={!canEdit}
                value={formData.subtitle}
                onChange={(e) => handleChange('subtitle', e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-stone-950 border border-stone-800 text-white focus:ring-1 focus:ring-amber-500 disabled:opacity-50"
              />
            </div>

            <div className="space-y-1 sm:col-span-2">
              <label className="font-bold text-stone-300">Devise / Slogan communautaire</label>
              <input
                type="text"
                disabled={!canEdit}
                value={formData.slogan}
                onChange={(e) => handleChange('slogan', e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-stone-950 border border-stone-800 text-white focus:ring-1 focus:ring-amber-500 disabled:opacity-50"
              />
            </div>

            <div className="space-y-1">
              <label className="font-bold text-stone-300">Titre de l'autorité coutumière</label>
              <input
                type="text"
                disabled={!canEdit}
                value={formData.chiefTitle}
                onChange={(e) => handleChange('chiefTitle', e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-stone-950 border border-stone-800 text-white focus:ring-1 focus:ring-amber-500 disabled:opacity-50"
              />
            </div>

            <div className="space-y-1">
              <label className="font-bold text-stone-300">Nom / Mention de l'autorité</label>
              <input
                type="text"
                disabled={!canEdit}
                value={formData.chiefName}
                onChange={(e) => handleChange('chiefName', e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-stone-950 border border-stone-800 text-white focus:ring-1 focus:ring-amber-500 disabled:opacity-50"
              />
            </div>
          </div>
        </div>

        {/* 2. Coordonnées & Permanence */}
        <div className="bg-stone-900 border border-stone-800 rounded-3xl p-6 sm:p-8 space-y-5 shadow-xl">
          <div className="flex items-center space-x-2 border-b border-stone-800 pb-3">
            <Settings className="w-5 h-5 text-amber-400" />
            <h3 className="font-serif-royal text-base sm:text-lg font-bold text-white">
              Coordonnées, Secrétariat & WhatsApp Officiel
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="space-y-1">
              <label className="font-bold text-stone-300">Email officiel du secrétariat</label>
              <input
                type="email"
                disabled={!canEdit}
                value={formData.contactEmail}
                onChange={(e) => handleChange('contactEmail', e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-stone-950 border border-stone-800 text-white focus:ring-1 focus:ring-amber-500 disabled:opacity-50"
              />
            </div>

            <div className="space-y-1">
              <label className="font-bold text-stone-300">Téléphones officiels (Chefferie & CODEV)</label>
              <input
                type="text"
                disabled={!canEdit}
                value={formData.contactPhone}
                onChange={(e) => handleChange('contactPhone', e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-stone-950 border border-stone-800 text-white focus:ring-1 focus:ring-amber-500 disabled:opacity-50"
              />
            </div>

            <div className="space-y-1">
              <label className="font-bold text-stone-300">Numéro WhatsApp du Secrétariat (avec indicatif)</label>
              <input
                type="text"
                disabled={!canEdit}
                value={formData.whatsappNumber || ''}
                onChange={(e) => handleChange('whatsappNumber', e.target.value)}
                placeholder="+237670001122"
                className="w-full px-3 py-2 rounded-xl bg-stone-950 border border-stone-800 text-white focus:ring-1 focus:ring-amber-500 disabled:opacity-50"
              />
            </div>

            <div className="space-y-1">
              <label className="font-bold text-stone-300">Message pré-rempli WhatsApp pour les visiteurs</label>
              <input
                type="text"
                disabled={!canEdit}
                value={formData.whatsappMessagePreset || ''}
                onChange={(e) => handleChange('whatsappMessagePreset', e.target.value)}
                placeholder="Bonjour le Secrétariat du Village de Ntolo..."
                className="w-full px-3 py-2 rounded-xl bg-stone-950 border border-stone-800 text-white focus:ring-1 focus:ring-amber-500 disabled:opacity-50"
              />
            </div>

            <div className="space-y-1 sm:col-span-2">
              <label className="font-bold text-stone-300">Horaires de permanence physique au Palais</label>
              <input
                type="text"
                disabled={!canEdit}
                value={formData.secretariatHours}
                onChange={(e) => handleChange('secretariatHours', e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-stone-950 border border-stone-800 text-white focus:ring-1 focus:ring-amber-500 disabled:opacity-50"
              />
            </div>

            <div className="space-y-1 sm:col-span-2">
              <label className="font-bold text-stone-300">Adresse physique complète</label>
              <input
                type="text"
                disabled={!canEdit}
                value={formData.address || ''}
                onChange={(e) => handleChange('address', e.target.value)}
                placeholder="Chefferie Traditionnelle de Ntolo, Face Place du Marché Coutumier, Nlonako"
                className="w-full px-3 py-2 rounded-xl bg-stone-950 border border-stone-800 text-white focus:ring-1 focus:ring-amber-500 disabled:opacity-50"
              />
            </div>

            <div className="space-y-1 sm:col-span-2">
              <label className="font-bold text-stone-300">Localisation géographique officielle</label>
              <input
                type="text"
                disabled={!canEdit}
                value={formData.locationSummary}
                onChange={(e) => handleChange('locationSummary', e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-stone-950 border border-stone-800 text-white focus:ring-1 focus:ring-amber-500 disabled:opacity-50"
              />
            </div>
          </div>
        </div>

        {/* 3. Réseaux Sociaux & Géolocalisation GPS */}
        <div className="bg-stone-900 border border-stone-800 rounded-3xl p-6 sm:p-8 space-y-5 shadow-xl">
          <div className="flex items-center space-x-2 border-b border-stone-800 pb-3">
            <Settings className="w-5 h-5 text-amber-400" />
            <h3 className="font-serif-royal text-base sm:text-lg font-bold text-white">
              Réseaux Sociaux & Repérage GPS du Village
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="space-y-1">
              <label className="font-bold text-stone-300">Lien Facebook</label>
              <input
                type="url"
                disabled={!canEdit}
                value={formData.socialFacebookUrl || ''}
                onChange={(e) => handleChange('socialFacebookUrl', e.target.value)}
                placeholder="https://facebook.com/..."
                className="w-full px-3 py-2 rounded-xl bg-stone-950 border border-stone-800 text-white focus:ring-1 focus:ring-amber-500 disabled:opacity-50"
              />
            </div>

            <div className="space-y-1">
              <label className="font-bold text-stone-300">Lien Canal WhatsApp</label>
              <input
                type="url"
                disabled={!canEdit}
                value={formData.socialWhatsappGroupUrl || ''}
                onChange={(e) => handleChange('socialWhatsappGroupUrl', e.target.value)}
                placeholder="https://chat.whatsapp.com/..."
                className="w-full px-3 py-2 rounded-xl bg-stone-950 border border-stone-800 text-white focus:ring-1 focus:ring-amber-500 disabled:opacity-50"
              />
            </div>

            <div className="space-y-1">
              <label className="font-bold text-stone-300">Chaîne YouTube</label>
              <input
                type="url"
                disabled={!canEdit}
                value={formData.socialYoutubeUrl || ''}
                onChange={(e) => handleChange('socialYoutubeUrl', e.target.value)}
                placeholder="https://youtube.com/@..."
                className="w-full px-3 py-2 rounded-xl bg-stone-950 border border-stone-800 text-white focus:ring-1 focus:ring-amber-500 disabled:opacity-50"
              />
            </div>

            <div className="space-y-1">
              <label className="font-bold text-stone-300">Lien X / Twitter</label>
              <input
                type="url"
                disabled={!canEdit}
                value={formData.socialTwitterUrl || ''}
                onChange={(e) => handleChange('socialTwitterUrl', e.target.value)}
                placeholder="https://twitter.com/..."
                className="w-full px-3 py-2 rounded-xl bg-stone-950 border border-stone-800 text-white focus:ring-1 focus:ring-amber-500 disabled:opacity-50"
              />
            </div>

            <div className="space-y-1">
              <label className="font-bold text-stone-300">Coordonnées GPS - Latitude</label>
              <input
                type="number"
                step="0.0001"
                disabled={!canEdit}
                value={formData.gpsLatitude ?? 4.9167}
                onChange={(e) => handleChange('gpsLatitude', parseFloat(e.target.value))}
                className="w-full px-3 py-2 rounded-xl bg-stone-950 border border-stone-800 text-white focus:ring-1 focus:ring-amber-500 disabled:opacity-50"
              />
            </div>

            <div className="space-y-1">
              <label className="font-bold text-stone-300">Coordonnées GPS - Longitude</label>
              <input
                type="number"
                step="0.0001"
                disabled={!canEdit}
                value={formData.gpsLongitude ?? 9.9667}
                onChange={(e) => handleChange('gpsLongitude', parseFloat(e.target.value))}
                className="w-full px-3 py-2 rounded-xl bg-stone-950 border border-stone-800 text-white focus:ring-1 focus:ring-amber-500 disabled:opacity-50"
              />
            </div>
          </div>
        </div>

        {/* 3. Bannière d'Urgence / Alertes Publiques */}
        <div className="bg-stone-900 border border-stone-800 rounded-3xl p-6 sm:p-8 space-y-4 shadow-xl">
          <div className="flex items-center space-x-2 border-b border-stone-800 pb-3">
            <Megaphone className="w-5 h-5 text-amber-400" />
            <h3 className="font-serif-royal text-base sm:text-lg font-bold text-white">
              Bannière d'Alerte & Avis Urgent sur le Portail Public
            </h3>
          </div>

          <div className="space-y-3 text-xs">
            <label className="flex items-center gap-2 cursor-pointer text-stone-200">
              <input
                type="checkbox"
                disabled={!canEdit}
                checked={formData.emergencyBannerActive}
                onChange={(e) => handleChange('emergencyBannerActive', e.target.checked)}
                className="rounded bg-stone-950 border-stone-800 text-amber-500"
              />
              <span className="font-bold">Afficher la bannière rouge/ambre d’avis urgent en haut de toutes les pages</span>
            </label>

            {formData.emergencyBannerActive && (
              <div className="space-y-1">
                <label className="font-bold text-stone-300">Texte du message officiel affiché aux citoyens</label>
                <textarea
                  rows={2}
                  disabled={!canEdit}
                  value={formData.emergencyBannerText}
                  onChange={(e) => handleChange('emergencyBannerText', e.target.value)}
                  placeholder="ex: COMMUNIQUÉ OFFICIEL : Convocation de l'assemblée générale extraordinaire ce samedi."
                  className="w-full px-3 py-2 rounded-xl bg-stone-950 border border-stone-800 text-white focus:ring-1 focus:ring-amber-500 disabled:opacity-50"
                ></textarea>
              </div>
            )}
          </div>
        </div>

        {/* 4. Emplacement Partenaire Éthique & Non-intrusif */}
        <div className="bg-stone-900 border border-stone-800 rounded-3xl p-6 sm:p-8 space-y-4 shadow-xl">
          <div className="flex items-center space-x-2 border-b border-stone-800 pb-3">
            <ShieldCheck className="w-5 h-5 text-emerald-400" />
            <h3 className="font-serif-royal text-base sm:text-lg font-bold text-white">
              Monétisation Éthique : Emplacement Partenaire Officiel
            </h3>
          </div>

          <div className="space-y-4 text-xs">
            <label className="flex items-center gap-2 cursor-pointer text-stone-200">
              <input
                type="checkbox"
                disabled={!canEdit}
                checked={formData.partnerAdBannerActive ?? true}
                onChange={(e) => handleChange('partnerAdBannerActive', e.target.checked)}
                className="rounded bg-stone-950 border-stone-800 text-emerald-500"
              />
              <span className="font-bold">Activer le bandeau discret de mise en avant d’un partenaire / sponsor officiel</span>
            </label>

            {formData.partnerAdBannerActive && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="space-y-1">
                  <label className="font-bold text-stone-300">Badge / Titre de l'encart</label>
                  <input
                    type="text"
                    disabled={!canEdit}
                    value={formData.partnerAdBannerTitle || ''}
                    onChange={(e) => handleChange('partnerAdBannerTitle', e.target.value)}
                    placeholder="ex: Partenaire Officiel du Terroir"
                    className="w-full px-3 py-2 rounded-xl bg-stone-950 border border-stone-800 text-white focus:ring-1 focus:ring-emerald-500 disabled:opacity-50"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-stone-300">Nom du Sponsor / Partenaire</label>
                  <input
                    type="text"
                    disabled={!canEdit}
                    value={formData.partnerAdBannerSponsor || ''}
                    onChange={(e) => handleChange('partnerAdBannerSponsor', e.target.value)}
                    placeholder="ex: Union des Coopératives du Moungo (UCAM)"
                    className="w-full px-3 py-2 rounded-xl bg-stone-950 border border-stone-800 text-white focus:ring-1 focus:ring-emerald-500 disabled:opacity-50"
                  />
                </div>

                <div className="sm:col-span-2 space-y-1">
                  <label className="font-bold text-stone-300">Texte court de valorisation éthique</label>
                  <textarea
                    rows={2}
                    disabled={!canEdit}
                    value={formData.partnerAdBannerText || ''}
                    onChange={(e) => handleChange('partnerAdBannerText', e.target.value)}
                    placeholder="ex: Soutien aux caféiculteurs et cacaoyers biologiques de Ntolo. Valorisation de notre terroir agricole."
                    className="w-full px-3 py-2 rounded-xl bg-stone-950 border border-stone-800 text-white focus:ring-1 focus:ring-emerald-500 disabled:opacity-50"
                  ></textarea>
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-stone-300">Lien web du partenaire (URL)</label>
                  <input
                    type="url"
                    disabled={!canEdit}
                    value={formData.partnerAdBannerLink || ''}
                    onChange={(e) => handleChange('partnerAdBannerLink', e.target.value)}
                    placeholder="https://..."
                    className="w-full px-3 py-2 rounded-xl bg-stone-950 border border-stone-800 text-white focus:ring-1 focus:ring-emerald-500 disabled:opacity-50"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-stone-300">Libellé du bouton (CTA)</label>
                  <input
                    type="text"
                    disabled={!canEdit}
                    value={formData.partnerAdBannerCta || ''}
                    onChange={(e) => handleChange('partnerAdBannerCta', e.target.value)}
                    placeholder="ex: Découvrir le projet"
                    className="w-full px-3 py-2 rounded-xl bg-stone-950 border border-stone-800 text-white focus:ring-1 focus:ring-emerald-500 disabled:opacity-50"
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* 5. Passerelle de Paiement Futur (Mobile Money & Carte) */}
        <div className="bg-stone-900 border border-stone-800 rounded-3xl p-6 sm:p-8 space-y-4 shadow-xl">
          <div className="flex items-center space-x-2 border-b border-stone-800 pb-3">
            <CheckCircle2 className="w-5 h-5 text-amber-400" />
            <h3 className="font-serif-royal text-base sm:text-lg font-bold text-white">
              Passerelle de Paiement en Ligne (Mobile Money & Cartes Bancaires)
            </h3>
          </div>

          <div className="space-y-4 text-xs">
            <div className="flex flex-wrap items-center gap-4">
              <label className="flex items-center gap-2 cursor-pointer text-stone-200">
                <input
                  type="checkbox"
                  disabled={!canEdit}
                  checked={formData.onlinePaymentEnabled ?? true}
                  onChange={(e) => handleChange('onlinePaymentEnabled', e.target.checked)}
                  className="rounded bg-stone-950 border-stone-800 text-amber-500"
                />
                <span className="font-bold">Activer les contributions et souscriptions en ligne directes</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer text-amber-400">
                <input
                  type="checkbox"
                  disabled={!canEdit}
                  checked={formData.onlinePaymentSandboxMode ?? true}
                  onChange={(e) => handleChange('onlinePaymentSandboxMode', e.target.checked)}
                  className="rounded bg-stone-950 border-stone-800 text-amber-500"
                />
                <span className="font-bold">Mode Bac à Sable (Test / Simulation)</span>
              </label>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="space-y-1">
                <label className="font-bold text-stone-300">Numéro Marchand Orange Money</label>
                <input
                  type="text"
                  disabled={!canEdit}
                  value={formData.onlinePaymentOrangeMoneyNumber || ''}
                  onChange={(e) => handleChange('onlinePaymentOrangeMoneyNumber', e.target.value)}
                  placeholder="+237 69x xx xx xx"
                  className="w-full px-3 py-2 rounded-xl bg-stone-950 border border-stone-800 text-white focus:ring-1 focus:ring-amber-500 disabled:opacity-50"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-stone-300">Numéro Marchand MTN Mobile Money (MoMo)</label>
                <input
                  type="text"
                  disabled={!canEdit}
                  value={formData.onlinePaymentMtnMoMoNumber || ''}
                  onChange={(e) => handleChange('onlinePaymentMtnMoMoNumber', e.target.value)}
                  placeholder="+237 67x xx xx xx"
                  className="w-full px-3 py-2 rounded-xl bg-stone-950 border border-stone-800 text-white focus:ring-1 focus:ring-amber-500 disabled:opacity-50"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-stone-300">Clé d'API CamPay (Optionnel)</label>
                <input
                  type="password"
                  disabled={!canEdit}
                  value={formData.onlinePaymentCampayAppKey || ''}
                  onChange={(e) => handleChange('onlinePaymentCampayAppKey', e.target.value)}
                  placeholder="campay_app_key_..."
                  className="w-full px-3 py-2 rounded-xl bg-stone-950 border border-stone-800 text-white focus:ring-1 focus:ring-amber-500 disabled:opacity-50"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-stone-300">Clé Publique Flutterwave / Stripe (Optionnel)</label>
                <input
                  type="password"
                  disabled={!canEdit}
                  value={formData.onlinePaymentFlutterwavePublicKey || ''}
                  onChange={(e) => handleChange('onlinePaymentFlutterwavePublicKey', e.target.value)}
                  placeholder="FLWPUBK_..."
                  className="w-full px-3 py-2 rounded-xl bg-stone-950 border border-stone-800 text-white focus:ring-1 focus:ring-amber-500 disabled:opacity-50"
                />
              </div>
            </div>
          </div>
        </div>

        {/* 6. Mentions Légales & Politique de Confidentialité */}
        <div className="bg-stone-900 border border-stone-800 rounded-3xl p-6 sm:p-8 space-y-4 shadow-xl">
          <div className="flex items-center space-x-2 border-b border-stone-800 pb-3">
            <ShieldCheck className="w-5 h-5 text-emerald-400" />
            <h3 className="font-serif-royal text-base sm:text-lg font-bold text-white">
              Mentions Légales, Cadre Réglementaire & Politique de Confidentialité
            </h3>
          </div>

          <div className="space-y-4 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="font-bold text-stone-300">Éditeur Officiel du Portail</label>
                <input
                  type="text"
                  disabled={!canEdit}
                  value={formData.legalPublisherName || ''}
                  onChange={(e) => handleChange('legalPublisherName', e.target.value)}
                  placeholder="ex: Chefferie Traditionnelle de Ntolo (3e Degré) & CODEV"
                  className="w-full px-3 py-2 rounded-xl bg-stone-950 border border-stone-800 text-white focus:ring-1 focus:ring-emerald-500 disabled:opacity-50"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-stone-300">Direction de la Publication</label>
                <input
                  type="text"
                  disabled={!canEdit}
                  value={formData.legalDirectorPublication || ''}
                  onChange={(e) => handleChange('legalDirectorPublication', e.target.value)}
                  placeholder="ex: Sa Majesté le Chef Traditionnel & le Secrétaire Général"
                  className="w-full px-3 py-2 rounded-xl bg-stone-950 border border-stone-800 text-white focus:ring-1 focus:ring-emerald-500 disabled:opacity-50"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-stone-300">Responsabilité Éditoriale</label>
                <input
                  type="text"
                  disabled={!canEdit}
                  value={formData.legalEditorialResponsibility || ''}
                  onChange={(e) => handleChange('legalEditorialResponsibility', e.target.value)}
                  placeholder="ex: Commission Information & Communication du CODEV"
                  className="w-full px-3 py-2 rounded-xl bg-stone-950 border border-stone-800 text-white focus:ring-1 focus:ring-emerald-500 disabled:opacity-50"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-stone-300">Contact DPO / Données Personnelles</label>
                <input
                  type="email"
                  disabled={!canEdit}
                  value={formData.legalDpoContact || ''}
                  onChange={(e) => handleChange('legalDpoContact', e.target.value)}
                  placeholder="contact@ntolo.cm"
                  className="w-full px-3 py-2 rounded-xl bg-stone-950 border border-stone-800 text-white focus:ring-1 focus:ring-emerald-500 disabled:opacity-50"
                />
              </div>

              <div className="sm:col-span-2 space-y-1">
                <label className="font-bold text-stone-300">Décret d'Organisation / Arrêté d'Homologation</label>
                <input
                  type="text"
                  disabled={!canEdit}
                  value={formData.legalCustomaryDecree || ''}
                  onChange={(e) => handleChange('legalCustomaryDecree', e.target.value)}
                  placeholder="ex: Décret présidentiel N° 77/245 du 15 juillet 1977..."
                  className="w-full px-3 py-2 rounded-xl bg-stone-950 border border-stone-800 text-white focus:ring-1 focus:ring-emerald-500 disabled:opacity-50"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-stone-300">Hébergeur Officiel</label>
                <input
                  type="text"
                  disabled={!canEdit}
                  value={formData.legalHostName || ''}
                  onChange={(e) => handleChange('legalHostName', e.target.value)}
                  placeholder="ex: Infrastructure Cloud Sécurisée Haute Disponibilité"
                  className="w-full px-3 py-2 rounded-xl bg-stone-950 border border-stone-800 text-white focus:ring-1 focus:ring-emerald-500 disabled:opacity-50"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-stone-300">Localisation / Sécurité Hébergeur</label>
                <input
                  type="text"
                  disabled={!canEdit}
                  value={formData.legalHostAddress || ''}
                  onChange={(e) => handleChange('legalHostAddress', e.target.value)}
                  placeholder="ex: Supervision 24/7, Datacenter ISO 27001, TLS 1.3"
                  className="w-full px-3 py-2 rounded-xl bg-stone-950 border border-stone-800 text-white focus:ring-1 focus:ring-emerald-500 disabled:opacity-50"
                />
              </div>

              <div className="sm:col-span-2 space-y-1">
                <label className="font-bold text-stone-300">Politique de Conservation & Droits d'Accès aux Données</label>
                <textarea
                  rows={2}
                  disabled={!canEdit}
                  value={formData.legalDataRetentionPolicy || ''}
                  onChange={(e) => handleChange('legalDataRetentionPolicy', e.target.value)}
                  placeholder="Préciser les modalités de conservation des formulaires et de suppression sur demande..."
                  className="w-full px-3 py-2 rounded-xl bg-stone-950 border border-stone-800 text-white focus:ring-1 focus:ring-emerald-500 disabled:opacity-50"
                ></textarea>
              </div>

              <div className="sm:col-span-2 space-y-1">
                <label className="font-bold text-stone-300">Politique de Cookies & Sobriété Numérique</label>
                <textarea
                  rows={2}
                  disabled={!canEdit}
                  value={formData.legalCookiePolicyText || ''}
                  onChange={(e) => handleChange('legalCookiePolicyText', e.target.value)}
                  placeholder="Préciser la politique de respect de la vie privée sans traceurs tiers..."
                  className="w-full px-3 py-2 rounded-xl bg-stone-950 border border-stone-800 text-white focus:ring-1 focus:ring-emerald-500 disabled:opacity-50"
                ></textarea>
              </div>
            </div>
          </div>
        </div>

        {canEdit && (
          <div className="flex justify-end">
            <button
              type="submit"
              className="px-6 py-3 rounded-2xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs sm:text-sm flex items-center gap-2 shadow-lg shadow-amber-500/20"
            >
              <Save className="w-4 h-4" />
              <span>Enregistrer tous les paramètres</span>
            </button>
          </div>
        )}
      </form>

      {/* 4. Sauvegarde & Restauration de la Base de Données */}
      <div className="bg-stone-900 border border-stone-800 rounded-3xl p-6 sm:p-8 space-y-4 shadow-xl">
        <div className="flex items-center space-x-2 border-b border-stone-800 pb-3">
          <Database className="w-5 h-5 text-indigo-400" />
          <h3 className="font-serif-royal text-base sm:text-lg font-bold text-white">
            Sauvegarde Intégrale & Restauration (JSON)
          </h3>
        </div>

        <p className="text-xs text-stone-400 leading-relaxed">
          Exportez l'intégralité du contenu du portail (actualités, annonces, agenda, projets, documents, médias, requêtes reçues, logs) dans un fichier JSON pour archivage ou migration.
        </p>

        <div className="flex flex-wrap items-center gap-3 pt-2">
          <button
            onClick={handleDownloadBackup}
            className="px-4 py-2.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-bold flex items-center gap-2 border border-stone-700 transition-colors"
          >
            <Download className="w-4 h-4 text-emerald-400" />
            <span>Télécharger une sauvegarde complète (JSON)</span>
          </button>

          {userRole === 'administrateur_principal' && (
            <label className="px-4 py-2.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-bold flex items-center gap-2 border border-stone-700 transition-colors cursor-pointer">
              <Upload className="w-4 h-4 text-amber-400" />
              <span>Restaurer une sauvegarde...</span>
              <input
                type="file"
                accept=".json"
                onChange={handleFileUpload}
                className="hidden"
              />
            </label>
          )}
        </div>
      </div>
    </div>
  );
};
