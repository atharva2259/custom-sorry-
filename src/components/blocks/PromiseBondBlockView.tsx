import React, { useState } from 'react';
import { PromiseBondBlock, ThemeDefinition } from '../../types/builder';
import { WaxSeal } from '../common/WaxSeal';
import { DigitalSignaturePad } from '../builder/DigitalSignaturePad';
import { ShieldCheck, FileCheck2, PenTool, Printer, Sparkles, CheckCircle2, Lock } from 'lucide-react';
import confetti from 'canvas-confetti';

interface PromiseBondBlockViewProps {
  block: PromiseBondBlock;
  theme: ThemeDefinition;
  recipientName: string;
  apologizerName: string;
  isEditing?: boolean;
  isRecipientView?: boolean;
  onUpdateBlock?: (updated: Partial<PromiseBondBlock>) => void;
}

export const PromiseBondBlockView: React.FC<PromiseBondBlockViewProps> = ({
  block,
  theme,
  recipientName,
  apologizerName,
  isEditing = false,
  isRecipientView = false,
  onUpdateBlock,
}) => {
  const [showSignModal, setShowSignModal] = useState<'apologizer' | 'recipient' | null>(null);

  const handleClauseChange = (index: number, val: string) => {
    if (!onUpdateBlock) return;
    const newClauses = [...block.clauses];
    newClauses[index] = val;
    onUpdateBlock({ clauses: newClauses });
  };

  const handleAddClause = () => {
    if (!onUpdateBlock) return;
    onUpdateBlock({
      clauses: [
        ...block.clauses,
        `Article ${block.clauses.length + 1}: I will never dismiss or minimize your feelings when you share your heart with me.`,
      ],
    });
  };

  const handleSaveSignature = (sigData: string) => {
    if (!onUpdateBlock) return;
    const now = new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });

    if (showSignModal === 'apologizer') {
      onUpdateBlock({
        apologizerSignature: sigData,
        apologizerSignedDate: now,
      });
    } else if (showSignModal === 'recipient') {
      onUpdateBlock({
        recipientSignature: sigData,
        recipientSignedDate: now,
      });
      // Fire celebration confetti when recipient signs the bond!
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#f59e0b', '#ec4899', '#8b5cf6', '#10b981'],
        });
      } catch (e) {
        // Safe fallback
      }
    }
    setShowSignModal(null);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-4xl mx-auto my-16 px-4 sm:px-6 select-text" id="promise-bond-certificate">
      {/* Outer Certificate Frame with Ornate Gold & Parchment Detailing */}
      <div
        className="relative rounded-3xl p-6 sm:p-12 border-4 border-double border-amber-600/40 bg-[#fffdfa] text-[#1c1917] shadow-2xl overflow-hidden"
        style={{
          boxShadow: '0 20px 40px -15px rgba(180,83,9,0.15), 0 0 0 1px rgba(180,83,9,0.1)',
        }}
      >
        {/* Ornate Corner Accents */}
        <div className="absolute top-3 left-3 w-8 h-8 border-t-2 border-l-2 border-amber-600/60 pointer-events-none" />
        <div className="absolute top-3 right-3 w-8 h-8 border-t-2 border-r-2 border-amber-600/60 pointer-events-none" />
        <div className="absolute bottom-3 left-3 w-8 h-8 border-b-2 border-l-2 border-amber-600/60 pointer-events-none" />
        <div className="absolute bottom-3 right-3 w-8 h-8 border-b-2 border-r-2 border-amber-600/60 pointer-events-none" />

        {/* Header Ribbon & Serial ID */}
        <div className="flex flex-col sm:flex-row items-center justify-between pb-6 mb-8 border-b-2 border-stone-200">
          <div className="flex items-center gap-3 mb-3 sm:mb-0">
            <ShieldCheck className="w-6 h-6 text-amber-700" />
            <div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-amber-800 font-bold block">
                Official Reconciliation Covenant
              </span>
              <span className="text-xs text-stone-500 font-mono">
                Serial No: {block.sealNumber || 'BOND-2026-RECON-7709'}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs px-2.5 py-1 rounded bg-amber-100/70 text-amber-900 font-mono text-[11px] font-semibold flex items-center gap-1.5">
              <Lock className="w-3 h-3 text-amber-700" />
              Legally & Emotionally Binding
            </span>
            <button
              type="button"
              onClick={handlePrint}
              className="p-1.5 rounded hover:bg-stone-100 text-stone-600 transition-colors print:hidden"
              title="Print Certificate"
            >
              <Printer className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Title */}
        <div className="text-center mb-8">
          <h2 className="text-2xl sm:text-4xl font-serif font-bold text-stone-900 tracking-tight">
            {block.contractTitle || 'Solemn Covenant & Reconciliation Bond'}
          </h2>
          <p className="text-xs sm:text-sm font-serif italic text-stone-600 mt-2 max-w-2xl mx-auto">
            {block.preamble ||
              `This covenant is entered into freely and earnestly by Party of the First Part (${apologizerName}) toward Party of the Second Part (${recipientName}), guaranteeing non-repetition of grievances and dedicating to lifelong mutual care.`}
          </p>
        </div>

        {/* Section I: Non-Negotiable Vows of Never Again */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-3">
            <FileCheck2 className="w-4 h-4 text-amber-700" />
            <h4 className="text-xs font-mono uppercase tracking-widest font-bold text-stone-800">
              Section I — The Vows of Non-Repetition
            </h4>
          </div>

          <div className="space-y-3">
            {block.clauses.map((clause, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-xl bg-stone-50 border border-stone-200/80 flex items-start gap-3"
              >
                <div className="mt-0.5 text-amber-700">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                </div>
                {isEditing ? (
                  <textarea
                    rows={2}
                    value={clause}
                    onChange={(e) => handleClauseChange(idx, e.target.value)}
                    className="w-full text-xs sm:text-sm bg-white p-2 rounded border border-stone-300 font-sans focus:outline-none"
                  />
                ) : (
                  <p className="text-xs sm:text-sm font-sans text-stone-800 leading-relaxed font-medium">
                    {clause}
                  </p>
                )}
              </div>
            ))}
          </div>

          {isEditing && (
            <button
              type="button"
              onClick={handleAddClause}
              className="mt-3 text-xs font-medium text-amber-800 hover:text-amber-900 underline"
            >
              + Add another covenant article
            </button>
          )}
        </div>

        {/* Section II: Corrective Action Plan */}
        <div className="mb-8">
          <h4 className="text-xs font-mono uppercase tracking-widest font-bold text-stone-800 mb-3">
            Section II — Actionable Commitments & Accountability
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {block.correctiveActions.map((action, idx) => (
              <div
                key={idx}
                className="p-3 rounded-lg bg-amber-50/50 border border-amber-200/60 text-xs text-stone-700 leading-relaxed"
              >
                <span className="font-mono font-bold text-amber-900 block mb-1">Commitment 0{idx + 1}:</span>
                {action}
              </div>
            ))}
          </div>
        </div>

        {/* Section III: The Sweet Forfeit Penalty */}
        <div className="mb-10 p-4 rounded-xl bg-rose-50/60 border border-rose-200 text-stone-800">
          <div className="flex items-center gap-2 mb-1 text-rose-900">
            <Sparkles className="w-4 h-4" />
            <h4 className="text-xs font-mono uppercase tracking-widest font-bold">
              Section III — The Forfeiture Penalty Clause
            </h4>
          </div>
          {isEditing ? (
            <textarea
              rows={2}
              value={block.sweetPenalty}
              onChange={(e) => onUpdateBlock && onUpdateBlock({ sweetPenalty: e.target.value })}
              className="w-full text-xs p-2 rounded border border-rose-300 bg-white font-sans focus:outline-none"
              placeholder="Penalty if the mistake repeats..."
            />
          ) : (
            <p className="text-xs sm:text-sm italic font-serif leading-relaxed text-rose-950">
              "{block.sweetPenalty ||
                'Should Party of the First Part breach any of the above covenants, they shall be subject to the immediate forfeit of 14 days of cooking your favorite dinners, complete back massages on demand, and 100% control over weekend movie picks.'}"
            </p>
          )}
        </div>

        {/* Verification Wax Seal Centered Accent */}
        <div className="flex justify-center my-6">
          <WaxSeal color="gold" icon="knot" size="lg" />
        </div>

        {/* Signatures & Execution Row */}
        <div className="pt-6 border-t-2 border-stone-200 grid grid-cols-1 sm:grid-cols-2 gap-8 items-end">
          {/* Party of First Part (Apologizer) Signature */}
          <div className="border border-stone-200 p-4 rounded-xl bg-stone-50/70">
            <span className="text-[10px] font-mono uppercase tracking-wider text-stone-500 block mb-2">
              Party of the First Part (Apologizer)
            </span>

            {block.apologizerSignature?.startsWith('data:image') ? (
              <img
                src={block.apologizerSignature}
                alt="Apologizer Signature"
                className="h-14 object-contain mb-1"
              />
            ) : (
              <p className="font-handwriting text-3xl font-bold text-stone-900 h-12 flex items-center">
                {block.apologizerSignature || apologizerName || 'Julian Vance'}
              </p>
            )}

            <div className="pt-2 border-t border-stone-200 text-[11px] text-stone-500 font-mono flex justify-between items-center">
              <span>Date: {block.apologizerSignedDate || 'October 11, 2026'}</span>
              <button
                type="button"
                onClick={() => setShowSignModal('apologizer')}
                className="text-amber-800 hover:text-amber-950 underline font-sans text-xs print:hidden"
              >
                Update Ink
              </button>
            </div>
          </div>

          {/* Party of Second Part (Recipient) Signature */}
          <div className="border border-dashed border-stone-300 p-4 rounded-xl bg-stone-50/70 relative">
            <span className="text-[10px] font-mono uppercase tracking-wider text-stone-500 block mb-2">
              Party of the Second Part (Recipient)
            </span>

            {block.recipientSignature ? (
              <div>
                {block.recipientSignature.startsWith('data:image') ? (
                  <img
                    src={block.recipientSignature}
                    alt="Recipient Signature"
                    className="h-14 object-contain mb-1"
                  />
                ) : (
                  <p className="font-handwriting text-3xl font-bold text-emerald-800 h-12 flex items-center">
                    {block.recipientSignature}
                  </p>
                )}
                <div className="pt-2 border-t border-stone-200 text-[11px] text-emerald-700 font-mono flex justify-between items-center">
                  <span>Accepted: {block.recipientSignedDate || 'Signed'}</span>
                  <span className="text-[10px] bg-emerald-100 text-emerald-800 px-1.5 py-0.5 rounded font-semibold">
                    COVENANT SEALED
                  </span>
                </div>
              </div>
            ) : (
              <div className="h-18 flex flex-col justify-center items-center text-center">
                <button
                  type="button"
                  onClick={() => setShowSignModal('recipient')}
                  className="px-4 py-2 bg-amber-800 hover:bg-amber-900 text-white rounded-lg text-xs font-semibold flex items-center gap-2 shadow-xs transition-colors cursor-pointer"
                >
                  <PenTool className="w-3.5 h-3.5" />
                  {isRecipientView ? 'Sign Here to Accept Bond' : 'Sign as Recipient (Test)'}
                </button>
                <span className="text-[10px] text-stone-400 mt-1">Awaiting recipient acceptance</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Signature Modal */}
      {showSignModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <DigitalSignaturePad
            label={
              showSignModal === 'apologizer'
                ? `Sign as Apologizer (${apologizerName || 'Me'})`
                : `Sign as Recipient (${recipientName || 'You'})`
            }
            signeeName={showSignModal === 'apologizer' ? apologizerName : recipientName}
            onSaveSignature={handleSaveSignature}
            onClose={() => setShowSignModal(null)}
          />
        </div>
      )}
    </div>
  );
};
