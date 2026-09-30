import { useState, useEffect } from 'react';
import { PageId } from '../types';
import {
  getPageContent,
  PageContentData,
  EVENT_PAGE_CONTENT_CHANGED,
  subscribePageContent,
} from '../services/pageContentService';

/**
 * Custom React hook that subscribes to real-time content changes for a given page.
 * Whenever an administrator edits any text, section, or bullet on this page,
 * the component immediately re-renders with the latest updated content via Firestore onSnapshot.
 */
export function usePageContent(pageId: PageId): PageContentData {
  const [content, setContent] = useState<PageContentData>(() => getPageContent(pageId));

  useEffect(() => {
    // Initial fetch
    setContent(getPageContent(pageId));

    // 1. Direct Firestore onSnapshot listener
    const unsubFirestore = subscribePageContent(pageId, (freshContent) => {
      setContent(freshContent);
    });

    // 2. Custom window event listener for instant local updates
    const handleContentChanged = (event: Event) => {
      const customEvent = event as CustomEvent<{ pageId?: PageId; content?: PageContentData }>;
      if (!customEvent.detail || !customEvent.detail.pageId || customEvent.detail.pageId === pageId) {
        setContent(getPageContent(pageId));
      }
    };

    window.addEventListener(EVENT_PAGE_CONTENT_CHANGED, handleContentChanged);
    return () => {
      unsubFirestore();
      window.removeEventListener(EVENT_PAGE_CONTENT_CHANGED, handleContentChanged);
    };
  }, [pageId]);

  return content;
}

