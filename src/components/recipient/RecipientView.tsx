import React, { useState, useEffect } from 'react';
import { ApologySite, ThemeDefinition } from '../../types/builder';
import { HeroBlockView } from '../blocks/HeroBlockView';
import { EnvelopeCard } from '../common/EnvelopeCard';
import { LetterBlockView } from '../blocks/LetterBlockView';
import { AccountabilityBlockView } from '../blocks/AccountabilityBlockView';
import { MemoriesBlockView } from '../blocks/MemoriesBlockView';
import { ReasonsWhyBlockView } from '../blocks/ReasonsWhyBlockView';
import { PromiseBondBlockView } from '../blocks/PromiseBondBlockView';
import { VouchersBlockView } from '../blocks/VouchersBlockView';
import { ForgivenessMeterBlockView } from '../blocks/ForgivenessMeterBlockView';
import { WaxSeal } from '../common/WaxSeal';
import { ambientMusic } from '../../utils/ambientAudio';
import { Volume2, VolumeX, ArrowLeft, Heart, Sparkles, Mail } from 'lucide-react';

interface RecipientViewProps {
  site: ApologySite;
  theme: ThemeDefinition;
  onExitPreview?: () => void;
  onUpdateSite?: (updated: Partial<ApologySite>) => void;
}

export const RecipientView: React.FC<RecipientViewProps> = ({
  site,
  theme,
  onExitPreview,
  onUpdateSite,
}) => {
  const [hasOpenedGate, setHasOpenedGate] = useState(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  const toggleMusic = () => {
    const next = ambientMusic.toggle();
    setIsPlayingAudio(next);
  };

  useEffect(() => {
    return () => {
      ambientMusic.stop();
    };
  }, []);

  const handleOpenLetter = () => {
    setHasOpenedGate(true);
    // Start gentle music if user interacts
    if (!isPlayingAudio) {
      ambientMusic.start();
      setIsPlayingAudio(true);
    }
  };

  return (
    <div className={`min-h-screen ${theme.colors.bgCanvas} transition-colors duration-500`}>
      {/* Floating Top Floating Bar */}
      <div className="fixed top-4 right-4 z-50 flex items-center gap-2">
        {/* Ambient music toggle */}
        <button
          type="button"
          onClick={toggleMusic}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-full text-xs font-semibold backdrop-blur-md shadow-lg border transition-all cursor-pointer ${
            isPlayingAudio
              ? 'bg-rose-600 text-white border-rose-500 animate-pulse'
              : 'bg-white/90 text-neutral-800 border-neutral-200 hover:bg-white'
          }`}
          title={isPlayingAudio ? 'Mute ambient piano' : 'Play gentle ambient piano'}
        >
          {isPlayingAudio ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
          <span>{isPlayingAudio ? 'Calming Chimes Active' : 'Calming Music'}</span>
        </button>

        {/* Exit Preview button (if in builder preview mode) */}
        {onExitPreview && (
          <button
            type="button"
            onClick={onExitPreview}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-semibold bg-neutral-900 text-white shadow-lg hover:bg-neutral-800 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Back to Builder
          </button>
        )}
      </div>

      {/* Gatekeeper Intro: Wax-Sealed Invitation Envelope */}
      {!hasOpenedGate ? (
        <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center select-none relative overflow-hidden">
          {/* Subtle background glow */}
          <div className="absolute w-96 h-96 rounded-full bg-rose-200/30 blur-3xl -top-20 -left-20 pointer-events-none" />
          <div className="absolute w-96 h-96 rounded-full bg-amber-200/20 blur-3xl -bottom-20 -right-20 pointer-events-none" />

          <div className="max-w-md w-full bg-white/80 dark:bg-stone-900/80 backdrop-blur-md p-8 sm:p-10 rounded-3xl border border-black/5 shadow-2xl animate-in zoom-in-95 duration-500">
            <div className="flex justify-center mb-6">
              <WaxSeal
                color={site.cardConfig.waxSealColor}
                icon={site.cardConfig.waxSealIcon}
                size="xl"
                showShimmer={true}
                onClick={handleOpenLetter}
              />
            </div>

            <span className="text-[11px] font-mono uppercase tracking-widest text-neutral-500 font-semibold block mb-2">
              Private Apology Delivery
            </span>

            <h1 className="text-2xl sm:text-3xl font-serif font-bold text-neutral-900 dark:text-neutral-100 mb-3">
              For My Dearest {site.recipientName || 'You'}
            </h1>

            <p className="text-sm text-neutral-600 dark:text-neutral-400 font-sans leading-relaxed mb-8">
              A private, wax-sealed apology website has been prepared for you by{' '}
              <span className="font-semibold text-neutral-900 dark:text-neutral-200">
                {site.apologizerName || 'your partner'}
              </span>
              . Take a quiet breath and click the seal to open.
            </p>

            <button
              type="button"
              onClick={handleOpenLetter}
              className="w-full py-3.5 px-6 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-sm font-semibold shadow-lg transition-all transform hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2 cursor-pointer"
            >
              <Sparkles className="w-4 h-4" />
              Break Wax Seal & Read Letter
            </button>
          </div>
        </div>
      ) : (
        /* Full Apology Website Experience */
        <div className="w-full max-w-5xl mx-auto px-4 py-12 animate-in fade-in duration-700">
          {/* Top greeting pill */}
          <div className="text-center pt-6 pb-2">
            <span className="text-xs uppercase tracking-widest font-mono text-neutral-400">
              Personal Website for {site.recipientName} · From {site.apologizerName}
            </span>
          </div>

          {/* Sequential rendering of enabled blocks */}
          {site.blocks.map((block) => {
            if (!block.enabled) return null;

            return (
              <div key={block.id} className="w-full">
                {block.type === 'hero' && (
                  <HeroBlockView
                    block={block}
                    theme={theme}
                    recipientName={site.recipientName}
                    apologizerName={site.apologizerName}
                    isEditing={false}
                  />
                )}

                {block.type === 'sorry_card' && (
                  <div className="py-6 px-4">
                    <EnvelopeCard
                      config={site.cardConfig}
                      recipientName={site.recipientName}
                      apologizerName={site.apologizerName}
                      interactive={true}
                    />
                  </div>
                )}

                {block.type === 'letter' && (
                  <LetterBlockView
                    block={block}
                    theme={theme}
                    recipientName={site.recipientName}
                    apologizerName={site.apologizerName}
                    isEditing={false}
                  />
                )}

                {block.type === 'accountability' && (
                  <AccountabilityBlockView block={block} theme={theme} isEditing={false} />
                )}

                {block.type === 'memories' && (
                  <MemoriesBlockView block={block} theme={theme} isEditing={false} />
                )}

                {block.type === 'reasons_why' && (
                  <ReasonsWhyBlockView block={block} theme={theme} isEditing={false} />
                )}

                {block.type === 'promise_bond' && (
                  <PromiseBondBlockView
                    block={block}
                    theme={theme}
                    recipientName={site.recipientName}
                    apologizerName={site.apologizerName}
                    isEditing={false}
                    isRecipientView={true}
                    onUpdateBlock={(upd) => {
                      if (onUpdateSite) {
                        const newBlocks = site.blocks.map((b) =>
                          b.id === block.id ? ({ ...b, ...upd } as any) : b
                        );
                        onUpdateSite({ blocks: newBlocks });
                      }
                    }}
                  />
                )}

                {block.type === 'vouchers' && (
                  <VouchersBlockView block={block} theme={theme} isEditing={false} />
                )}

                {block.type === 'forgiveness_meter' && (
                  <ForgivenessMeterBlockView
                    block={block}
                    theme={theme}
                    recipientName={site.recipientName}
                    apologizerName={site.apologizerName}
                    isEditing={false}
                  />
                )}
              </div>
            );
          })}

          {/* Footer note */}
          <footer className="text-center py-12 text-xs text-neutral-400 font-mono border-t border-black/5 dark:border-white/5 mt-16">
            <p>Crafted with unwavering dedication and care for {site.recipientName}.</p>
            <p className="mt-1">Heartfelt Apology & Promise Bond · 2026</p>
          </footer>
        </div>
      )}
    </div>
  );
};
