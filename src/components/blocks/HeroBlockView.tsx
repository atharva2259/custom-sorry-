import React from 'react';
import { HeroBlock, ThemeDefinition } from '../../types/builder';
import { Sparkles, Heart } from 'lucide-react';

interface HeroBlockViewProps {
  block: HeroBlock;
  theme: ThemeDefinition;
  recipientName: string;
  apologizerName: string;
  isEditing?: boolean;
  onUpdateBlock?: (updated: Partial<HeroBlock>) => void;
}

export const HeroBlockView: React.FC<HeroBlockViewProps> = ({
  block,
  theme,
  recipientName,
  apologizerName,
  isEditing = false,
  onUpdateBlock,
}) => {
  return (
    <div className="relative py-12 sm:py-20 px-6 max-w-4xl mx-auto text-center">
      {/* Decorative subtle ambient motif */}
      <div className="inline-flex items-center gap-2 text-xs font-medium tracking-widest uppercase opacity-75 mb-4">
        <span>{block.kicker || 'A Sincere Apology & Sworn Promise'}</span>
        <span aria-hidden="true" className="opacity-40">·</span>
        <span>For {recipientName || 'You'}</span>
      </div>

      {/* Main Headline */}
      {isEditing ? (
        <div className="space-y-3 mb-6">
          <input
            type="text"
            value={block.headline}
            onChange={(e) => onUpdateBlock && onUpdateBlock({ headline: e.target.value })}
            className="w-full text-center text-3xl sm:text-5xl font-bold tracking-tight bg-transparent border-b border-dashed border-neutral-400 focus:outline-none py-1"
            placeholder="Apology Headline"
          />
          <input
            type="text"
            value={block.subtitle}
            onChange={(e) => onUpdateBlock && onUpdateBlock({ subtitle: e.target.value })}
            className="w-full text-center text-base sm:text-lg opacity-80 bg-transparent border-b border-dashed border-neutral-400 focus:outline-none py-1"
            placeholder="Gentle subtitle explanation"
          />
        </div>
      ) : (
        <>
          <h1
            className={`text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.15] mb-5 ${theme.fontDisplay}`}
            style={{ textWrap: 'balance' }}
          >
            {block.headline || `To the One Who Holds My Heart`}
          </h1>
          <p className="text-base sm:text-lg max-w-2xl mx-auto opacity-80 leading-relaxed font-sans">
            {block.subtitle || `I made a thoughtless mistake, and I am here with zero excuses to ask for your grace.`}
          </p>
        </>
      )}

      {/* Tender Avatars / Connection Motif */}
      {block.showAvatars && (
        <div className="mt-8 flex items-center justify-center gap-4">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/5 dark:bg-white/5 border border-black/5">
            <span className="w-7 h-7 rounded-full bg-stone-300 dark:bg-stone-700 flex items-center justify-center text-xs font-semibold">
              {apologizerName ? apologizerName[0].toUpperCase() : 'M'}
            </span>
            <span className="text-xs font-medium">{apologizerName || 'Me'}</span>
          </div>

          <div className="flex items-center justify-center w-6 h-6 text-rose-500">
            <Heart className="w-4 h-4 fill-current animate-pulse" />
          </div>

          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/5 dark:bg-white/5 border border-black/5">
            <span className="w-7 h-7 rounded-full bg-rose-200 dark:bg-rose-900 flex items-center justify-center text-xs font-semibold text-rose-800 dark:text-rose-200">
              {recipientName ? recipientName[0].toUpperCase() : 'Y'}
            </span>
            <span className="text-xs font-medium">{recipientName || 'You'}</span>
          </div>
        </div>
      )}
    </div>
  );
};
