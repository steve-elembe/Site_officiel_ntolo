/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  HelpCircle, Users, UserPlus, Image, FileText, Edit3, ShieldCheck,
  CheckCircle2, Sparkles, ArrowRight, ChevronDown, ChevronUp, Lock,
  Globe, Smartphone, KeyRound, AlertTriangle, Database, RefreshCw,
  ExternalLink, Layers, Info, Trash2, Crown, Monitor, Laptop, Check,
  Eye, Save, X, Plus, Filter, Video, ArrowDown
} from 'lucide-react';
import { AdminUser, UserRole } from '../../../types';
import { MAX_ADMIN_USERS } from '../../../services/authService';
import { AdminTab } from '../AdminSidebar';

interface HelpTabProps {
  currentUser: Omit<AdminUser, 'passwordHash'>;
  usersCount: number;
  onSelectTab: (tab: AdminTab) => void;
  onNavigateToPublic: () => void;
}

type GuideFilter = 'all' | 'content' | 'media' | 'admins' | 'sync';

export const HelpTab: React.FC<HelpTabProps> = ({
  currentUser,
  usersCount,
  onSelectTab,
  onNavigateToPublic,
}) => {
  const [activeFilter, setActiveFilter] = useState<GuideFilter>('all');
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const remainingSlots = Math.max(0, MAX_ADMIN_USERS - usersCount);

  const toggleFaq = (index: number) => {
    setActiveFaq((prev) => (prev === index ? null : index));
  };

  const faqItems = [
    {
      q: 'Combien d’administrateurs peuvent gérer le site en même temps ?',
      a: `Conformément aux directives de gestion de la communauté de Ntolo, le site est strictement restreint à un maximum de ${MAX_ADMIN_USERS} administrateurs autorisés. Le système bloque automatiquement toute création au-delà de cette limite pour garantir une sécurité et un contrôle total sur l’information officielle.`
    },
    {
      q: 'Comment un nouvel administrateur obtient-il les mêmes droits que l’administrateur principal ?',
      a: 'L’administrateur principal se rend dans l’onglet « Utilisateurs & Rôles », clique sur « Ajouter un administrateur », et sélectionne le rôle « Administrateur Principal ». Le nouvel administrateur disposera alors des mêmes privilèges complets de gestion du contenu, des photos, des paramètres et des comptes.'
    },
    {
      q: 'Comment les internautes voient-ils les modifications apportées ?',
      a: 'Toutes les modifications (textes, photos, projets, coordonnées) sont enregistrées immédiatement dans la base de données. Tout visiteur qui se connecte au portail ou rafraîchit la page voit automatiquement la version mise à jour en temps réel.'
    },
    {
      q: 'Où arrivent les messages envoyés depuis le bouton WhatsApp du site ?',
      a: 'Ils sont directement transmis aux numéros officiels du secrétariat de Ntolo configurés dans le système : le 699 21 77 61 (Ligne 1) et le 694 68 18 40 (Ligne 2).'
    },
    {
      q: 'Comment remplacer un administrateur qui a quitté ses fonctions ?',
      a: 'Un administrateur principal doit se rendre dans l’onglet « Utilisateurs & Rôles », supprimer ou désactiver le compte de la personne sortante. Cela libère automatiquement une place parmi les 5 autorisées pour inviter le nouveau membre.'
    },
    {
      q: 'Où se trouve la barre d’édition rapide sur les pages publiques ?',
      a: 'Dès que vous êtes connecté à votre session d’administration, rendez-vous sur le site public (bouton « Voir le site »). Une barre supérieure sombre et dorée « Administration Ntolo » s’affiche au sommet de l’écran avec le bouton « Modifier cette page ».'
    }
  ];

  return (
    <div className="space-y-10 animate-in fade-in max-w-5xl">
      {/* 1. Header Banner */}
      <div className="bg-gradient-to-br from-emerald-950 via-stone-900 to-stone-950 border border-emerald-800/80 rounded-3xl p-6 sm:p-8 text-white relative shadow-2xl overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-600/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center space-x-2 bg-emerald-900/80 border border-emerald-500/40 px-3 py-1 rounded-full text-xs font-bold text-amber-300">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Guide Officiel de Gestion • Équipe des 5 Administrateurs</span>
            </div>

            <h2 className="font-serif-royal text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Aide à la Gestion & Mode d'Emploi Étape par Étape
            </h2>

            <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
              Ce guide visuel explique étape par étape aux <strong>5 administrateurs autorisés</strong> comment modifier les contenus des pages, gérer la galerie photo/vidéo et inviter de nouveaux administrateurs avec des diagrammes et captures d’écran interactives.
            </p>
          </div>

          {/* Quota Widget */}
          <div className="bg-stone-900/90 border border-stone-700/80 rounded-2xl p-4 flex-shrink-0 text-center space-y-2 min-w-[210px] shadow-lg">
            <span className="text-[11px] uppercase tracking-wider text-stone-400 font-bold block">
              Quota d'Administration
            </span>
            <div className="flex items-center justify-center gap-1.5 font-mono text-2xl font-black text-amber-400">
              <span>{usersCount}</span>
              <span className="text-stone-500 text-lg">/</span>
              <span>{MAX_ADMIN_USERS}</span>
              <span className="text-xs text-stone-400 font-normal">membres</span>
            </div>
            <div className="w-full bg-stone-800 h-2 rounded-full overflow-hidden">
              <div
                className={`h-full transition-all duration-500 ${
                  remainingSlots === 0 ? 'bg-amber-400' : 'bg-emerald-500'
                }`}
                style={{ width: `${(usersCount / MAX_ADMIN_USERS) * 100}%` }}
              ></div>
            </div>
            <span className="text-[10px] text-stone-400 block">
              {remainingSlots > 0
                ? `${remainingSlots} place(s) disponible(s)`
                : 'Quota maximal de 5 atteint'}
            </span>
          </div>
        </div>

        {/* Filter Navigation Tabs */}
        <div className="mt-6 pt-6 border-t border-stone-800/80 flex flex-wrap gap-2">
          <button
            onClick={() => setActiveFilter('all')}
            className={`px-3 py-2 rounded-xl text-xs font-bold transition-all ${
              activeFilter === 'all'
                ? 'bg-amber-500 text-stone-950 shadow-sm'
                : 'bg-stone-800 text-stone-300 hover:bg-stone-700'
            }`}
          >
            📋 Vue Complète
          </button>
          <button
            onClick={() => setActiveFilter('content')}
            className={`px-3 py-2 rounded-xl text-xs font-bold transition-all ${
              activeFilter === 'content'
                ? 'bg-amber-500 text-stone-950 shadow-sm'
                : 'bg-stone-800 text-stone-300 hover:bg-stone-700'
            }`}
          >
            📝 1. Modifier les Contenus des Pages
          </button>
          <button
            onClick={() => setActiveFilter('media')}
            className={`px-3 py-2 rounded-xl text-xs font-bold transition-all ${
              activeFilter === 'media'
                ? 'bg-amber-500 text-stone-950 shadow-sm'
                : 'bg-stone-800 text-stone-300 hover:bg-stone-700'
            }`}
          >
            📸 2. Gérer la Galerie Photo & Vidéo
          </button>
          <button
            onClick={() => setActiveFilter('admins')}
            className={`px-3 py-2 rounded-xl text-xs font-bold transition-all ${
              activeFilter === 'admins'
                ? 'bg-amber-500 text-stone-950 shadow-sm'
                : 'bg-stone-800 text-stone-300 hover:bg-stone-700'
            }`}
          >
            👥 3. Inviter les Administrateurs (Max 5)
          </button>
          <button
            onClick={() => setActiveFilter('sync')}
            className={`px-3 py-2 rounded-xl text-xs font-bold transition-all ${
              activeFilter === 'sync'
                ? 'bg-amber-500 text-stone-950 shadow-sm'
                : 'bg-stone-800 text-stone-300 hover:bg-stone-700'
            }`}
          >
            🔄 4. Synchronisation en Direct & Visiteurs
          </button>
        </div>
      </div>

      {/* 2. Visual Architecture & Flow Diagram */}
      {(activeFilter === 'all' || activeFilter === 'sync' || activeFilter === 'admins') && (
        <div className="bg-stone-900 border border-stone-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="flex items-center space-x-2.5 border-b border-stone-800 pb-3">
            <div className="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif-royal text-base sm:text-lg font-bold text-white">
                Diagramme de Flux : Gestion d'Équipe & Diffusion en Ligne
              </h3>
              <span className="text-[11px] text-amber-400/90 font-medium">
                Schéma du fonctionnement des 5 administrateurs et de la mise à jour en direct
              </span>
            </div>
          </div>

          {/* Visual Architecture Diagram */}
          <div className="p-6 rounded-2xl bg-stone-950 border border-stone-800 overflow-x-auto">
            <div className="min-w-[680px] flex flex-col items-center space-y-6">
              {/* Row 1: The 5 Admins Team */}
              <div className="w-full">
                <div className="text-center mb-2">
                  <span className="text-xs font-bold text-amber-400 uppercase tracking-wider bg-amber-950/60 px-3 py-1 rounded-full border border-amber-500/30">
                    Équipe des 5 Administrateurs Autorisés de Ntolo
                  </span>
                </div>
                <div className="grid grid-cols-5 gap-3 mt-3">
                  {/* Admin 1 */}
                  <div className="bg-emerald-950/70 border-2 border-emerald-500 rounded-2xl p-3 text-center space-y-1 shadow-md">
                    <Crown className="w-5 h-5 text-amber-400 mx-auto" />
                    <span className="font-bold text-white text-xs block truncate">Admin Principal</span>
                    <span className="text-[10px] text-emerald-300 block">Créateur • Pleins Droits</span>
                    <span className="inline-block px-1.5 py-0.5 rounded text-[9px] font-mono bg-emerald-900 text-emerald-200">
                      Siège 1/5
                    </span>
                  </div>

                  {/* Admin 2 */}
                  <div className="bg-stone-900 border border-amber-500/70 rounded-2xl p-3 text-center space-y-1">
                    <ShieldCheck className="w-5 h-5 text-amber-400 mx-auto" />
                    <span className="font-bold text-white text-xs block truncate">Admin Invité 2</span>
                    <span className="text-[10px] text-stone-300 block">Mêmes Droits Complets</span>
                    <span className="inline-block px-1.5 py-0.5 rounded text-[9px] font-mono bg-stone-800 text-stone-300">
                      Siège 2/5
                    </span>
                  </div>

                  {/* Admin 3 */}
                  <div className="bg-stone-900 border border-amber-500/70 rounded-2xl p-3 text-center space-y-1">
                    <ShieldCheck className="w-5 h-5 text-amber-400 mx-auto" />
                    <span className="font-bold text-white text-xs block truncate">Admin Invité 3</span>
                    <span className="text-[10px] text-stone-300 block">Mêmes Droits Complets</span>
                    <span className="inline-block px-1.5 py-0.5 rounded text-[9px] font-mono bg-stone-800 text-stone-300">
                      Siège 3/5
                    </span>
                  </div>

                  {/* Admin 4 */}
                  <div className="bg-stone-900 border border-amber-500/70 rounded-2xl p-3 text-center space-y-1">
                    <ShieldCheck className="w-5 h-5 text-amber-400 mx-auto" />
                    <span className="font-bold text-white text-xs block truncate">Admin Invité 4</span>
                    <span className="text-[10px] text-stone-300 block">Mêmes Droits Complets</span>
                    <span className="inline-block px-1.5 py-0.5 rounded text-[9px] font-mono bg-stone-800 text-stone-300">
                      Siège 4/5
                    </span>
                  </div>

                  {/* Admin 5 */}
                  <div className="bg-stone-900 border border-amber-500/70 rounded-2xl p-3 text-center space-y-1">
                    <ShieldCheck className="w-5 h-5 text-amber-400 mx-auto" />
                    <span className="font-bold text-white text-xs block truncate">Admin Invité 5</span>
                    <span className="text-[10px] text-stone-300 block">Mêmes Droits Complets</span>
                    <span className="inline-block px-1.5 py-0.5 rounded text-[9px] font-mono bg-stone-800 text-stone-300">
                      Siège 5/5
                    </span>
                  </div>
                </div>
              </div>

              {/* Arrow Down */}
              <div className="flex flex-col items-center text-amber-400">
                <span className="text-[11px] font-bold tracking-wide">
                  Actions de modification (Textes, Photos, Projets, Coordonnées)
                </span>
                <ArrowDown className="w-5 h-5 animate-bounce mt-1" />
              </div>

              {/* Row 2: Cloud Database Storage */}
              <div className="w-full max-w-lg bg-gradient-to-r from-emerald-950 via-stone-900 to-emerald-950 border border-emerald-500/50 rounded-2xl p-4 text-center shadow-lg">
                <div className="flex items-center justify-center gap-2 text-emerald-400 font-bold text-sm">
                  <Database className="w-4 h-4" />
                  <span>Base de Données Cloud & Sauvegarde Permanente</span>
                </div>
                <p className="text-[11px] text-stone-300 mt-1">
                  Enregistrement immédiat et sécurisé de chaque photo ajoutée/retirée ou texte modifié.
                </p>
              </div>

              {/* Arrow Down */}
              <div className="flex flex-col items-center text-emerald-400">
                <span className="text-[11px] font-bold tracking-wide">
                  Synchronisation instantanée en direct
                </span>
                <ArrowDown className="w-5 h-5 mt-1" />
              </div>

              {/* Row 3: Online Users & Public View */}
              <div className="w-full grid grid-cols-3 gap-3">
                <div className="bg-stone-900 border border-stone-800 rounded-xl p-3 text-center">
                  <Monitor className="w-4 h-4 text-emerald-400 mx-auto mb-1" />
                  <span className="text-xs font-bold text-white block">Visiteurs sur Ordinateur</span>
                  <span className="text-[10px] text-stone-400">Voient les modifications en direct</span>
                </div>
                <div className="bg-stone-900 border border-stone-800 rounded-xl p-3 text-center">
                  <Smartphone className="w-4 h-4 text-emerald-400 mx-auto mb-1" />
                  <span className="text-xs font-bold text-white block">Visiteurs sur Mobile</span>
                  <span className="text-[10px] text-stone-400">Accès immédiat aux nouvelles photos</span>
                </div>
                <div className="bg-stone-900 border border-stone-800 rounded-xl p-3 text-center">
                  <Globe className="w-4 h-4 text-emerald-400 mx-auto mb-1" />
                  <span className="text-xs font-bold text-white block">Diaspora & Partenaires</span>
                  <span className="text-[10px] text-stone-400">Consultation partout dans le monde</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 3. STEP-BY-STEP: MODIFIER LES CONTENUS DES PAGES (With Fictitious Screenshots) */}
      {(activeFilter === 'all' || activeFilter === 'content') && (
        <div className="bg-stone-900 border border-stone-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="flex items-center space-x-2.5 border-b border-stone-800 pb-3">
            <div className="w-9 h-9 rounded-xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400">
              <Edit3 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif-royal text-base sm:text-lg font-bold text-white">
                Étape par Étape : Comment Modifier les Contenus des Pages
              </h3>
              <span className="text-[11px] text-blue-400 font-medium">
                Méthode directe sur le site (In-Context) ou depuis la console centrale
              </span>
            </div>
          </div>

          {/* Workflow Steps Explanation */}
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs">
            <div className="p-3 rounded-2xl bg-stone-950 border border-stone-800 space-y-1">
              <div className="w-6 h-6 rounded-full bg-blue-500/20 text-blue-400 font-bold flex items-center justify-center text-xs">
                1
              </div>
              <span className="font-bold text-white block">Se Connecter</span>
              <p className="text-[11px] text-stone-400">
                Connectez-vous avec vos identifiants d'administrateur.
              </p>
            </div>

            <div className="p-3 rounded-2xl bg-stone-950 border border-stone-800 space-y-1">
              <div className="w-6 h-6 rounded-full bg-blue-500/20 text-blue-400 font-bold flex items-center justify-center text-xs">
                2
              </div>
              <span className="font-bold text-white block">Naviguer sur la Page</span>
              <p className="text-[11px] text-stone-400">
                Allez sur la page à modifier (ex: Histoire, Présentation, Chefferie).
              </p>
            </div>

            <div className="p-3 rounded-2xl bg-stone-950 border border-stone-800 space-y-1">
              <div className="w-6 h-6 rounded-full bg-blue-500/20 text-blue-400 font-bold flex items-center justify-center text-xs">
                3
              </div>
              <span className="font-bold text-white block">Cliquer sur Modifier</span>
              <p className="text-[11px] text-stone-400">
                Cliquez sur le bouton doré « Modifier cette page » dans le bandeau supérieur.
              </p>
            </div>

            <div className="p-3 rounded-2xl bg-stone-950 border border-stone-800 space-y-1">
              <div className="w-6 h-6 rounded-full bg-blue-500/20 text-blue-400 font-bold flex items-center justify-center text-xs">
                4
              </div>
              <span className="font-bold text-white block">Enregistrer & Publier</span>
              <p className="text-[11px] text-stone-400">
                Validez : les internautes voient immédiatement vos modifications en ligne !
              </p>
            </div>
          </div>

          {/* FICTITIOUS SCREENSHOT 1: In-Context Bar Mockup */}
          <div className="space-y-2">
            <span className="text-xs font-bold text-amber-300 flex items-center gap-1.5">
              <Monitor className="w-3.5 h-3.5" />
              Capture d’Écran Simulée 1 : Le Bandeau d'Édition Rapide Directe
            </span>

            {/* Browser Window Chrome */}
            <div className="rounded-2xl border border-stone-700 bg-stone-950 overflow-hidden shadow-2xl">
              {/* Window Header */}
              <div className="bg-stone-900 px-4 py-2.5 border-b border-stone-800 flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                  <div className="w-3 h-3 rounded-full bg-amber-500/80"></div>
                  <div className="w-3 h-3 rounded-full bg-emerald-500/80"></div>
                </div>
                <div className="px-3 py-1 rounded-lg bg-stone-950 border border-stone-800 text-[11px] font-mono text-stone-400 flex items-center gap-1.5">
                  <Lock className="w-3 h-3 text-emerald-400" />
                  <span>https://ntolo.cm/presentation</span>
                </div>
                <div className="text-[10px] text-stone-500 font-mono">Navigateur Web</div>
              </div>

              {/* Fictitious In-Context Bar */}
              <div className="bg-stone-950 border-b-2 border-amber-500/40 p-3 sm:px-6 flex flex-wrap items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-2.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
                  <span className="font-bold text-amber-400">Session Administrateur Active</span>
                  <span className="text-stone-500 hidden sm:inline">•</span>
                  <span className="text-stone-300 hidden sm:inline">Page active : <strong>Présentation générale</strong></span>
                </div>

                <div className="flex items-center gap-2">
                  <div className="relative group">
                    <div className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-stone-950 font-extrabold text-xs flex items-center gap-1.5 shadow-md ring-2 ring-amber-400/40 animate-pulse">
                      <Edit3 className="w-3.5 h-3.5" />
                      <span>Modifier cette page</span>
                    </div>
                    {/* Callout Arrow */}
                    <div className="absolute -bottom-8 right-2 whitespace-nowrap bg-emerald-900 text-emerald-200 text-[10px] font-bold px-2 py-0.5 rounded shadow-lg border border-emerald-500/40 flex items-center gap-1">
                      <span>👆 Cliquez ici pour ouvrir l'éditeur</span>
                    </div>
                  </div>

                  <div className="px-3 py-1.5 rounded-xl bg-stone-800 text-stone-300 font-semibold text-xs border border-stone-700">
                    Console Admin
                  </div>
                </div>
              </div>

              {/* Simulated Page Content Preview */}
              <div className="p-6 bg-slate-900 text-slate-200 space-y-3">
                <div className="max-w-md space-y-1">
                  <span className="text-[10px] uppercase font-bold text-amber-400 tracking-wider">
                    Présentation Rapide du Terroir
                  </span>
                  <h4 className="font-serif-royal text-lg font-bold text-white">
                    Un terroir hospitalier et dynamique au cœur du Moungo
                  </h4>
                  <p className="text-xs text-slate-300">
                    Situé sur les pentes bienfaisantes du Mont Nlonako...
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* FICTITIOUS SCREENSHOT 2: Modal Editor Mockup */}
          <div className="space-y-2 pt-2">
            <span className="text-xs font-bold text-blue-300 flex items-center gap-1.5">
              <Laptop className="w-3.5 h-3.5" />
              Capture d’Écran Simulée 2 : La Fenêtre Modale d'Édition de Contenu
            </span>

            <div className="rounded-2xl border border-blue-900/60 bg-stone-950 p-5 space-y-4 shadow-xl">
              {/* Modal Header */}
              <div className="flex items-center justify-between border-b border-stone-800 pb-3">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center font-bold text-xs">
                    <Edit3 className="w-4 h-4" />
                  </div>
                  <div>
                    <h5 className="font-bold text-xs text-white">Éditeur de Contenu : Présentation Générale</h5>
                    <span className="text-[10px] text-stone-400">Modifiez les rubriques et enregistrez</span>
                  </div>
                </div>
                <div className="w-6 h-6 rounded-lg bg-stone-800 text-stone-400 flex items-center justify-center text-xs">
                  <X className="w-3.5 h-3.5" />
                </div>
              </div>

              {/* Form Fields Simulation */}
              <div className="space-y-3 text-xs">
                <div>
                  <label className="text-[11px] font-bold text-stone-300 block mb-1">
                    Titre Principal de la Page :
                  </label>
                  <div className="p-2 rounded-xl bg-stone-900 border border-blue-500/60 text-white font-mono text-xs">
                    Présentation Rapide de Ntolo
                  </div>
                </div>

                <div>
                  <label className="text-[11px] font-bold text-stone-300 block mb-1">
                    Sous-titre / Slogan :
                  </label>
                  <div className="p-2 rounded-xl bg-stone-900 border border-stone-800 text-stone-300 text-xs">
                    Un terroir hospitalier et dynamique au cœur du Moungo
                  </div>
                </div>

                {/* Section Item */}
                <div className="p-3 rounded-xl bg-stone-900 border border-stone-800 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-amber-400 text-[11px]">Rubrique 1 : Terroir Volcanique</span>
                    <span className="text-[10px] text-red-400 hover:underline cursor-pointer">Supprimer</span>
                  </div>
                  <div className="p-2 rounded-lg bg-stone-950 border border-stone-800 text-stone-300 text-[11px]">
                    Bénéficiant d’un climat subéquatorial frais et de terres fertiles...
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center justify-between pt-2">
                  <button
                    type="button"
                    className="px-3 py-1.5 rounded-xl bg-stone-800 text-stone-300 text-xs font-semibold flex items-center gap-1"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Ajouter une rubrique</span>
                  </button>

                  <div className="px-4 py-2 rounded-xl bg-emerald-600 text-white text-xs font-bold flex items-center gap-1.5 shadow-md">
                    <Save className="w-3.5 h-3.5" />
                    <span>Enregistrer & Publier en Direct</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 4. STEP-BY-STEP: GÉRER LA GALERIE PHOTO / VIDÉO (With Fictitious Screenshot) */}
      {(activeFilter === 'all' || activeFilter === 'media') && (
        <div className="bg-stone-900 border border-stone-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="flex items-center space-x-2.5 border-b border-stone-800 pb-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <Image className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif-royal text-base sm:text-lg font-bold text-white">
                Étape par Étape : Comment Gérer la Galerie Photos & Vidéos
              </h3>
              <span className="text-[11px] text-emerald-400 font-medium">
                Ajout dans les albums, modification de légendes et retrait de visuels
              </span>
            </div>
          </div>

          {/* Workflow Steps Explanation */}
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs">
            <div className="p-3 rounded-2xl bg-stone-950 border border-stone-800 space-y-1">
              <div className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 font-bold flex items-center justify-center text-xs">
                1
              </div>
              <span className="font-bold text-white block">Onglet Photos</span>
              <p className="text-[11px] text-stone-400">
                Dans la console, cliquez sur <strong>« Galerie photos »</strong>.
              </p>
            </div>

            <div className="p-3 rounded-2xl bg-stone-950 border border-stone-800 space-y-1">
              <div className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 font-bold flex items-center justify-center text-xs">
                2
              </div>
              <span className="font-bold text-white block">Ajouter une Photo</span>
              <p className="text-[11px] text-stone-400">
                Cliquez sur le bouton doré <strong>« + Ajouter une photo »</strong>.
              </p>
            </div>

            <div className="p-3 rounded-2xl bg-stone-950 border border-stone-800 space-y-1">
              <div className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 font-bold flex items-center justify-center text-xs">
                3
              </div>
              <span className="font-bold text-white block">Choisir l'Album</span>
              <p className="text-[11px] text-stone-400">
                Sélectionnez <em>Paysages, Culture, Agriculture, Cérémonies...</em>
              </p>
            </div>

            <div className="p-3 rounded-2xl bg-stone-950 border border-stone-800 space-y-1">
              <div className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 font-bold flex items-center justify-center text-xs">
                4
              </div>
              <span className="font-bold text-white block">Modifier ou Retirer</span>
              <p className="text-[11px] text-stone-400">
                Icône Crayon pour corriger, Corbeille rouge pour supprimer immédiatement.
              </p>
            </div>
          </div>

          {/* FICTITIOUS SCREENSHOT 3: Photo Gallery Management Mockup */}
          <div className="space-y-2">
            <span className="text-xs font-bold text-emerald-300 flex items-center gap-1.5">
              <Image className="w-3.5 h-3.5" />
              Capture d’Écran Simulée 3 : La Console Médiathèque & Actions Photos
            </span>

            <div className="rounded-2xl border border-stone-700 bg-stone-950 p-5 space-y-4 shadow-xl">
              {/* Top Controls */}
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-stone-800 pb-3">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-white">Album sélectionné :</span>
                  <div className="px-2.5 py-1 rounded-lg bg-stone-900 border border-stone-800 text-xs text-amber-400 font-semibold">
                    Paysages & Mont Nlonako
                  </div>
                </div>

                <div className="px-3 py-1.5 rounded-xl bg-emerald-600 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm">
                  <Plus className="w-3.5 h-3.5" />
                  <span>Ajouter une photo</span>
                </div>
              </div>

              {/* Gallery Cards Grid Mockup */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {/* Photo 1 */}
                <div className="bg-stone-900 border border-stone-800 rounded-xl overflow-hidden p-2.5 space-y-2">
                  <div className="h-28 rounded-lg bg-gradient-to-tr from-emerald-900 via-stone-800 to-amber-900 flex items-center justify-center text-xs text-stone-400 font-medium">
                    [Photo : Contreforts du Mont Nlonako]
                  </div>
                  <div>
                    <span className="font-bold text-xs text-white block truncate">Vue panoramique du massif</span>
                    <span className="text-[10px] text-emerald-400 block">Album : Paysages</span>
                  </div>
                  <div className="flex items-center justify-between pt-1 border-t border-stone-800/60">
                    <span className="text-[10px] text-stone-500">29 Septembre 2026</span>
                    <div className="flex items-center gap-1.5">
                      <div className="p-1 rounded bg-blue-500/20 text-blue-400" title="Modifier">
                        <Edit3 className="w-3 h-3" />
                      </div>
                      <div className="p-1 rounded bg-red-500/20 text-red-400" title="Retirer">
                        <Trash2 className="w-3 h-3" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Photo 2 */}
                <div className="bg-stone-900 border border-stone-800 rounded-xl overflow-hidden p-2.5 space-y-2">
                  <div className="h-28 rounded-lg bg-gradient-to-tr from-amber-950 via-stone-800 to-emerald-950 flex items-center justify-center text-xs text-stone-400 font-medium">
                    [Photo : Cérémonie Royale Coutumière]
                  </div>
                  <div>
                    <span className="font-bold text-xs text-white block truncate">Cour d'Honneur du Palais</span>
                    <span className="text-[10px] text-amber-400 block">Album : Culture & Traditions</span>
                  </div>
                  <div className="flex items-center justify-between pt-1 border-t border-stone-800/60">
                    <span className="text-[10px] text-stone-500">18 Septembre 2026</span>
                    <div className="flex items-center gap-1.5">
                      <div className="p-1 rounded bg-blue-500/20 text-blue-400" title="Modifier">
                        <Edit3 className="w-3 h-3" />
                      </div>
                      <div className="p-1 rounded bg-red-500/20 text-red-400" title="Retirer">
                        <Trash2 className="w-3 h-3" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Photo 3 */}
                <div className="bg-stone-900 border border-stone-800 rounded-xl overflow-hidden p-2.5 space-y-2">
                  <div className="h-28 rounded-lg bg-gradient-to-tr from-stone-800 via-emerald-950 to-blue-950 flex items-center justify-center text-xs text-stone-400 font-medium">
                    [Photo : Récolte Caféière & Cacao]
                  </div>
                  <div>
                    <span className="font-bold text-xs text-white block truncate">Terroir Agricole de Ntolo</span>
                    <span className="text-[10px] text-emerald-400 block">Album : Agriculture</span>
                  </div>
                  <div className="flex items-center justify-between pt-1 border-t border-stone-800/60">
                    <span className="text-[10px] text-stone-500">12 Septembre 2026</span>
                    <div className="flex items-center gap-1.5">
                      <div className="p-1 rounded bg-blue-500/20 text-blue-400" title="Modifier">
                        <Edit3 className="w-3 h-3" />
                      </div>
                      <div className="p-1 rounded bg-red-500/20 text-red-400" title="Retirer">
                        <Trash2 className="w-3 h-3" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 5. STEP-BY-STEP: INVITER LES NOUVEAUX ADMINISTRATEURS (With Fictitious Screenshot) */}
      {(activeFilter === 'all' || activeFilter === 'admins') && (
        <div className="bg-stone-900 border border-stone-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="flex items-center space-x-2.5 border-b border-stone-800 pb-3">
            <div className="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <UserPlus className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif-royal text-base sm:text-lg font-bold text-white">
                Étape par Étape : Comment Inviter un Nouvel Administrateur
              </h3>
              <span className="text-[11px] text-amber-400 font-medium">
                Conformément à la règle des 5 administrateurs avec attribution des mêmes droits
              </span>
            </div>
          </div>

          {/* Workflow Steps Explanation */}
          <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 text-xs">
            <div className="p-3 rounded-2xl bg-stone-950 border border-stone-800 space-y-1">
              <div className="w-6 h-6 rounded-full bg-amber-500/20 text-amber-400 font-bold flex items-center justify-center text-xs">
                1
              </div>
              <span className="font-bold text-white block">Onglet Utilisateurs</span>
              <p className="text-[11px] text-stone-400">
                Ouvrez la section <strong>« Utilisateurs & Rôles »</strong>.
              </p>
            </div>

            <div className="p-3 rounded-2xl bg-stone-950 border border-stone-800 space-y-1">
              <div className="w-6 h-6 rounded-full bg-amber-500/20 text-amber-400 font-bold flex items-center justify-center text-xs">
                2
              </div>
              <span className="font-bold text-white block">Vérifier le Quota</span>
              <p className="text-[11px] text-stone-400">
                Vérifiez qu'il reste au moins 1 place sur les 5 autorisées.
              </p>
            </div>

            <div className="p-3 rounded-2xl bg-stone-950 border border-stone-800 space-y-1">
              <div className="w-6 h-6 rounded-full bg-amber-500/20 text-amber-400 font-bold flex items-center justify-center text-xs">
                3
              </div>
              <span className="font-bold text-white block">Ajouter l'Admin</span>
              <p className="text-[11px] text-stone-400">
                Cliquez sur le bouton doré <strong>« + Ajouter un administrateur »</strong>.
              </p>
            </div>

            <div className="p-3 rounded-2xl bg-stone-950 border border-stone-800 space-y-1">
              <div className="w-6 h-6 rounded-full bg-amber-500/20 text-amber-400 font-bold flex items-center justify-center text-xs">
                4
              </div>
              <span className="font-bold text-white block">Donner les Mêmes Droits</span>
              <p className="text-[11px] text-stone-400">
                Sélectionnez le rôle <strong>Administrateur Principal</strong>.
              </p>
            </div>

            <div className="p-3 rounded-2xl bg-stone-950 border border-stone-800 space-y-1">
              <div className="w-6 h-6 rounded-full bg-amber-500/20 text-amber-400 font-bold flex items-center justify-center text-xs">
                5
              </div>
              <span className="font-bold text-white block">Transmettre les Accès</span>
              <p className="text-[11px] text-stone-400">
                Fournissez l'identifiant et le mot de passe initial sécurisé au membre.
              </p>
            </div>
          </div>

          {/* FICTITIOUS SCREENSHOT 4: Add Admin Modal Mockup */}
          <div className="space-y-2">
            <span className="text-xs font-bold text-amber-300 flex items-center gap-1.5">
              <UserPlus className="w-3.5 h-3.5" />
              Capture d’Écran Simulée 4 : La Fenêtre d'Invitation d'un Administrateur
            </span>

            <div className="rounded-2xl border border-amber-500/40 bg-stone-950 p-5 space-y-4 shadow-xl">
              {/* Modal Header */}
              <div className="flex items-center justify-between border-b border-stone-800 pb-3">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold text-xs">
                    <UserPlus className="w-4 h-4" />
                  </div>
                  <div>
                    <h5 className="font-bold text-xs text-white">Ajouter un Nouvel Administrateur</h5>
                    <span className="text-[10px] text-amber-400">Quota respecté : Attribution du Siège 2 sur 5</span>
                  </div>
                </div>
                <div className="px-2 py-0.5 rounded-full bg-emerald-950 border border-emerald-700/50 text-[10px] text-emerald-300 font-bold">
                  Place Libre
                </div>
              </div>

              {/* Form Simulation */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div>
                  <label className="text-[11px] font-bold text-stone-300 block mb-1">
                    Nom complet de l'administrateur *
                  </label>
                  <div className="p-2 rounded-xl bg-stone-900 border border-stone-800 text-white text-xs">
                    Notable Jean Elembe
                  </div>
                </div>

                <div>
                  <label className="text-[11px] font-bold text-stone-300 block mb-1">
                    Adresse email officielle *
                  </label>
                  <div className="p-2 rounded-xl bg-stone-900 border border-stone-800 text-stone-300 text-xs">
                    jean.elembe@ntolo-village.cm
                  </div>
                </div>

                <div>
                  <label className="text-[11px] font-bold text-stone-300 block mb-1">
                    Rôle attribué (Droits complets) *
                  </label>
                  <div className="p-2 rounded-xl bg-amber-950/60 border border-amber-500/60 text-amber-300 font-bold text-xs flex items-center justify-between">
                    <span>Administrateur Principal (Mêmes droits)</span>
                    <Crown className="w-3.5 h-3.5 text-amber-400" />
                  </div>
                </div>

                <div>
                  <label className="text-[11px] font-bold text-stone-300 block mb-1">
                    Mot de passe initial sécurisé *
                  </label>
                  <div className="p-2 rounded-xl bg-stone-900 border border-stone-800 text-stone-400 font-mono text-xs flex items-center justify-between">
                    <span>••••••••••••</span>
                    <Lock className="w-3.5 h-3.5 text-stone-500" />
                  </div>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="flex items-center justify-between pt-2 border-t border-stone-800/80">
                <span className="text-[11px] text-stone-400">
                  🔒 Chiffrement SHA-256 avec salage automatique
                </span>

                <div className="px-4 py-2 rounded-xl bg-amber-500 text-stone-950 font-bold text-xs flex items-center gap-1.5 shadow-md">
                  <UserPlus className="w-3.5 h-3.5 text-stone-950" />
                  <span>Enregistrer l'Administrateur</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 6. WHATSAPP & SECRETARIAT DIRECT LINES */}
      <div className="bg-stone-900 border border-stone-800 rounded-3xl p-6 sm:p-7 space-y-4 shadow-xl">
        <div className="flex items-center space-x-2.5 border-b border-stone-800 pb-3">
          <div className="w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
            <Smartphone className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-serif-royal text-base sm:text-lg font-bold text-white">
              Canaux WhatsApp & Contacts du Secrétariat
            </h3>
            <span className="text-[11px] text-emerald-400 font-medium">
              Les 2 numéros configurés pour recevoir les requêtes des visiteurs
            </span>
          </div>
        </div>

        <p className="text-xs text-stone-300 leading-relaxed">
          Le portail est configuré pour diriger automatiquement les messages WhatsApp des visiteurs vers les deux lignes officielles de la permanence :
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="p-4 rounded-2xl bg-stone-950 border border-emerald-900/60 space-y-1.5">
            <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded-full inline-block">
              Ligne Principale 1
            </span>
            <div className="font-mono text-base font-bold text-white tracking-wide">
              (+237) 699 21 77 61
            </div>
            <p className="text-[11px] text-stone-400">
              Relié au bouton flottant WhatsApp et à la page de contact officielle.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-stone-950 border border-emerald-900/60 space-y-1.5">
            <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded-full inline-block">
              Ligne Secrétariat 2
            </span>
            <div className="font-mono text-base font-bold text-white tracking-wide">
              (+237) 694 68 18 40
            </div>
            <p className="text-[11px] text-stone-400">
              Ligne directe secondaire accessible pour les audiences et urgences.
            </p>
          </div>
        </div>
      </div>

      {/* 7. Interactive FAQ Accordion */}
      <div className="bg-stone-900 border border-stone-800 rounded-3xl p-6 sm:p-8 space-y-4 shadow-xl">
        <div className="flex items-center space-x-2.5 border-b border-stone-800 pb-3">
          <HelpCircle className="w-5 h-5 text-amber-400" />
          <h3 className="font-serif-royal text-base sm:text-lg font-bold text-white">
            Questions Fréquentes de l'Équipe d'Administration
          </h3>
        </div>

        <div className="space-y-2 pt-1">
          {faqItems.map((item, idx) => {
            const isOpen = activeFaq === idx;
            return (
              <div
                key={idx}
                className="rounded-2xl border border-stone-800 bg-stone-950 overflow-hidden transition-colors"
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(idx)}
                  className="w-full flex items-center justify-between p-4 text-left hover:bg-stone-900/60 transition-colors"
                >
                  <span className="font-bold text-xs sm:text-sm text-stone-200">
                    {item.q}
                  </span>
                  {isOpen ? (
                    <ChevronUp className="w-4 h-4 text-amber-400 flex-shrink-0 ml-2" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-stone-400 flex-shrink-0 ml-2" />
                  )}
                </button>

                {isOpen && (
                  <div className="px-4 pb-4 pt-1 text-xs text-stone-400 leading-relaxed border-t border-stone-800/50">
                    {item.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
