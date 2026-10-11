import React from 'react';
import { LetterBlock, ThemeDefinition } from '../../types/builder';
import { Plus, Trash2, Heart } from 'lucide-react';

interface LetterBlockViewProps {
  block: LetterBlock;
  theme: ThemeDefinition;
  recipientName: string;
  apologizerName: string;
  isEditing?: boolean;
  onUpdateBlock?: (updated: Partial<LetterBlock>) => void;
}

export const LetterBlockView: React.FC<LetterBlockViewProps> = ({
  block,
  theme,
  recipientName,
  apologizerName,
  isEditing = false,
  onUpdateBlock,
}) => {
  const handleParagraphChange = (index: number, val: string) => {
    if (!onUpdateBlock) return;
    const newParas = [...block.paragraphs];
    newParas[index] = val;
    onUpdateBlock({ paragraphs: newParas });
  };

  const handleAddParagraph = () => {
    if (!onUpdateBlock) return;
    onUpdateBlock({
      paragraphs: [...block.paragraphs, 'I promise to honor your feelings and stand by you through everything.'],
    });
  };

  const handleDeleteParagraph = (index: number) => {
    if (!onUpdateBlock) return;
    const newParas = block.paragraphs.filter((_, i) => i !== index);
    onUpdateBlock({ paragraphs: newParas });
  };

  return (
    <div className="max-w-3xl mx-auto my-8 px-4 sm:px-6">
      <div
        className={`relative rounded-3xl p-8 sm:p-12 shadow-sm border ${theme.colors.surfaceCard} ${theme.colors.borderHairline}`}
        style={{
          boxShadow: '0 10px 25px -5px rgba(0,0,0,0.04), 0 4px 10px -2px rgba(0,0,0,0.02)',
        }}
      >
        {/* Subtle decorative header seal / watermark line */}
        <div className="flex items-center justify-between pb-6 mb-6 border-b border-black/5 dark:border-white/5">
          <span className="text-xs uppercase tracking-widest font-mono opacity-60">Personal Apology Letter</span>
          <span className="text-xs opacity-50 italic">Private & Dedicated</span>
        </div>

        {/* Salutation */}
        {isEditing ? (
          <input
            type="text"
            value={block.salutation}
            onChange={(e) => onUpdateBlock && onUpdateBlock({ salutation: e.target.value })}
            className="w-full text-2xl font-bold font-serif mb-4 bg-transparent border-b border-dashed border-neutral-300 focus:outline-none"
            placeholder="Salutation (e.g. My Dearest...)"
          />
        ) : (
          <h3 className={`text-2xl sm:text-3xl font-bold mb-6 ${theme.fontDisplay}`}>
            {block.salutation || `My Dearest ${recipientName},`}
          </h3>
        )}

        {/* Paragraphs */}
        <div className="space-y-4 text-base sm:text-lg leading-relaxed font-sans opacity-90">
          {block.paragraphs.map((para, idx) => (
            <div key={idx} className="relative group">
              {isEditing ? (
                <div className="flex items-start gap-2">
                  <textarea
                    rows={3}
                    value={para}
                    onChange={(e) => handleParagraphChange(idx, e.target.value)}
                    className="w-full p-2.5 text-base rounded-lg border border-neutral-300 focus:outline-none focus:ring-1 focus:ring-neutral-800 bg-neutral-50/50"
                  />
                  {block.paragraphs.length > 1 && (
                    <button
                      type="button"
                      onClick={() => handleDeleteParagraph(idx)}
                      className="p-1.5 text-rose-500 hover:text-rose-700 hover:bg-rose-50 rounded"
                      title="Delete paragraph"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              ) : (
                <p className="whitespace-pre-line">{para}</p>
              )}
            </div>
          ))}

          {isEditing && (
            <button
              type="button"
              onClick={handleAddParagraph}
              className="flex items-center gap-1.5 text-xs font-medium text-rose-700 hover:text-rose-800 pt-2"
            >
              <Plus className="w-3.5 h-3.5" />
              Add another paragraph
            </button>
          )}
        </div>

        {/* Signoff */}
        <div className="mt-8 pt-6 border-t border-black/5 dark:border-white/5 flex flex-col items-end text-right">
          {isEditing ? (
            <div className="space-y-2 w-64">
              <input
                type="text"
                value={block.closing}
                onChange={(e) => onUpdateBlock && onUpdateBlock({ closing: e.target.value })}
                className="w-full text-right text-sm italic bg-transparent border-b border-dashed border-neutral-300 focus:outline-none"
                placeholder="Closing (e.g. Forever yours,)"
              />
              <input
                type="text"
                value={block.signoffName}
                onChange={(e) => onUpdateBlock && onUpdateBlock({ signoffName: e.target.value })}
                className="w-full text-right text-xl font-bold font-handwriting bg-transparent border-b border-dashed border-neutral-300 focus:outline-none"
                placeholder="Your Name"
              />
            </div>
          ) : (
            <>
              <p className="text-sm italic opacity-75">{block.closing || 'With all my love and remorse,'}</p>
              <p className="text-2xl sm:text-3xl font-handwriting font-bold mt-1 text-rose-950 dark:text-rose-200">
                {block.signoffName || apologizerName || 'Julian'}
              </p>
            </>
          )}
        </div>

        {/* Handwritten Postscript */}
        {block.handwrittenPostscript && (
          <div className="mt-8 pt-4 border-t border-dashed border-neutral-200 dark:border-neutral-800">
            {isEditing ? (
              <input
                type="text"
                value={block.handwrittenPostscript}
                onChange={(e) => onUpdateBlock && onUpdateBlock({ handwrittenPostscript: e.target.value })}
                className="w-full text-base font-handwriting bg-transparent border-b border-dashed border-neutral-300 focus:outline-none"
                placeholder="P.S. Handwritten note..."
              />
            ) : (
              <p className="font-handwriting text-lg sm:text-xl text-rose-900 dark:text-rose-300">
                {block.handwrittenPostscript}
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
