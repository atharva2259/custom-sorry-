import React, { useState } from 'react';
import { MESSAGE_PRESETS, MessagePreset } from '../../data/templates';
import { ApologySite, LetterBlock, PromiseBondBlock, HeroBlock } from '../../types/builder';
import { X, Check, Sparkles, BookOpen, Wand2, Loader2, ArrowRight } from 'lucide-react';

interface MessageLibraryModalProps {
  isOpen: boolean;
  onClose: () => void;
  site: ApologySite;
  onApplyPreset: (preset: MessagePreset) => void;
  onApplyGenerated: (data: any) => void;
}

export const MessageLibraryModal: React.FC<MessageLibraryModalProps> = ({
  isOpen,
  onClose,
  site,
  onApplyPreset,
  onApplyGenerated,
}) => {
  const [activeTab, setActiveTab] = useState<'presets' | 'ai'>('presets');
  const [selectedPresetId, setSelectedPresetId] = useState<string>(MESSAGE_PRESETS[0].id);

  // AI Generator state
  const [mistakeType, setMistakeType] = useState('Forgot our special date and was distracted');
  const [tone, setTone] = useState('heartfelt, deeply romantic, and humble');
  const [details, setDetails] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedResult, setGeneratedResult] = useState<any | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  if (!isOpen) return null;

  const currentPreset = MESSAGE_PRESETS.find((p) => p.id === selectedPresetId) || MESSAGE_PRESETS[0];

  const handleGenerateAI = async () => {
    setIsGenerating(true);
    setErrorMsg(null);
    try {
      const res = await fetch('/api/gemini/generate-message', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          mistakeType,
          tone,
          recipientName: site.recipientName,
          yourName: site.apologizerName,
          details,
        }),
      });

      if (!res.ok) {
        throw new Error('Failed to generate apology');
      }

      const data = await res.json();
      setGeneratedResult(data);
    } catch (err: any) {
      console.error(err);
      setErrorMsg('Could not connect to generator. Using curated romantic preset instead.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleApplyAI = () => {
    if (generatedResult) {
      onApplyGenerated(generatedResult);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-4xl w-full p-6 sm:p-8 shadow-2xl border border-neutral-200 max-h-[92vh] overflow-y-auto my-auto">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 mb-6 border-b border-neutral-100">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-neutral-900 font-serif">
              Heartfelt Message Templates & AI Assistant
            </h2>
            <p className="text-xs text-neutral-500">
              Personalize your letter, promises, and reconciliation covenants with sincere words.
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

        {/* Tab Switcher */}
        <div className="flex items-center gap-1 bg-neutral-100 p-1 rounded-xl mb-6 max-w-sm">
          <button
            type="button"
            onClick={() => setActiveTab('presets')}
            className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              activeTab === 'presets' ? 'bg-white shadow-xs text-neutral-900' : 'text-neutral-600 hover:text-neutral-900'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5 text-rose-600" />
            Curated Templates
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('ai')}
            className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              activeTab === 'ai' ? 'bg-white shadow-xs text-neutral-900' : 'text-neutral-600 hover:text-neutral-900'
            }`}
          >
            <Wand2 className="w-3.5 h-3.5 text-amber-600" />
            AI Message Crafter
          </button>
        </div>

        {activeTab === 'presets' ? (
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
            {/* Category / Presets Sidebar */}
            <div className="md:col-span-5 space-y-2">
              <span className="text-xs font-mono uppercase tracking-wider text-neutral-400 block mb-2 font-semibold">
                Select Mistake Scenario:
              </span>
              {MESSAGE_PRESETS.map((p) => (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => setSelectedPresetId(p.id)}
                  className={`w-full text-left p-3.5 rounded-xl border transition-all cursor-pointer ${
                    selectedPresetId === p.id
                      ? 'border-neutral-900 bg-neutral-50 ring-2 ring-neutral-900/10'
                      : 'border-neutral-200 hover:border-neutral-300'
                  }`}
                >
                  <span className="text-[10px] font-mono uppercase tracking-wider text-rose-700 block font-semibold">
                    {p.category}
                  </span>
                  <h4 className="text-xs font-bold text-neutral-900 mt-0.5">{p.title}</h4>
                  <p className="text-[11px] text-neutral-500 mt-1 line-clamp-2 leading-relaxed">{p.summary}</p>
                </button>
              ))}
            </div>

            {/* Selected Preset Preview */}
            <div className="md:col-span-7 bg-neutral-50 rounded-2xl p-6 border border-neutral-200">
              <div className="flex items-center justify-between pb-3 mb-4 border-b border-neutral-200">
                <span className="text-xs font-mono uppercase tracking-wider text-neutral-500">
                  Template Content
                </span>
                <button
                  type="button"
                  onClick={() => {
                    onApplyPreset(currentPreset);
                    onClose();
                  }}
                  className="flex items-center gap-1.5 px-4 py-2 bg-neutral-900 text-white rounded-lg text-xs font-semibold hover:bg-neutral-800 transition-colors cursor-pointer"
                >
                  <Check className="w-3.5 h-3.5" />
                  Apply This Template
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <span className="text-[10px] font-mono uppercase text-neutral-400 block">Headline:</span>
                  <h3 className="text-lg font-bold text-neutral-900 font-serif">{currentPreset.headline}</h3>
                  <p className="text-xs text-neutral-600 italic">{currentPreset.subtitle}</p>
                </div>

                <div className="pt-2 border-t border-neutral-200">
                  <span className="text-[10px] font-mono uppercase text-neutral-400 block mb-1">
                    Apology Letter Excerpt:
                  </span>
                  <div className="space-y-2 text-xs text-neutral-800 leading-relaxed max-h-48 overflow-y-auto pr-1">
                    {currentPreset.letter.map((para, i) => (
                      <p key={i}>{para}</p>
                    ))}
                  </div>
                </div>

                <div className="pt-2 border-t border-neutral-200">
                  <span className="text-[10px] font-mono uppercase text-neutral-400 block mb-1">
                    Included Promise Bond Clauses:
                  </span>
                  <ul className="space-y-1 text-xs text-neutral-700">
                    {currentPreset.clauses.map((c, i) => (
                      <li key={i} className="flex items-start gap-1.5 font-medium">
                        <span className="text-rose-600 shrink-0">✓</span>
                        <span>{c}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-2 border-t border-neutral-200">
                  <span className="text-[10px] font-mono uppercase text-neutral-400 block">Sweet Forfeit:</span>
                  <p className="text-xs text-rose-950 font-serif italic">{currentPreset.penalty}</p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* AI Generator Pane */
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
            <div className="md:col-span-5 space-y-4">
              <div>
                <label className="text-xs font-medium text-neutral-700 block mb-1">
                  What happened / What are you apologizing for?
                </label>
                <input
                  type="text"
                  value={mistakeType}
                  onChange={(e) => setMistakeType(e.target.value)}
                  placeholder="e.g. Broke a promise about coming home on time"
                  className="w-full px-3 py-2 text-xs border border-neutral-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-neutral-900"
                />
              </div>

              <div>
                <label className="text-xs font-medium text-neutral-700 block mb-1">Desired Tone:</label>
                <select
                  value={tone}
                  onChange={(e) => setTone(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-neutral-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-neutral-900 bg-white"
                >
                  <option value="heartfelt, deeply romantic, and humble">Heartfelt & Deeply Romantic</option>
                  <option value="quiet, mature, and taking full responsibility">Mature & Direct Accountability</option>
                  <option value="tender, sweet, and earnest">Sweet, Gentle & Earnest</option>
                  <option value="playful, affectionate, and apologetic">Affectionate & Soft Regret</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-medium text-neutral-700 block mb-1">
                  Specific Details / Private Memories (Optional):
                </label>
                <textarea
                  rows={3}
                  value={details}
                  onChange={(e) => setDetails(e.target.value)}
                  placeholder="Add any specific nicknames, what they said, or what you want to promise..."
                  className="w-full p-2.5 text-xs border border-neutral-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-neutral-900"
                />
              </div>

              <button
                type="button"
                onClick={handleGenerateAI}
                disabled={isGenerating}
                className="w-full py-2.5 px-4 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-colors disabled:opacity-50 cursor-pointer"
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    Crafting Sincere Words...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-3.5 h-3.5" />
                    Generate Custom Apology
                  </>
                )}
              </button>

              {errorMsg && <p className="text-xs text-amber-700">{errorMsg}</p>}
            </div>

            {/* AI Generated Result Preview */}
            <div className="md:col-span-7 bg-neutral-50 rounded-2xl p-6 border border-neutral-200">
              {generatedResult ? (
                <div className="space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-neutral-200">
                    <span className="text-xs font-mono uppercase tracking-wider text-rose-700 font-bold">
                      Personalized Apology Draft
                    </span>
                    <button
                      type="button"
                      onClick={handleApplyAI}
                      className="flex items-center gap-1.5 px-4 py-1.5 bg-neutral-900 text-white rounded-lg text-xs font-semibold hover:bg-neutral-800 transition-colors cursor-pointer"
                    >
                      <Check className="w-3.5 h-3.5" />
                      Apply to Website
                    </button>
                  </div>

                  <div>
                    <h3 className="text-lg font-bold font-serif">{generatedResult.headline}</h3>
                    <p className="text-xs text-neutral-600 italic">{generatedResult.subtitle}</p>
                  </div>

                  <div className="text-xs text-neutral-800 leading-relaxed max-h-48 overflow-y-auto pr-1 whitespace-pre-line border-t border-neutral-200 pt-3">
                    {generatedResult.letter}
                  </div>

                  {generatedResult.contractClauses && (
                    <div className="border-t border-neutral-200 pt-3">
                      <span className="text-[10px] font-mono uppercase text-neutral-400 block mb-1">
                        Covenant Clauses:
                      </span>
                      <ul className="text-xs space-y-1 text-neutral-700">
                        {generatedResult.contractClauses.map((c: string, idx: number) => (
                          <li key={idx}>• {c}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ) : (
                <div className="h-64 flex flex-col items-center justify-center text-center p-6 text-neutral-400">
                  <Wand2 className="w-8 h-8 mb-2 opacity-50" />
                  <p className="text-xs">Fill in your situation on the left and tap generate.</p>
                  <p className="text-[11px] opacity-75 mt-1">
                    AI crafts an empathetic, accountable letter tailored to your partner.
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
