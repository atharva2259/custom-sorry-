import React, { useState } from 'react';
import { ForgivenessMeterBlock, ThemeDefinition } from '../../types/builder';
import { Heart, Send, CheckCircle2 } from 'lucide-react';
import confetti from 'canvas-confetti';

interface ForgivenessMeterBlockViewProps {
  block: ForgivenessMeterBlock;
  theme: ThemeDefinition;
  recipientName: string;
  apologizerName: string;
  isEditing?: boolean;
  onUpdateBlock?: (updated: Partial<ForgivenessMeterBlock>) => void;
}

export const ForgivenessMeterBlockView: React.FC<ForgivenessMeterBlockViewProps> = ({
  block,
  theme,
  recipientName,
  apologizerName,
  isEditing = false,
  onUpdateBlock,
}) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [customFeedback, setCustomFeedback] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSelect = (optId: string, emoji: string) => {
    setSelectedOption(optId);

    if (optId === 'opt-yes' || emoji === '❤️') {
      try {
        confetti({
          particleCount: 100,
          spread: 80,
          origin: { y: 0.6 },
          colors: ['#e11d48', '#fb7185', '#f43f5e', '#fda4af', '#facc15'],
        });
      } catch (e) {
        // Safe fallback
      }
    }
  };

  const handleSendResponse = () => {
    setIsSubmitted(true);
  };

  const activeOptionObj = block.options.find((o) => o.id === selectedOption);

  return (
    <div className="max-w-3xl mx-auto my-16 px-4 sm:px-6 text-center select-text">
      <div
        className={`rounded-3xl p-8 sm:p-12 border ${theme.colors.surfaceCard} ${theme.colors.borderHairline} shadow-xl`}
        style={{
          boxShadow: '0 12px 32px -8px rgba(0,0,0,0.06)',
        }}
      >
        <div className="w-12 h-12 mx-auto rounded-full bg-rose-100 flex items-center justify-center text-rose-600 mb-4">
          <Heart className="w-6 h-6 fill-current animate-pulse" />
        </div>

        {isEditing ? (
          <div className="space-y-2 max-w-md mx-auto mb-6">
            <input
              type="text"
              value={block.heading}
              onChange={(e) => onUpdateBlock && onUpdateBlock({ heading: e.target.value })}
              className="w-full text-center text-2xl font-bold bg-transparent border-b border-dashed border-neutral-300 focus:outline-none"
              placeholder="Question Heading"
            />
            <input
              type="text"
              value={block.promptText}
              onChange={(e) => onUpdateBlock && onUpdateBlock({ promptText: e.target.value })}
              className="w-full text-center text-sm opacity-70 bg-transparent border-b border-dashed border-neutral-300 focus:outline-none"
              placeholder="Prompt description"
            />
          </div>
        ) : (
          <>
            <h2 className={`text-2xl sm:text-4xl font-bold tracking-tight mb-2 ${theme.fontDisplay}`}>
              {block.heading || 'Will You Forgive Me?'}
            </h2>
            <p className="text-sm opacity-75 max-w-md mx-auto mb-8 font-sans">
              {block.promptText || 'Take all the time you need. Your feelings and peace of mind come first.'}
            </p>
          </>
        )}

        {/* Options Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
          {block.options.map((opt) => {
            const isSelected = selectedOption === opt.id;

            return (
              <button
                key={opt.id}
                type="button"
                onClick={() => handleSelect(opt.id, opt.emoji)}
                className={`p-4 rounded-xl border text-left transition-all duration-200 flex items-center gap-3.5 cursor-pointer ${
                  isSelected
                    ? 'border-rose-500 bg-rose-50/70 ring-2 ring-rose-400/50'
                    : 'border-neutral-200 hover:border-neutral-400 bg-white hover:bg-neutral-50'
                }`}
              >
                <span className="text-2xl">{opt.emoji}</span>
                <div className="flex-1">
                  <span className="text-sm font-semibold text-neutral-900 block">{opt.label}</span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Selected Option Feedback Message */}
        {activeOptionObj && !isSubmitted && (
          <div className="p-5 rounded-2xl bg-neutral-50 border border-neutral-200 text-left animate-in fade-in duration-300">
            <p className="text-xs font-mono uppercase tracking-wider text-neutral-500 mb-1">
              Response from {apologizerName || 'Julian'}:
            </p>
            <p className="text-sm font-serif italic text-neutral-800 mb-4">
              "{activeOptionObj.responseMsg}"
            </p>

            <div className="pt-3 border-t border-neutral-200">
              <label className="text-xs font-medium text-neutral-700 block mb-1">
                Leave a personal note back to {apologizerName || 'them'} (Optional):
              </label>
              <textarea
                rows={2}
                value={customFeedback}
                onChange={(e) => setCustomFeedback(e.target.value)}
                placeholder="Write what is on your mind..."
                className="w-full p-2.5 text-xs rounded-lg border border-neutral-300 focus:outline-none focus:ring-1 focus:ring-neutral-900 bg-white mb-3"
              />
              <button
                type="button"
                onClick={handleSendResponse}
                className="w-full py-2.5 px-4 bg-neutral-900 text-white rounded-lg text-xs font-semibold flex items-center justify-center gap-2 hover:bg-neutral-800 transition-colors cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
                Submit Answer to {apologizerName || 'Partner'}
              </button>
            </div>
          </div>
        )}

        {isSubmitted && (
          <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-200 text-center animate-in zoom-in-95 duration-300">
            <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto mb-2" />
            <h4 className="font-bold text-emerald-900 text-base mb-1">Response Recorded</h4>
            <p className="text-xs text-emerald-800 max-w-sm mx-auto">
              Your answer was captured for {apologizerName || 'your partner'}. Thank you for sharing your true feelings with honesty and grace.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
