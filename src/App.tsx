/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { PageId, NewsItem } from './types';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { MobileBottomBar } from './components/MobileBottomBar';
import { SearchModal } from './components/SearchModal';
import { DirectoryDrawer } from './components/DirectoryDrawer';

// 26 Views
import { AccueilView } from './views/AccueilView';
import { PresentationView } from './views/PresentationView';
import { HistoireView } from './views/HistoireView';
import { GeographieView } from './views/GeographieView';
import { ChefferieView } from './views/ChefferieView';
import { OrganisationTraditionnelleView } from './views/OrganisationTraditionnelleView';
import { OrganisationAdministrativeView } from './views/OrganisationAdministrativeView';
import { PopulationView } from './views/PopulationView';
import { CultureView } from './views/CultureView';
import { LanguesPatrimoineView } from './views/LanguesPatrimoineView';
import { EducationView } from './views/EducationView';
import { SanteView } from './views/SanteView';
import { AgricultureView } from './views/AgricultureView';
import { ElevageView } from './views/ElevageView';
import { EconomieCommerceView } from './views/EconomieCommerceView';
import { InfrastructuresView } from './views/InfrastructuresView';
import { EnvironnementView } from './views/EnvironnementView';
import { TourismeView } from './views/TourismeView';
import { ProjetsView } from './views/ProjetsView';
import { ProjetsParticipatifsView } from './views/ProjetsParticipatifsView';
import { ActualitesView } from './views/ActualitesView';
import { AnnoncesView } from './views/AnnoncesView';
import { ArticleDetailView } from './views/ArticleDetailView';
import { EvenementsView } from './views/EvenementsView';
import { GalerieView } from './views/GalerieView';
import { DocumentsView } from './views/DocumentsView';
import { DiasporaView } from './views/DiasporaView';
import { ContactView } from './views/ContactView';
import { PartenairesView } from './views/PartenairesView';
import { DevenirPartenaireView } from './views/DevenirPartenaireView';
import { MentionsLegalesView } from './views/MentionsLegalesView';
import { AdminPortalView } from './views/admin/AdminPortalView';
import { AdminLoginView } from './views/admin/AdminLoginView';
import { CommunityActionHubModal } from './components/community/CommunityActionHubModal';
import { FloatingWhatsAppButton } from './components/common/FloatingWhatsAppButton';
import { PartnerAdBanner } from './components/common/PartnerAdBanner';
import { ErrorBoundary } from './components/common/ErrorBoundary';
import { getCurrentAdminUser, logoutAdmin, EVENT_ADMIN_AUTH_CHANGED } from './services/authService';
import { getSiteSettings, EVENT_ADMIN_DATA_CHANGED } from './services/adminService';
import { updatePageSeo, syncCleanUrl, getPageIdFromPath } from './services/seoService';
import { AdminUser, SiteSettings, CommunityFormType } from './types';
import { Megaphone, X, ArrowRight } from 'lucide-react';

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageId>(() => {
    if (typeof window !== 'undefined') {
      return getPageIdFromPath(window.location.pathname);
    }
    return 'accueil';
  });
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isDirectoryOpen, setIsDirectoryOpen] = useState(false);
  const [fontSize, setFontSize] = useState<'normal' | 'large' | 'xlarge'>('normal');
  const [selectedArticleId, setSelectedArticleId] = useState<string>('actu-eau-potable');

  // Admin authentication state
  const [currentAdminUser, setCurrentAdminUser] = useState<Omit<AdminUser, 'passwordHash'> | null>(null);
  const [siteSettings, setSiteSettings] = useState<SiteSettings>(getSiteSettings());
  const [dismissEmergencyBanner, setDismissEmergencyBanner] = useState(false);

  // Global Community Action Hub Modal state
  const [isCommunityModalOpen, setIsCommunityModalOpen] = useState(false);
  const [communityModalInitialType, setCommunityModalInitialType] = useState<CommunityFormType>('contact');

  // Update SEO and sync clean URL on page switch
  useEffect(() => {
    updatePageSeo(currentPage);
    syncCleanUrl(currentPage);
  }, [currentPage]);

  // Handle browser back and forward navigation (popstate)
  useEffect(() => {
    const handlePopState = (e: PopStateEvent) => {
      if (e.state?.pageId) {
        setCurrentPage(e.state.pageId);
      } else {
        setCurrentPage(getPageIdFromPath(window.location.pathname));
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  useEffect(() => {
    // Check initial session
    setCurrentAdminUser(getCurrentAdminUser());

    const handleAuthChange = () => {
      setCurrentAdminUser(getCurrentAdminUser());
    };

    const handleDataChange = () => {
      setSiteSettings(getSiteSettings());
    };

    const handleOpenCommunityModal = (e: Event) => {
      const customEvent = e as CustomEvent<{ type?: CommunityFormType }>;
      if (customEvent.detail?.type) {
        setCommunityModalInitialType(customEvent.detail.type);
      }
      setIsCommunityModalOpen(true);
    };

    window.addEventListener(EVENT_ADMIN_AUTH_CHANGED, handleAuthChange);
    window.addEventListener(EVENT_ADMIN_DATA_CHANGED, handleDataChange);
    window.addEventListener('ntolo_open_community_modal', handleOpenCommunityModal);

    return () => {
      window.removeEventListener(EVENT_ADMIN_AUTH_CHANGED, handleAuthChange);
      window.removeEventListener(EVENT_ADMIN_DATA_CHANGED, handleDataChange);
      window.removeEventListener('ntolo_open_community_modal', handleOpenCommunityModal);
    };
  }, []);

  const handleNavigate = (page: PageId) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAdminLogout = () => {
    logoutAdmin();
    setCurrentAdminUser(null);
    setCurrentPage('accueil');
  };

  const handleOpenArticle = (id: string) => {
    setSelectedArticleId(id);
    setCurrentPage('article-detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectNewsFromHome = (news: NewsItem) => {
    handleOpenArticle(news.id || 'actu-eau-potable');
  };

  // Dedicated Administration Interface
  if (currentPage === 'admin') {
    if (currentAdminUser) {
      return (
        <AdminPortalView
          currentUser={currentAdminUser}
          onLogout={handleAdminLogout}
          onNavigateToPublic={(pId) => handleNavigate(pId || 'accueil')}
        />
      );
    }

    return (
      <AdminLoginView
        onLoginSuccess={() => {
          setCurrentAdminUser(getCurrentAdminUser());
        }}
        onNavigate={handleNavigate}
      />
    );
  }

  // Font size scale class for accessibility
  const getFontSizeClass = () => {
    switch (fontSize) {
      case 'large':
        return 'text-[17px] leading-relaxed';
      case 'xlarge':
        return 'text-[18.5px] leading-relaxed';
      default:
        return 'text-[15px] leading-normal';
    }
  };

  return (
    <ErrorBoundary>
      <div className={`min-h-screen flex flex-col bg-slate-50 text-slate-800 ${getFontSizeClass()}`}>
        {/* Official Emergency Banner configured from Admin */}
        {siteSettings.emergencyBannerActive && !dismissEmergencyBanner && (
          <div className="bg-amber-600 text-stone-950 px-4 py-2.5 shadow-md flex items-center justify-between text-xs sm:text-sm font-semibold border-b border-amber-700">
            <div className="max-w-7xl mx-auto w-full flex items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <Megaphone className="w-4 h-4 text-stone-950 flex-shrink-0 animate-bounce" />
                <span className="font-extrabold uppercase tracking-wider text-[11px] bg-stone-950 text-amber-300 px-2 py-0.5 rounded-full">
                  Avis Officiel
                </span>
                <span className="line-clamp-1 text-stone-950">
                  {siteSettings.emergencyBannerText}
                </span>
              </div>
              <div className="flex items-center gap-3 flex-shrink-0">
                <button
                  onClick={() => handleNavigate('annonces')}
                  className="hidden sm:inline-flex items-center gap-1 text-xs font-bold underline hover:text-stone-900"
                >
                  <span>Lire les annonces</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => setDismissEmergencyBanner(true)}
                  title="Fermer la bannière"
                  className="p-1 rounded hover:bg-amber-700/40 text-stone-950"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Emplacement Partenaire Éthique & Non-intrusif (Configurable en Admin) */}
        <PartnerAdBanner onNavigateToPartners={() => handleNavigate('partenaires')} />

        {/* Top Navbar */}
      <Navbar
        currentPage={currentPage}
        onNavigate={handleNavigate}
        onOpenSearch={() => setIsSearchOpen(true)}
        fontSize={fontSize}
        onChangeFontSize={setFontSize}
      />

      {/* Main Content View Container */}
      <main className="flex-1 w-full">
        {currentPage === 'accueil' && (
          <AccueilView
            onNavigate={handleNavigate}
            onSelectNews={handleSelectNewsFromHome}
          />
        )}
        {currentPage === 'presentation' && <PresentationView onNavigate={handleNavigate} />}
        {currentPage === 'histoire' && <HistoireView onNavigate={handleNavigate} />}
        {currentPage === 'geographie' && <GeographieView onNavigate={handleNavigate} />}
        {currentPage === 'chefferie' && <ChefferieView onNavigate={handleNavigate} />}
        {currentPage === 'organisation-traditionnelle' && <OrganisationTraditionnelleView onNavigate={handleNavigate} />}
        {currentPage === 'organisation-administrative' && <OrganisationAdministrativeView onNavigate={handleNavigate} />}
        {currentPage === 'population' && <PopulationView onNavigate={handleNavigate} />}
        {currentPage === 'culture' && <CultureView onNavigate={handleNavigate} />}
        {currentPage === 'langues-patrimoine' && <LanguesPatrimoineView onNavigate={handleNavigate} />}
        {currentPage === 'education' && <EducationView onNavigate={handleNavigate} />}
        {currentPage === 'sante' && <SanteView onNavigate={handleNavigate} />}
        {currentPage === 'agriculture' && <AgricultureView onNavigate={handleNavigate} />}
        {currentPage === 'elevage' && <ElevageView onNavigate={handleNavigate} />}
        {currentPage === 'economie-commerce' && <EconomieCommerceView onNavigate={handleNavigate} />}
        {currentPage === 'infrastructures' && <InfrastructuresView onNavigate={handleNavigate} />}
        {currentPage === 'environnement' && <EnvironnementView onNavigate={handleNavigate} />}
        {currentPage === 'tourisme' && <TourismeView onNavigate={handleNavigate} />}
        {currentPage === 'projets' && <ProjetsView onNavigate={handleNavigate} />}
        {currentPage === 'projets-participatifs' && <ProjetsParticipatifsView onNavigate={handleNavigate} />}
        {currentPage === 'actualites' && (
          <ActualitesView
            onNavigate={handleNavigate}
            onSelectArticle={handleOpenArticle}
          />
        )}
        {currentPage === 'annonces' && (
          <AnnoncesView
            onNavigate={handleNavigate}
            onSelectArticle={handleOpenArticle}
          />
        )}
        {currentPage === 'article-detail' && (
          <ArticleDetailView
            articleId={selectedArticleId}
            onNavigate={handleNavigate}
            onSelectArticle={handleOpenArticle}
          />
        )}
        {currentPage === 'evenements' && (
          <EvenementsView
            onNavigate={handleNavigate}
            onSelectArticle={handleOpenArticle}
          />
        )}
        {currentPage === 'galerie' && <GalerieView onNavigate={handleNavigate} />}
        {currentPage === 'documents' && <DocumentsView onNavigate={handleNavigate} />}
        {currentPage === 'diaspora' && <DiasporaView onNavigate={handleNavigate} />}
        {currentPage === 'contact' && <ContactView onNavigate={handleNavigate} />}
        {currentPage === 'partenaires' && <PartenairesView onNavigate={handleNavigate} />}
        {currentPage === 'devenir-partenaire' && <DevenirPartenaireView onNavigate={handleNavigate} />}
        {currentPage === 'mentions-legales' && <MentionsLegalesView onNavigate={handleNavigate} />}
      </main>

      {/* Institutional Footer */}
      <Footer onNavigate={handleNavigate} />

      {/* Sticky Bottom Navigation for Mobile / Android Priority */}
      <MobileBottomBar
        currentPage={currentPage}
        onNavigate={handleNavigate}
        onOpenDirectory={() => setIsDirectoryOpen(true)}
      />

      {/* Global Real-time Search Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onNavigate={handleNavigate}
      />

      {/* 19-Pages Full Mobile Directory Drawer */}
      <DirectoryDrawer
        isOpen={isDirectoryOpen}
        onClose={() => setIsDirectoryOpen(false)}
        currentPage={currentPage}
        onNavigate={handleNavigate}
      />

      {/* Global Community Action Hub Modal (Accessible across the portal) */}
      <CommunityActionHubModal
        isOpen={isCommunityModalOpen}
        onClose={() => setIsCommunityModalOpen(false)}
        initialFormType={communityModalInitialType}
        onNavigateToParticipatory={() => handleNavigate('projets-participatifs')}
      />

      {/* Floating Configurable WhatsApp Direct Action */}
      <FloatingWhatsAppButton />
    </div>
    </ErrorBoundary>
  );
}
