import React from 'react';
import { ReasonsWhyBlock, ThemeDefinition } from '../../types/builder';
import { Plus, Trash2 } from 'lucide-react';

interface ReasonsWhyBlockViewProps {
  block: ReasonsWhyBlock;
  theme: ThemeDefinition;
  isEditing?: boolean;
  onUpdateBlock?: (updated: Partial<ReasonsWhyBlock>) => void;
}

export const ReasonsWhyBlockView: React.FC<ReasonsWhyBlockViewProps> = ({
  block,
  theme,
  isEditing = false,
  onUpdateBlock,
}) => {
  const handleReasonChange = (index: number, field: string, value: string) => {
    if (!onUpdateBlock) return;
    const newReasons = [...block.reasons];
    newReasons[index] = { ...newReasons[index], [field]: value };
    onUpdateBlock({ reasons: newReasons });
  };

  const handleAddReason = () => {
    if (!onUpdateBlock) return;
    const count = block.reasons.length + 1;
    onUpdateBlock({
      reasons: [
        ...block.reasons,
        {
          id: `r-${Date.now()}`,
          number: count < 10 ? `0${count}` : `${count}`,
          title: 'The Grace You Carry',
          detail: 'Your quiet wisdom makes our partnership stronger every single day.',
        },
      ],
    });
  };

  const handleDeleteReason = (index: number) => {
    if (!onUpdateBlock) return;
    const newReasons = block.reasons.filter((_, i) => i !== index);
    onUpdateBlock({ reasons: newReasons });
  };

  return (
    <div className="max-w-4xl mx-auto my-14 px-4 sm:px-6">
      <div className="text-center mb-10">
        {isEditing ? (
          <div className="space-y-2 max-w-md mx-auto">
            <input
              type="text"
              value={block.heading}
              onChange={(e) => onUpdateBlock && onUpdateBlock({ heading: e.target.value })}
              className="w-full text-center text-2xl font-bold bg-transparent border-b border-dashed border-neutral-300 focus:outline-none"
              placeholder="Section Heading"
            />
            <input
              type="text"
              value={block.subheading}
              onChange={(e) => onUpdateBlock && onUpdateBlock({ subheading: e.target.value })}
              className="w-full text-center text-sm opacity-70 bg-transparent border-b border-dashed border-neutral-300 focus:outline-none"
              placeholder="Section Subheading"
            />
          </div>
        ) : (
          <>
            <h2 className={`text-2xl sm:text-3xl font-bold tracking-tight mb-2 ${theme.fontDisplay}`}>
              {block.heading || 'Why You Mean Everything To Me'}
            </h2>
            <p className="text-sm opacity-75 max-w-md mx-auto">
              {block.subheading || 'Three unchanging truths I hold in my heart every single day.'}
            </p>
          </>
        )}
      </div>

      <div className="space-y-4">
        {block.reasons.map((r, idx) => (
          <div
            key={r.id || idx}
            className={`p-6 rounded-2xl border flex flex-col sm:flex-row items-start sm:items-center gap-5 transition-all ${theme.colors.surfaceCard} ${theme.colors.borderHairline}`}
            style={{
              boxShadow: '0 4px 12px -2px rgba(0,0,0,0.02)',
            }}
          >
            {/* Number indicator */}
            <div className="font-mono text-2xl sm:text-3xl font-bold opacity-30 select-none shrink-0 w-12">
              {r.number || `0${idx + 1}`}
            </div>

            <div className="flex-1">
              {isEditing ? (
                <div className="space-y-2">
                  <input
                    type="text"
                    value={r.title}
                    onChange={(e) => handleReasonChange(idx, 'title', e.target.value)}
                    className="w-full text-sm font-bold p-1.5 border border-neutral-200 rounded"
                    placeholder="Reason Title"
                  />
                  <textarea
                    rows={2}
                    value={r.detail}
                    onChange={(e) => handleReasonChange(idx, 'detail', e.target.value)}
                    className="w-full text-xs p-1.5 border border-neutral-200 rounded"
                    placeholder="Why this makes them irreplaceable..."
                  />
                </div>
              ) : (
                <>
                  <h4 className="text-base font-bold mb-1 text-neutral-900 dark:text-neutral-100">{r.title}</h4>
                  <p className="text-xs sm:text-sm opacity-80 leading-relaxed font-sans">{r.detail}</p>
                </>
              )}
            </div>

            {isEditing && block.reasons.length > 1 && (
              <button
                type="button"
                onClick={() => handleDeleteReason(idx)}
                className="text-rose-500 hover:text-rose-700 p-1"
                title="Delete reason"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            )}
          </div>
        ))}
      </div>

      {isEditing && (
        <div className="text-center mt-6">
          <button
            type="button"
            onClick={handleAddReason}
            className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-medium rounded-lg bg-black/5 hover:bg-black/10 transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            Add Another Reason
          </button>
        </div>
      )}
    </div>
  );
};
