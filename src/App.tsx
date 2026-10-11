import React, { useState, useEffect } from 'react';
import { ApologySite, ThemeDefinition, ThemeId } from './types/builder';
import { INITIAL_APOLOGY_SITE, THEMES, MessagePreset } from './data/templates';
import { Header } from './components/Header';
import { BlockCanvas } from './components/builder/BlockCanvas';
import { CardStudioModal } from './components/builder/CardStudioModal';
import { MessageLibraryModal } from './components/builder/MessageLibraryModal';
import { TemplatePickerModal } from './components/builder/TemplatePickerModal';
import { EmailShareModal } from './components/builder/EmailShareModal';
import { RecipientView } from './components/recipient/RecipientView';
import { decodeSiteFromHash, encodeSiteToHash } from './utils/shareUtils';
import { Sparkles, Palette, Mail, BookOpen, PenTool } from 'lucide-react';

export default function App() {
  const [site, setSite] = useState<ApologySite>(() => {
    // Check if loaded from URL hash
    if (window.location.hash) {
      const decoded = decodeSiteFromHash(window.location.hash);
      if (decoded) return decoded;
    }
    // Check localStorage
    try {
      const saved = localStorage.getItem('heartfelt_apology_site');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      // Ignore
    }
    return INITIAL_APOLOGY_SITE;
  });

  const [currentView, setCurrentView] = useState<'builder' | 'preview'>(() => {
    // If URL hash contains site data, land directly into recipient preview mode!
    return window.location.hash.includes('site=') ? 'preview' : 'builder';
  });

  // Modal states
  const [isCardStudioOpen, setIsCardStudioOpen] = useState(false);
  const [isMessageLibraryOpen, setIsMessageLibraryOpen] = useState(false);
  const [isThemePickerOpen, setIsThemePickerOpen] = useState(false);
  const [isEmailShareOpen, setIsEmailShareOpen] = useState(false);

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('heartfelt_apology_site', JSON.stringify(site));
    } catch (e) {
      // Ignore
    }
  }, [site]);

  const currentTheme: ThemeDefinition = THEMES[site.themeId] || THEMES.candlelight;

  const handleUpdateSite = (updated: Partial<ApologySite>) => {
    setSite((prev) => ({ ...prev, ...updated }));
  };

  const handleApplyPreset = (preset: MessagePreset) => {
    const updatedBlocks = site.blocks.map((block) => {
      if (block.type === 'hero') {
        return {
          ...block,
          headline: preset.headline,
          subtitle: preset.subtitle,
        };
      }
      if (block.type === 'letter') {
        return {
          ...block,
          paragraphs: preset.letter,
        };
      }
      if (block.type === 'promise_bond') {
        return {
          ...block,
          clauses: preset.clauses,
          sweetPenalty: preset.penalty,
        };
      }
      return block;
    });

    setSite((prev) => ({
      ...prev,
      blocks: updatedBlocks,
    }));
  };

  const handleApplyAIGenerated = (aiData: any) => {
    const updatedBlocks = site.blocks.map((block) => {
      if (block.type === 'hero' && aiData.headline) {
        return {
          ...block,
          headline: aiData.headline,
          subtitle: aiData.subtitle || block.subtitle,
        };
      }
      if (block.type === 'letter' && aiData.letter) {
        const paras = typeof aiData.letter === 'string'
          ? aiData.letter.split('\n\n').filter(Boolean)
          : Array.isArray(aiData.letter) ? aiData.letter : block.paragraphs;
        return {
          ...block,
          paragraphs: paras,
        };
      }
      if (block.type === 'promise_bond') {
        return {
          ...block,
          clauses: aiData.contractClauses || block.clauses,
          sweetPenalty: aiData.sweetPenalty || block.sweetPenalty,
        };
      }
      if (block.type === 'vouchers' && aiData.voucherOffers) {
        return {
          ...block,
          vouchers: aiData.voucherOffers.map((vo: any, i: number) => ({
            id: `v-ai-${i}`,
            title: vo.title,
            description: vo.desc || vo.description,
            terms: 'Redeemable anytime without expiration.',
          })),
        };
      }
      return block;
    });

    setSite((prev) => ({
      ...prev,
      blocks: updatedBlocks,
    }));
  };

  return (
    <div className="min-h-screen bg-neutral-50 text-neutral-900 font-sans selection:bg-rose-200">
      {/* Top Bar Header */}
      <Header
        currentView={currentView}
        onViewChange={setCurrentView}
        onOpenCardStudio={() => setIsCardStudioOpen(true)}
        onOpenMessageLibrary={() => setIsMessageLibraryOpen(true)}
        onOpenThemePicker={() => setIsThemePickerOpen(true)}
        onOpenEmailShare={() => setIsEmailShareOpen(true)}
      />

      {/* Main Content Area */}
      {currentView === 'builder' ? (
        <main className="max-w-7xl mx-auto px-4 sm:px-6 pt-6 pb-24">
          {/* Quick Customization Toolbar */}
          <div className="mb-8 p-4 rounded-2xl bg-white border border-neutral-200 shadow-xs flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono uppercase text-neutral-400">Recipient:</span>
                <input
                  type="text"
                  value={site.recipientName}
                  onChange={(e) => handleUpdateSite({ recipientName: e.target.value })}
                  placeholder="Partner's Name"
                  className="px-3 py-1.5 text-xs font-semibold bg-neutral-50 border border-neutral-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-neutral-900 w-36"
                />
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs font-mono uppercase text-neutral-400">Apologizer:</span>
                <input
                  type="text"
                  value={site.apologizerName}
                  onChange={(e) => handleUpdateSite({ apologizerName: e.target.value })}
                  placeholder="Your Name"
                  className="px-3 py-1.5 text-xs font-semibold bg-neutral-50 border border-neutral-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-neutral-900 w-36"
                />
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setIsCardStudioOpen(true)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-neutral-200 hover:border-neutral-300 text-xs font-medium bg-neutral-50 hover:bg-white transition-colors cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5 text-rose-600" />
                Wax Seal & Card
              </button>

              <button
                type="button"
                onClick={() => setIsThemePickerOpen(true)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-neutral-200 hover:border-neutral-300 text-xs font-medium bg-neutral-50 hover:bg-white transition-colors cursor-pointer"
              >
                <Palette className="w-3.5 h-3.5 text-amber-600" />
                Theme ({currentTheme.name})
              </button>

              <button
                type="button"
                onClick={() => setIsMessageLibraryOpen(true)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-neutral-200 hover:border-neutral-300 text-xs font-medium bg-neutral-50 hover:bg-white transition-colors cursor-pointer"
              >
                <BookOpen className="w-3.5 h-3.5 text-blue-600" />
                Letter Templates & AI
              </button>
            </div>
          </div>

          {/* Drag & Drop Visual Canvas */}
          <BlockCanvas
            site={site}
            theme={currentTheme}
            onUpdateSite={handleUpdateSite}
            onOpenCardStudio={() => setIsCardStudioOpen(true)}
          />
        </main>
      ) : (
        /* Recipient Live Interactive Experience */
        <RecipientView
          site={site}
          theme={currentTheme}
          onExitPreview={() => setCurrentView('builder')}
          onUpdateSite={handleUpdateSite}
        />
      )}

      {/* Modals */}
      <CardStudioModal
        isOpen={isCardStudioOpen}
        onClose={() => setIsCardStudioOpen(false)}
        config={site.cardConfig}
        recipientName={site.recipientName}
        apologizerName={site.apologizerName}
        onUpdateConfig={(upd) => handleUpdateSite({ cardConfig: { ...site.cardConfig, ...upd } })}
      />

      <MessageLibraryModal
        isOpen={isMessageLibraryOpen}
        onClose={() => setIsMessageLibraryOpen(false)}
        site={site}
        onApplyPreset={handleApplyPreset}
        onApplyGenerated={handleApplyAIGenerated}
      />

      <TemplatePickerModal
        isOpen={isThemePickerOpen}
        onClose={() => setIsThemePickerOpen(false)}
        activeThemeId={site.themeId}
        onSelectTheme={(tId: ThemeId) => handleUpdateSite({ themeId: tId })}
      />

      <EmailShareModal
        isOpen={isEmailShareOpen}
        onClose={() => setIsEmailShareOpen(false)}
        site={site}
        onUpdateSite={handleUpdateSite}
      />
    </div>
  );
}
