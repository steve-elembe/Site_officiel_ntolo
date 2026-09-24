/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Gestionnaire d'erreurs global (React Error Boundary)
 * Portail Numérique Officiel de Ntolo
 */

import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCw, Home, ShieldAlert } from 'lucide-react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Log interne discret sans exposer les données privées
    console.error('Portail Ntolo - Interception d’erreur d’affichage :', error, errorInfo);
  }

  private handleReload = () => {
    window.location.reload();
  };

  private handleGoHome = () => {
    this.setState({ hasError: false });
    window.location.href = '/';
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-stone-100 flex items-center justify-center p-4">
          <div className="max-w-md w-full bg-white rounded-3xl p-8 border border-stone-200 shadow-xl text-center space-y-6">
            <div className="w-16 h-16 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center mx-auto border-2 border-amber-300">
              <ShieldAlert className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <span className="text-[11px] font-bold uppercase tracking-widest text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                Chefferie de Ntolo • Sécurité
              </span>
              <h1 className="text-xl font-serif-royal font-bold text-slate-900">
                Une interruption technique est survenue
              </h1>
              <p className="text-xs text-slate-600 leading-relaxed">
                Le système a préservé l'intégrité de vos données. Cette anomalie temporaire a été contenue sans impacter les services de la Chefferie.
              </p>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row gap-3">
              <button
                onClick={this.handleReload}
                className="flex-1 px-4 py-3 rounded-xl bg-emerald-800 hover:bg-emerald-700 text-white font-bold text-xs shadow-sm flex items-center justify-center gap-2 transition-colors"
              >
                <RefreshCw className="w-4 h-4" />
                <span>Actualiser la page</span>
              </button>
              <button
                onClick={this.handleGoHome}
                className="flex-1 px-4 py-3 rounded-xl bg-stone-100 hover:bg-stone-200 text-slate-800 font-bold text-xs border border-stone-300 flex items-center justify-center gap-2 transition-colors"
              >
                <Home className="w-4 h-4" />
                <span>Retour à l'accueil</span>
              </button>
            </div>

            <p className="text-[11px] text-slate-400">
              Arrondissement de Nlonako, Département du Moungo, Cameroun
            </p>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
