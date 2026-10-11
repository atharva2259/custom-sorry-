import React from 'react';
import { CardConfig, EnvelopeColor, StampStyle, WaxSealColor, WaxSealIcon, CardTexture } from '../../types/builder';
import { EnvelopeCard } from '../common/EnvelopeCard';
import { WaxSeal } from '../common/WaxSeal';
import { X, Check, Sparkles } from 'lucide-react';

interface CardStudioModalProps {
  isOpen: boolean;
  onClose: () => void;
  config: CardConfig;
  recipientName: string;
  apologizerName: string;
  onUpdateConfig: (updated: Partial<CardConfig>) => void;
}

export const CardStudioModal: React.FC<CardStudioModalProps> = ({
  isOpen,
  onClose,
  config,
  recipientName,
  apologizerName,
  onUpdateConfig,
}) => {
  if (!isOpen) return null;

  const envelopeColors: { id: EnvelopeColor; name: string; bg: string }[] = [
    { id: 'burgundy', name: 'Royal Burgundy', bg: 'bg-[#5c1d24]' },
    { id: 'navy', name: 'Midnight Navy', bg: 'bg-[#15203b]' },
    { id: 'kraft', name: 'Vintage Kraft', bg: 'bg-[#b89772]' },
    { id: 'sage', name: 'Earthy Sage', bg: 'bg-[#3e5647]' },
    { id: 'champagne', name: 'Warm Champagne', bg: 'bg-[#dfcfb7]' },
    { id: 'blush', name: 'Dusty Blush', bg: 'bg-[#ba6d79]' },
  ];

  const sealColors: { id: WaxSealColor; name: string }[] = [
    { id: 'gold', name: 'Embossed Gold' },
    { id: 'ruby', name: 'Crimson Ruby' },
    { id: 'emerald', name: 'Forest Emerald' },
    { id: 'rose-quartz', name: 'Rose Quartz' },
    { id: 'bronze', name: 'Antique Bronze' },
  ];

  const sealIcons: { id: WaxSealIcon; name: string }[] = [
    { id: 'heart', name: 'Heart' },
    { id: 'rose', name: 'Rose Petal' },
    { id: 'branch', name: 'Olive Branch' },
    { id: 'knot', name: 'Eternal Knot' },
    { id: 'star', name: 'Stardust' },
  ];

  const textures: { id: CardTexture; name: string; desc: string }[] = [
    { id: 'parchment', name: 'Aged Parchment', desc: 'Warm vintage textured paper' },
    { id: 'linen', name: 'Woven Linen', desc: 'Clean, tactile fabric feel' },
    { id: 'pressed-petals', name: 'Pressed Petals', desc: 'Blush floral romantic paper' },
    { id: 'minimal', name: 'Pure White Minimal', desc: 'Crisp contemporary paper' },
  ];

  const stamps: { id: StampStyle; name: string }[] = [
    { id: 'airmail', name: 'Vintage Air Mail' },
    { id: 'floral', name: 'Botanical Rose' },
    { id: 'lovebirds', name: 'Devoted Lovebirds' },
    { id: 'gold-ribbon', name: 'Gold Ribbon' },
  ];

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-4xl w-full p-6 sm:p-8 shadow-2xl border border-neutral-200 max-h-[92vh] overflow-y-auto my-auto">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 mb-6 border-b border-neutral-100">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-neutral-900 font-serif">
              Apology Card & Wax Seal Studio
            </h2>
            <p className="text-xs text-neutral-500">
              Customize the personalized envelope, ceremonial wax seal, and interior love card.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-full hover:bg-neutral-100 text-neutral-500 hover:text-neutral-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Controls Column */}
          <div className="lg:col-span-6 space-y-6">
            {/* Envelope Color */}
            <div>
              <label className="text-xs font-mono uppercase tracking-wider text-neutral-500 block mb-2 font-semibold">
                1. Envelope Color
              </label>
              <div className="grid grid-cols-3 gap-2">
                {envelopeColors.map((color) => (
                  <button
                    key={color.id}
                    type="button"
                    onClick={() => onUpdateConfig({ envelopeColor: color.id })}
                    className={`flex items-center gap-2 p-2 rounded-xl border text-xs font-medium transition-all cursor-pointer ${
                      config.envelopeColor === color.id
                        ? 'border-neutral-900 ring-2 ring-neutral-900/10 bg-neutral-50 font-bold'
                        : 'border-neutral-200 hover:border-neutral-300'
                    }`}
                  >
                    <span className={`w-4 h-4 rounded-full ${color.bg} border border-black/10 shrink-0`} />
                    <span className="truncate">{color.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Wax Seal Color & Motif */}
            <div>
              <label className="text-xs font-mono uppercase tracking-wider text-neutral-500 block mb-2 font-semibold">
                2. Wax Seal Color & Motif
              </label>
              <div className="grid grid-cols-5 gap-2 mb-3">
                {sealColors.map((sc) => (
                  <button
                    key={sc.id}
                    type="button"
                    onClick={() => onUpdateConfig({ waxSealColor: sc.id })}
                    className={`flex flex-col items-center p-2 rounded-xl border text-center transition-all cursor-pointer ${
                      config.waxSealColor === sc.id
                        ? 'border-neutral-900 bg-neutral-50 ring-2 ring-neutral-900/10'
                        : 'border-neutral-200 hover:border-neutral-300'
                    }`}
                  >
                    <WaxSeal color={sc.id} icon={config.waxSealIcon} size="sm" />
                    <span className="text-[10px] mt-1.5 font-medium truncate w-full">{sc.name.split(' ')[1] || sc.name}</span>
                  </button>
                ))}
              </div>

              {/* Seal Stamp Motif */}
              <div className="flex items-center gap-1.5 bg-neutral-100 p-1 rounded-xl">
                {sealIcons.map((ic) => (
                  <button
                    key={ic.id}
                    type="button"
                    onClick={() => onUpdateConfig({ waxSealIcon: ic.id })}
                    className={`flex-1 py-1.5 px-2 rounded-lg text-xs font-medium transition-colors text-center cursor-pointer ${
                      config.waxSealIcon === ic.id ? 'bg-white shadow-xs text-neutral-900' : 'text-neutral-600 hover:text-neutral-900'
                    }`}
                  >
                    {ic.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Card Interior Texture */}
            <div>
              <label className="text-xs font-mono uppercase tracking-wider text-neutral-500 block mb-2 font-semibold">
                3. Card Paper Texture
              </label>
              <div className="grid grid-cols-2 gap-2">
                {textures.map((tx) => (
                  <button
                    key={tx.id}
                    type="button"
                    onClick={() => onUpdateConfig({ cardTexture: tx.id })}
                    className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                      config.cardTexture === tx.id
                        ? 'border-neutral-900 bg-neutral-50 ring-2 ring-neutral-900/10'
                        : 'border-neutral-200 hover:border-neutral-300'
                    }`}
                  >
                    <span className="text-xs font-bold block text-neutral-900">{tx.name}</span>
                    <span className="text-[10px] text-neutral-500 block mt-0.5">{tx.desc}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Stamp Style */}
            <div>
              <label className="text-xs font-mono uppercase tracking-wider text-neutral-500 block mb-2 font-semibold">
                4. Postage Stamp Style
              </label>
              <div className="grid grid-cols-2 gap-2">
                {stamps.map((st) => (
                  <button
                    key={st.id}
                    type="button"
                    onClick={() => onUpdateConfig({ stampStyle: st.id })}
                    className={`p-2 rounded-xl border text-xs font-medium transition-colors cursor-pointer ${
                      config.stampStyle === st.id ? 'border-neutral-900 bg-neutral-50 font-bold' : 'border-neutral-200 hover:border-neutral-300'
                    }`}
                  >
                    {st.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Card Note Content */}
            <div>
              <label className="text-xs font-mono uppercase tracking-wider text-neutral-500 block mb-1 font-semibold">
                5. Handwritten Note Inside
              </label>
              <input
                type="text"
                value={config.cardGreeting}
                onChange={(e) => onUpdateConfig({ cardGreeting: e.target.value })}
                className="w-full px-3 py-2 text-xs border border-neutral-200 rounded-lg mb-2 focus:outline-none focus:ring-1 focus:ring-neutral-800"
                placeholder="Card Greeting"
              />
              <textarea
                rows={3}
                value={config.cardNote}
                onChange={(e) => onUpdateConfig({ cardNote: e.target.value })}
                className="w-full p-3 text-xs border border-neutral-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-neutral-800"
                placeholder="Handwritten heartfelt message on the card..."
              />
            </div>
          </div>

          {/* Live Preview Column */}
          <div className="lg:col-span-6 sticky top-0">
            <div className="p-4 rounded-2xl bg-neutral-100 border border-neutral-200">
              <span className="text-[11px] font-mono uppercase tracking-wider text-neutral-500 block mb-2 font-semibold">
                Interactive Preview (Click seal or toggle to test)
              </span>

              <EnvelopeCard
                config={config}
                recipientName={recipientName}
                apologizerName={apologizerName}
                onUpdateConfig={onUpdateConfig}
                interactive={true}
              />
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 pt-4 border-t border-neutral-100 flex items-center justify-end">
          <button
            type="button"
            onClick={onClose}
            className="flex items-center gap-1.5 px-6 py-2.5 bg-neutral-900 text-white rounded-xl text-xs font-semibold hover:bg-neutral-800 transition-colors cursor-pointer"
          >
            <Check className="w-4 h-4" />
            Done Customizing Card
          </button>
        </div>
      </div>
    </div>
  );
};
