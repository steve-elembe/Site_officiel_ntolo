/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Share2, Check, Copy, MessageCircle, Facebook, Twitter, Linkedin, Send } from 'lucide-react';

interface SocialShareBarProps {
  title?: string;
  url?: string;
  description?: string;
  className?: string;
  compact?: boolean;
}

export const SocialShareBar: React.FC<SocialShareBarProps> = ({
  title = 'Village de NTOLO | Portail Numérique Officiel (Moungo, Cameroun)',
  url,
  description = 'Découvrez le portail officiel du village de Ntolo (Nlonako, Moungo, Littoral).',
  className = '',
  compact = false,
}) => {
  const [copied, setCopied] = useState(false);

  const targetUrl = url || (typeof window !== 'undefined' ? window.location.href : 'https://ntolo-village.cm/');
  const encodedUrl = encodeURIComponent(targetUrl);
  const encodedTitle = encodeURIComponent(title);
  const encodedDesc = encodeURIComponent(description);

  const handleCopyLink = async () => {
    try {
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(targetUrl);
      } else {
        const textarea = document.createElement('textarea');
        textarea.value = targetUrl;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch (err) {
      console.error('Failed to copy', err);
    }
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title,
          text: description,
          url: targetUrl,
        });
      } catch (err) {
        // User cancelled or share failed
      }
    } else {
      handleCopyLink();
    }
  };

  const shareLinks = [
    {
      name: 'WhatsApp',
      href: `https://api.whatsapp.com/send?text=${encodedTitle}%20-%20${encodedUrl}`,
      icon: MessageCircle,
      color: 'bg-emerald-600 hover:bg-emerald-700 text-white',
      label: 'WhatsApp',
    },
    {
      name: 'Facebook',
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      icon: Facebook,
      color: 'bg-blue-600 hover:bg-blue-700 text-white',
      label: 'Facebook',
    },
    {
      name: 'X (Twitter)',
      href: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`,
      icon: Twitter,
      color: 'bg-stone-900 hover:bg-stone-800 text-white',
      label: 'X',
    },
    {
      name: 'Telegram',
      href: `https://t.me/share/url?url=${encodedUrl}&text=${encodedTitle}`,
      icon: Send,
      color: 'bg-sky-500 hover:bg-sky-600 text-white',
      label: 'Telegram',
    },
    {
      name: 'LinkedIn',
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
      icon: Linkedin,
      color: 'bg-blue-700 hover:bg-blue-800 text-white',
      label: 'LinkedIn',
    },
  ];

  return (
    <div className={`flex flex-wrap items-center gap-2 ${className}`}>
      {/* Title */}
      <span className="text-xs font-bold text-slate-500 flex items-center gap-1.5 mr-1">
        <Share2 className="w-3.5 h-3.5 text-emerald-700" />
        <span>Partager :</span>
      </span>

      {/* Social buttons */}
      <div className="flex flex-wrap items-center gap-1.5">
        {shareLinks.map((item) => (
          <a
            key={item.name}
            href={item.href}
            target="_blank"
            rel="noopener noreferrer"
            title={`Partager sur ${item.name}`}
            className={`inline-flex items-center justify-center rounded-xl p-2 sm:px-2.5 sm:py-1.5 text-xs font-semibold shadow-xs transition-all transform active:scale-95 ${item.color}`}
          >
            <item.icon className="w-3.5 h-3.5" />
            {!compact && <span className="ml-1.5 hidden md:inline">{item.label}</span>}
          </a>
        ))}

        {/* Copy Link Button */}
        <button
          type="button"
          onClick={handleCopyLink}
          title="Copier le lien direct"
          className="inline-flex items-center justify-center rounded-xl px-2.5 py-1.5 text-xs font-semibold bg-stone-100 hover:bg-stone-200 text-stone-800 border border-stone-200 shadow-xs transition-all active:scale-95"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-600" />
              <span className="ml-1.5 text-emerald-700 font-bold">Lien copié !</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5 text-stone-600" />
              <span className="ml-1.5 hidden sm:inline">Copier le lien</span>
            </>
          )}
        </button>

        {/* Mobile Native Share if supported */}
        {typeof navigator !== 'undefined' && 'share' in navigator && (
          <button
            type="button"
            onClick={handleNativeShare}
            title="Partager via votre appareil"
            className="md:hidden inline-flex items-center justify-center rounded-xl px-2.5 py-1.5 text-xs font-bold bg-amber-500 hover:bg-amber-600 text-stone-950 shadow-xs transition-all"
          >
            <Share2 className="w-3.5 h-3.5 mr-1" />
            <span>Appareil</span>
          </button>
        )}
      </div>
    </div>
  );
};
