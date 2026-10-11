import React from 'react';
import { AccountabilityBlock, ThemeDefinition } from '../../types/builder';
import { Plus, Trash2 } from 'lucide-react';

interface AccountabilityBlockViewProps {
  block: AccountabilityBlock;
  theme: ThemeDefinition;
  isEditing?: boolean;
  onUpdateBlock?: (updated: Partial<AccountabilityBlock>) => void;
}

export const AccountabilityBlockView: React.FC<AccountabilityBlockViewProps> = ({
  block,
  theme,
  isEditing = false,
  onUpdateBlock,
}) => {
  const handleItemChange = (index: number, field: 'fault' | 'realization', value: string) => {
    if (!onUpdateBlock) return;
    const newItems = [...block.items];
    newItems[index] = { ...newItems[index], [field]: value };
    onUpdateBlock({ items: newItems });
  };

  const handleAddItem = () => {
    if (!onUpdateBlock) return;
    onUpdateBlock({
      items: [
        ...block.items,
        {
          id: `acc-${Date.now()}`,
          fault: 'I took your patience for granted.',
          realization: 'I must actively nurture and appreciate your kindness every single day.',
        },
      ],
    });
  };

  const handleDeleteItem = (index: number) => {
    if (!onUpdateBlock) return;
    const newItems = block.items.filter((_, i) => i !== index);
    onUpdateBlock({ items: newItems });
  };

  return (
    <div className="max-w-4xl mx-auto my-12 px-4 sm:px-6">
      <div className="text-center mb-8">
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
              {block.heading || 'What I Acknowledge & Where I Failed'}
            </h2>
            <p className="text-sm opacity-75 max-w-lg mx-auto">
              {block.subheading || 'Clear self-reflection without deflecting or making excuses.'}
            </p>
          </>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {block.items.map((item, idx) => (
          <div
            key={item.id || idx}
            className={`p-6 rounded-2xl border transition-all ${theme.colors.surfaceCard} ${theme.colors.borderHairline}`}
            style={{
              boxShadow: '0 4px 14px -3px rgba(0,0,0,0.03)',
            }}
          >
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-black/5 dark:border-white/5">
              <span className="text-xs font-mono font-medium opacity-60">Reflection 0{idx + 1}</span>
              {isEditing && block.items.length > 1 && (
                <button
                  type="button"
                  onClick={() => handleDeleteItem(idx)}
                  className="text-rose-500 hover:text-rose-700"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {isEditing ? (
              <div className="space-y-3">
                <div>
                  <label className="text-[10px] uppercase font-mono opacity-60 block">The Misstep:</label>
                  <textarea
                    rows={2}
                    value={item.fault}
                    onChange={(e) => handleItemChange(idx, 'fault', e.target.value)}
                    className="w-full text-xs p-2 rounded border border-neutral-200 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-[10px] uppercase font-mono opacity-60 block">The Lesson / Growth:</label>
                  <textarea
                    rows={2}
                    value={item.realization}
                    onChange={(e) => handleItemChange(idx, 'realization', e.target.value)}
                    className="w-full text-xs p-2 rounded border border-neutral-200 focus:outline-none"
                  />
                </div>
              </div>
            ) : (
              <div>
                <p className="text-sm font-semibold mb-2 leading-snug">{item.fault}</p>
                <div className="mt-3 pt-3 border-t border-black/5 dark:border-white/5">
                  <span className="text-[11px] font-mono uppercase tracking-wider opacity-60 block mb-1">
                    My Realization:
                  </span>
                  <p className="text-xs opacity-80 leading-relaxed italic">{item.realization}</p>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {isEditing && (
        <div className="text-center mt-6">
          <button
            type="button"
            onClick={handleAddItem}
            className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-medium rounded-lg bg-black/5 hover:bg-black/10 transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            Add Reflection Item
          </button>
        </div>
      )}
    </div>
  );
};
