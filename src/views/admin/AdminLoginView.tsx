import React, { useState } from 'react';
import {
  Lock, Mail, Eye, EyeOff, ShieldCheck, ArrowLeft, KeyRound,
  Crown, Edit3, FolderHeart, AlertTriangle, CheckCircle2, Building2
} from 'lucide-react';
import { loginAdmin } from '../../services/authService';
import { PageId } from '../../types';

interface AdminLoginViewProps {
  onLoginSuccess: () => void;
  onNavigate: (page: PageId) => void;
}

export const AdminLoginView: React.FC<AdminLoginViewProps> = ({ onLoginSuccess, onNavigate }) => {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    if (!identifier.trim() || !password) {
      setErrorMessage('Veuillez renseigner votre identifiant (ou email) et votre mot de passe.');
      return;
    }

    setLoading(true);
    try {
      const res = await loginAdmin(identifier, password, rememberMe);
      if (res.success) {
        onLoginSuccess();
      } else {
        setErrorMessage(res.error || 'Identifiant ou mot de passe incorrect.');
      }
    } catch (err) {
      setErrorMessage('Erreur de connexion sécurisée.');
    } finally {
      setLoading(false);
    }
  };

  const handlePreFill = (user: string, pass: string) => {
    setIdentifier(user);
    setPassword(pass);
    setErrorMessage('');
  };

  return (
    <div className="min-h-screen bg-stone-950 text-stone-100 flex flex-col justify-between py-10 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Decorative background glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-emerald-600/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-10 right-10 w-72 h-72 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>

      {/* Top Bar with back to site */}
      <div className="max-w-4xl mx-auto w-full flex items-center justify-between z-10">
        <button
          onClick={() => onNavigate('accueil')}
          className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-stone-300 hover:text-white transition-colors bg-stone-900/80 px-3.5 py-2 rounded-xl border border-stone-800"
        >
          <ArrowLeft className="w-4 h-4 text-emerald-400" />
          <span>Retour au site public de Ntolo</span>
        </button>

        <div className="hidden sm:flex items-center gap-2 text-xs text-amber-300/80 bg-amber-950/40 px-3 py-1.5 rounded-lg border border-amber-900/50">
          <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
          <span>Chiffrement SHA-256 avec salage</span>
        </div>
      </div>

      {/* Main Login Card */}
      <div className="max-w-md w-full mx-auto my-auto z-10 space-y-6">
        {/* Header Institutionnel */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-tr from-amber-600 to-amber-400 text-stone-950 shadow-xl shadow-amber-500/20 ring-4 ring-stone-900">
            <Lock className="w-7 h-7" />
          </div>
          <div>
            <span className="text-[11px] font-bold uppercase tracking-widest text-amber-400 block">
              République du Cameroun • Moungo
            </span>
            <h1 className="font-serif-royal text-2xl sm:text-3xl font-extrabold text-white tracking-tight mt-1">
              Espace d’Administration
            </h1>
            <p className="text-xs text-stone-400 mt-1">
              Portail de gestion officiel de la Chefferie et du CODEV de Ntolo
            </p>
          </div>
        </div>

        {/* Card Form */}
        <div className="bg-stone-900/90 backdrop-blur-xl border border-stone-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-5">
          {errorMessage && (
            <div className="p-3.5 rounded-xl bg-red-950/60 border border-red-800/80 text-red-200 text-xs flex items-start gap-2.5 animate-in fade-in">
              <AlertTriangle className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
              <span>{errorMessage}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-stone-300">
                Identifiant ou adresse e-mail officielle
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-stone-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  required
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  placeholder="ex: admin@ntolo.cm ou admin"
                  className="w-full pl-10 pr-3 py-2.5 rounded-xl bg-stone-950 border border-stone-700/80 text-white placeholder-stone-600 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="block text-xs font-bold text-stone-300">
                  Mot de passe sécurisé
                </label>
                <span className="text-[10px] text-stone-400 italic">SHA-256</span>
              </div>
              <div className="relative">
                <KeyRound className="w-4 h-4 text-stone-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Entrez votre mot de passe"
                  className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-stone-950 border border-stone-700/80 text-white placeholder-stone-600 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-500 hover:text-stone-300"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs pt-1">
              <label className="flex items-center gap-2 cursor-pointer text-stone-400 hover:text-stone-300">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="rounded bg-stone-800 border-stone-700 text-amber-500 focus:ring-0"
                />
                <span>Mémoriser ma session</span>
              </label>
              <span className="text-[11px] text-stone-500">Accès restreint</span>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-stone-950 font-extrabold text-xs sm:text-sm tracking-wide shadow-lg shadow-amber-500/20 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {loading ? (
                <div className="w-4 h-4 border-2 border-stone-950 border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <>
                  <ShieldCheck className="w-4 h-4" />
                  <span>Se connecter au Portail Administrateur</span>
                </>
              )}
            </button>
          </form>

          {/* Rôles et comptes préconfigurés pour test direct */}
          <div className="pt-4 border-t border-stone-800/80 space-y-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400 block text-center">
              Comptes de test & Rôles disponibles
            </span>
            <div className="grid grid-cols-1 gap-1.5">
              <button
                type="button"
                onClick={() => handlePreFill('admin@ntolo.cm', 'ntolo2026')}
                className="text-left px-3 py-2 rounded-xl bg-stone-950/60 hover:bg-stone-800 border border-stone-800 text-[11px] flex items-center justify-between transition-colors group"
              >
                <div className="flex items-center gap-2">
                  <Crown className="w-3.5 h-3.5 text-amber-400" />
                  <div>
                    <span className="font-bold text-stone-200">Admin Principal</span>
                    <span className="text-stone-400 ml-1.5">(Tous les droits)</span>
                  </div>
                </div>
                <span className="text-[10px] text-amber-400 font-mono group-hover:underline">ntolo2026</span>
              </button>

              <button
                type="button"
                onClick={() => handlePreFill('editeur@ntolo.cm', 'editeur2026')}
                className="text-left px-3 py-2 rounded-xl bg-stone-950/60 hover:bg-stone-800 border border-stone-800 text-[11px] flex items-center justify-between transition-colors group"
              >
                <div className="flex items-center gap-2">
                  <Edit3 className="w-3.5 h-3.5 text-emerald-400" />
                  <div>
                    <span className="font-bold text-stone-200">Éditeur</span>
                    <span className="text-stone-400 ml-1.5">(Publication & gestion)</span>
                  </div>
                </div>
                <span className="text-[10px] text-emerald-400 font-mono group-hover:underline">editeur2026</span>
              </button>

              <button
                type="button"
                onClick={() => handlePreFill('redacteur@ntolo.cm', 'redaction2026')}
                className="text-left px-3 py-2 rounded-xl bg-stone-950/60 hover:bg-stone-800 border border-stone-800 text-[11px] flex items-center justify-between transition-colors group"
              >
                <div className="flex items-center gap-2">
                  <FolderHeart className="w-3.5 h-3.5 text-blue-400" />
                  <div>
                    <span className="font-bold text-stone-200">Gestionnaire Contenu</span>
                    <span className="text-stone-400 ml-1.5">(Brouillons & médias)</span>
                  </div>
                </div>
                <span className="text-[10px] text-blue-400 font-mono group-hover:underline">redaction2026</span>
              </button>
            </div>
          </div>
        </div>

        {/* Security pledge */}
        <p className="text-[11px] text-center text-stone-400 max-w-sm mx-auto leading-relaxed">
          Sécurité certifiée : Les mots de passe sont rigoureusement salés et hachés en SHA-256. Aucune clé ou mot de passe en clair n’est conservé.
        </p>
      </div>

      {/* Institutional Footer notice */}
      <div className="max-w-4xl mx-auto w-full text-center text-[10px] text-stone-400 z-10 pt-6">
        Portail Numérique Officiel • Chefferie Traditionnelle de 3e Degré de Ntolo • Nlonako / Moungo • Littoral Cameroun
      </div>
    </div>
  );
};
