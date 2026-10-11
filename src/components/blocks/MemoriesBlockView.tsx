import React from 'react';
import { MemoriesBlock, ThemeDefinition } from '../../types/builder';
import { Plus, Trash2, Camera, Heart } from 'lucide-react';

interface MemoriesBlockViewProps {
  block: MemoriesBlock;
  theme: ThemeDefinition;
  isEditing?: boolean;
  onUpdateBlock?: (updated: Partial<MemoriesBlock>) => void;
}

export const MemoriesBlockView: React.FC<MemoriesBlockViewProps> = ({
  block,
  theme,
  isEditing = false,
  onUpdateBlock,
}) => {
  const handleMemoryChange = (index: number, field: string, value: string) => {
    if (!onUpdateBlock) return;
    const newMems = [...block.memories];
    newMems[index] = { ...newMems[index], [field]: value };
    onUpdateBlock({ memories: newMems });
  };

  const handleAddMemory = () => {
    if (!onUpdateBlock) return;
    onUpdateBlock({
      memories: [
        ...block.memories,
        {
          id: `mem-${Date.now()}`,
          title: 'That Unplanned Roadtrip',
          caption: 'Getting lost and discovering the tiny bakery where we stayed for three hours talking about everything.',
          dateOrPlace: 'Summer Memories',
          gradientBg: 'from-amber-100 to-rose-100',
        },
      ],
    });
  };

  const handleDeleteMemory = (index: number) => {
    if (!onUpdateBlock) return;
    const newMems = block.memories.filter((_, i) => i !== index);
    onUpdateBlock({ memories: newMems });
  };

  return (
    <div className="max-w-5xl mx-auto my-14 px-4 sm:px-6">
      <div className="text-center mb-10">
        {isEditing ? (
          <div className="space-y-2 max-w-md mx-auto">
            <input
              type="text"
              value={block.heading}
              onChange={(e) => onUpdateBlock && onUpdateBlock({ heading: e.target.value })}
              className="w-full text-center text-2xl font-bold bg-transparent border-b border-dashed border-neutral-300 focus:outline-none"
              placeholder="Memories Heading"
            />
            <input
              type="text"
              value={block.subheading}
              onChange={(e) => onUpdateBlock && onUpdateBlock({ subheading: e.target.value })}
              className="w-full text-center text-sm opacity-70 bg-transparent border-b border-dashed border-neutral-300 focus:outline-none"
              placeholder="Memories Subheading"
            />
          </div>
        ) : (
          <>
            <h2 className={`text-2xl sm:text-3xl font-bold tracking-tight mb-2 ${theme.fontDisplay}`}>
              {block.heading || 'The Joy We Built Together'}
            </h2>
            <p className="text-sm opacity-75 max-w-md mx-auto">
              {block.subheading || 'Gentle reminders of what makes our bond worth fighting for.'}
            </p>
          </>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {block.memories.map((mem, idx) => (
          <div
            key={mem.id || idx}
            className={`group rounded-2xl overflow-hidden border transition-all duration-300 hover:shadow-lg ${theme.colors.surfaceCard} ${theme.colors.borderHairline}`}
          >
            {/* Memory Card Top Artwork / Polaroid Styled Frame */}
            <div
              className={`h-48 w-full bg-gradient-to-br ${
                mem.gradientBg || 'from-rose-100 to-amber-100'
              } flex flex-col items-center justify-center p-6 text-center relative border-b border-black/5`}
            >
              <div className="w-12 h-12 rounded-full bg-white/70 shadow-xs flex items-center justify-center text-rose-600 mb-2">
                <Heart className="w-6 h-6 fill-current" />
              </div>
              <span className="text-xs font-mono uppercase tracking-widest text-neutral-600 font-semibold">
                {mem.dateOrPlace || 'Cherished Moment'}
              </span>

              {isEditing && (
                <div className="absolute top-3 right-3 flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => handleDeleteMemory(idx)}
                    className="p-1 rounded bg-white/80 text-rose-600 hover:bg-white shadow-xs"
                    title="Delete Memory"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}
            </div>

            {/* Memory Content */}
            <div className="p-5">
              {isEditing ? (
                <div className="space-y-2">
                  <input
                    type="text"
                    value={mem.title}
                    onChange={(e) => handleMemoryChange(idx, 'title', e.target.value)}
                    className="w-full text-sm font-semibold p-1.5 border border-neutral-200 rounded"
                    placeholder="Memory Title"
                  />
                  <input
                    type="text"
                    value={mem.dateOrPlace || ''}
                    onChange={(e) => handleMemoryChange(idx, 'dateOrPlace', e.target.value)}
                    className="w-full text-xs p-1.5 border border-neutral-200 rounded"
                    placeholder="Date or Place Tag"
                  />
                  <textarea
                    rows={2}
                    value={mem.caption}
                    onChange={(e) => handleMemoryChange(idx, 'caption', e.target.value)}
                    className="w-full text-xs p-1.5 border border-neutral-200 rounded"
                    placeholder="Heartfelt memory caption..."
                  />
                </div>
              ) : (
                <>
                  <h4 className="text-base font-bold mb-1.5">{mem.title}</h4>
                  <p className="text-xs opacity-80 leading-relaxed font-sans">{mem.caption}</p>
                </>
              )}
            </div>
          </div>
        ))}
      </div>

      {isEditing && (
        <div className="text-center mt-6">
          <button
            type="button"
            onClick={handleAddMemory}
            className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-medium rounded-lg bg-black/5 hover:bg-black/10 transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            Add Memory Card
          </button>
        </div>
      )}
    </div>
  );
};
