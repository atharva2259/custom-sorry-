import React, { useState } from 'react';
import { CardConfig } from '../../types/builder';
import { WaxSeal } from './WaxSeal';
import { Heart, Mail, Check, Sparkles } from 'lucide-react';

interface EnvelopeCardProps {
  config: CardConfig;
  recipientName: string;
  apologizerName: string;
  onUpdateConfig?: (updated: Partial<CardConfig>) => void;
  interactive?: boolean;
}

export const EnvelopeCard: React.FC<EnvelopeCardProps> = ({
  config,
  recipientName,
  apologizerName,
  onUpdateConfig,
  interactive = true,
}) => {
  const [isOpen, setIsOpen] = useState(config.envelopeFlapOpen);

  const toggleOpen = () => {
    if (!interactive) return;
    const nextState = !isOpen;
    setIsOpen(nextState);
    if (onUpdateConfig) {
      onUpdateConfig({ envelopeFlapOpen: nextState });
    }
  };

  const envelopeColors = {
    burgundy: 'bg-[#5c1d24] border-[#7d2933] text-[#fceeed]',
    navy: 'bg-[#15203b] border-[#22335c] text-[#e8f0fe]',
    kraft: 'bg-[#b89772] border-[#cfab84] text-[#3d2f21]',
    sage: 'bg-[#3e5647] border-[#53735f] text-[#ebf3ee]',
    champagne: 'bg-[#dfcfb7] border-[#eee1cf] text-[#423321]',
    blush: 'bg-[#ba6d79] border-[#d48491] text-[#fff0f2]',
  };

  const cardTextures = {
    parchment: 'bg-[#faf6ee] text-[#2c221e] border-[#ded4be]',
    linen: 'bg-[#f7f7f7] text-[#1f2421] border-[#e2e2e2]',
    'pressed-petals': 'bg-[#fff5f6] text-[#331e23] border-[#f3d0d5]',
    minimal: 'bg-white text-neutral-900 border-neutral-200',
  };

  const stamps = {
    airmail: {
      border: 'border-2 border-dashed border-red-700/60 bg-white text-red-800',
      text: 'AIR MAIL',
      sub: 'SPECIAL DELIVERY',
    },
    floral: {
      border: 'border-2 border-stone-400 bg-rose-50 text-rose-900',
      text: 'FORGIVENESS',
      sub: 'EST. WITH LOVE',
    },
    lovebirds: {
      border: 'border-2 border-amber-600/50 bg-amber-50 text-amber-900',
      text: 'DEVOTION',
      sub: 'FOREVER BOND',
    },
    'gold-ribbon': {
      border: 'border-2 border-yellow-600 bg-yellow-50 text-yellow-900',
      text: 'HEARTFELT',
      sub: 'SOLEMN PROMISE',
    },
  };

  const currentEnvelopeClass = envelopeColors[config.envelopeColor] || envelopeColors.burgundy;
  const currentCardClass = cardTextures[config.cardTexture] || cardTextures.parchment;
  const currentStamp = stamps[config.stampStyle] || stamps.airmail;

  return (
    <div className="relative w-full max-w-xl mx-auto my-6 select-none perspective-1000">
      {/* Interactive Helper Banner */}
      {interactive && (
        <div className="flex items-center justify-between pb-3 text-xs text-neutral-500">
          <span className="flex items-center gap-1.5 font-medium">
            <Mail className="w-3.5 h-3.5 text-rose-500" />
            {isOpen ? 'Envelope is open' : 'Click seal to open envelope'}
          </span>
          <button
            type="button"
            onClick={toggleOpen}
            className="text-xs font-semibold text-rose-700 hover:text-rose-800 underline underline-offset-2 transition-colors cursor-pointer"
          >
            {isOpen ? 'Fold Envelope Shut' : 'Break Wax Seal & Open'}
          </button>
        </div>
      )}

      {/* Main Envelope Body */}
      <div
        className={`relative w-full rounded-2xl p-6 sm:p-8 transition-all duration-500 shadow-xl border overflow-hidden ${currentEnvelopeClass}`}
        style={{
          boxShadow: '0 12px 30px -8px rgba(0,0,0,0.22), 0 4px 10px -2px rgba(0,0,0,0.1)',
        }}
      >
        {/* Envelope Airmail border stripes on edges */}
        <div className="absolute top-0 left-0 right-0 h-2 bg-[repeating-linear-gradient(45deg,#b91c1c_0,#b91c1c_14px,#ffffff_14px,#ffffff_28px,#1d4ed8_28px,#1d4ed8_42px,#ffffff_42px,#ffffff_56px)] opacity-60" />

        {/* Vintage Stamp in top right */}
        <div className="absolute top-5 right-5 sm:top-6 sm:right-6 flex flex-col items-center">
          <div
            className={`w-16 h-20 sm:w-18 sm:h-22 p-1.5 flex flex-col justify-between items-center text-center shadow-md rounded-sm ${currentStamp.border}`}
          >
            <span className="text-[9px] font-bold tracking-widest">{currentStamp.text}</span>
            <div className="p-1 rounded-full bg-rose-100/60">
              <Heart className="w-5 h-5 text-rose-700 fill-rose-600" />
            </div>
            <span className="text-[7px] font-mono tracking-tighter opacity-80">{currentStamp.sub}</span>
          </div>
          {/* Circular Postmark Franking stamp overlay */}
          <div className="absolute -left-4 top-5 w-12 h-12 rounded-full border border-black/35 flex items-center justify-center text-[7px] font-mono rotate-[-15deg] pointer-events-none opacity-60 text-black">
            HEARTFELT
          </div>
        </div>

        {/* Recipient Handwritten Address Callout */}
        <div className="pt-8 sm:pt-10 pb-4 max-w-[65%]">
          <p className="text-[11px] uppercase tracking-widest opacity-75 font-mono mb-1">Deliver With Care To:</p>
          <p className="font-display text-2xl sm:text-3xl font-semibold italic leading-tight">
            {recipientName || 'My Beloved'}
          </p>
          <p className="text-xs opacity-80 mt-1 italic">
            From the penitent heart of <span className="font-medium underline decoration-dotted">{apologizerName || 'Julian'}</span>
          </p>
        </div>

        {/* Wax Seal Position (Centered at bottom or flap join) */}
        {!isOpen && (
          <div className="flex flex-col items-center justify-center my-6 py-4">
            <WaxSeal
              color={config.waxSealColor}
              icon={config.waxSealIcon}
              size="xl"
              onClick={interactive ? toggleOpen : undefined}
              showShimmer={true}
            />
            <p className="mt-3 text-xs opacity-80 font-medium tracking-wide flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              Click Wax Seal to Unfold
            </p>
          </div>
        )}

        {/* Fold-Out Inner Card (Revealed when open) */}
        {isOpen && (
          <div
            className={`mt-4 rounded-xl p-5 sm:p-7 border shadow-lg transition-all duration-500 transform animate-in fade-in slide-in-from-bottom-6 ${currentCardClass}`}
          >
            {/* Card Header with mini seal */}
            <div className="flex items-center justify-between border-b pb-3 mb-4 border-current/15">
              <div className="flex items-center gap-2">
                <WaxSeal color={config.waxSealColor} icon={config.waxSealIcon} size="sm" />
                <span className="text-xs uppercase tracking-widest font-mono font-semibold opacity-70">
                  Private Apology Note
                </span>
              </div>
              <span className="text-xs opacity-60 italic font-serif">Handwritten for you</span>
            </div>

            {/* Greeting */}
            <h4 className={`text-xl sm:text-2xl font-bold mb-3 ${config.handwrittenFont}`}>
              {config.cardGreeting || `My Dearest ${recipientName},`}
            </h4>

            {/* Note text */}
            <p className={`text-base sm:text-lg leading-relaxed whitespace-pre-line ${config.handwrittenFont}`}>
              {config.cardNote ||
                `I know I let you down, but my love for you is steadfast. Please open this with an open heart. I promise to listen, to understand, and to do better every day.`}
            </p>

            {/* Signature on card */}
            <div className="mt-6 pt-3 border-t border-current/15 flex items-center justify-between">
              <span className="text-xs opacity-70 font-mono text-[10px]">VERIFIED SINCERE</span>
              <p className={`text-xl font-bold italic ${config.handwrittenFont}`}>
                {apologizerName || 'Forever Yours'}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
