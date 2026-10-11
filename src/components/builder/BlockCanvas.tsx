import React, { useState } from 'react';
import { ApologySite, BlockType, SiteBlock, ThemeDefinition } from '../../types/builder';
import { HeroBlockView } from '../blocks/HeroBlockView';
import { EnvelopeCard } from '../common/EnvelopeCard';
import { LetterBlockView } from '../blocks/LetterBlockView';
import { AccountabilityBlockView } from '../blocks/AccountabilityBlockView';
import { MemoriesBlockView } from '../blocks/MemoriesBlockView';
import { ReasonsWhyBlockView } from '../blocks/ReasonsWhyBlockView';
import { PromiseBondBlockView } from '../blocks/PromiseBondBlockView';
import { VouchersBlockView } from '../blocks/VouchersBlockView';
import { ForgivenessMeterBlockView } from '../blocks/ForgivenessMeterBlockView';
import {
  GripVertical,
  ChevronUp,
  ChevronDown,
  Trash2,
  Copy,
  Plus,
  Eye,
  Edit3,
  Monitor,
  Tablet,
  Smartphone,
  Sparkles,
} from 'lucide-react';

interface BlockCanvasProps {
  site: ApologySite;
  theme: ThemeDefinition;
  onUpdateSite: (updated: Partial<ApologySite>) => void;
  onOpenCardStudio: () => void;
}

export const BlockCanvas: React.FC<BlockCanvasProps> = ({
  site,
  theme,
  onUpdateSite,
  onOpenCardStudio,
}) => {
  const [viewport, setViewport] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [editingBlockId, setEditingBlockId] = useState<string | null>(null);
  const [draggedIdx, setDraggedIdx] = useState<number | null>(null);
  const [dragOverIdx, setDragOverIdx] = useState<number | null>(null);

  // Move block up
  const moveBlock = (fromIndex: number, toIndex: number) => {
    if (toIndex < 0 || toIndex >= site.blocks.length) return;
    const newBlocks = [...site.blocks];
    const [moved] = newBlocks.splice(fromIndex, 1);
    newBlocks.splice(toIndex, 0, moved);
    onUpdateSite({ blocks: newBlocks });
  };

  // Duplicate block
  const duplicateBlock = (index: number) => {
    const target = site.blocks[index];
    const cloned = JSON.parse(JSON.stringify(target)) as SiteBlock;
    cloned.id = `blk-${Date.now()}`;
    const newBlocks = [...site.blocks];
    newBlocks.splice(index + 1, 0, cloned);
    onUpdateSite({ blocks: newBlocks });
  };

  // Delete block
  const deleteBlock = (index: number) => {
    if (site.blocks.length <= 1) return;
    const newBlocks = site.blocks.filter((_, i) => i !== index);
    onUpdateSite({ blocks: newBlocks });
  };

  // Update specific block
  const handleUpdateBlock = (blockId: string, updatedFields: Partial<SiteBlock>) => {
    const newBlocks = site.blocks.map((b) => (b.id === blockId ? ({ ...b, ...updatedFields } as SiteBlock) : b));
    onUpdateSite({ blocks: newBlocks });
  };

  // Add block
  const addBlock = (type: BlockType) => {
    let newBlock: SiteBlock;
    const id = `blk-${Date.now()}`;

    switch (type) {
      case 'hero':
        newBlock = {
          id,
          type: 'hero',
          enabled: true,
          headline: `For My Beloved ${site.recipientName}`,
          subtitle: 'A humble reflection from my heart to yours.',
          kicker: 'Apology & Reconciliation',
          showAvatars: true,
          romanticStyle: 'candle',
        };
        break;
      case 'sorry_card':
        newBlock = {
          id,
          type: 'sorry_card',
          enabled: true,
          title: 'Wax-Sealed Apology Note',
          subtitle: 'Click the seal to unfold the handwritten card.',
        };
        break;
      case 'letter':
        newBlock = {
          id,
          type: 'letter',
          enabled: true,
          salutation: `My Dearest ${site.recipientName},`,
          paragraphs: [
            'I am writing this because I truly love you and want to apologize from the bottom of my heart.',
            'What happened was entirely my fault, and seeing you disappointed hurt me deeply. I promise to be better.',
          ],
          closing: 'Always yours,',
          signoffName: site.apologizerName || 'Me',
          handwrittenPostscript: 'P.S. I cherish you more than words can say.',
        };
        break;
      case 'accountability':
        newBlock = {
          id,
          type: 'accountability',
          enabled: true,
          heading: 'Where I Slipped Up & What I Learned',
          subheading: 'Clear self-reflection with zero excuses.',
          items: [
            {
              id: `acc-${Date.now()}`,
              fault: 'I let myself get distracted when you needed me.',
              realization: 'Your emotional safety is always my primary responsibility.',
            },
          ],
        };
        break;
      case 'memories':
        newBlock = {
          id,
          type: 'memories',
          enabled: true,
          heading: 'Moments I Hold Dear',
          subheading: 'Reminders of our shared laughter and joy.',
          memories: [
            {
              id: `mem-${Date.now()}`,
              title: 'Our Cozy Coffee Walk',
              caption: 'Holding hands in the cold autumn air, laughing at nothing and everything.',
              dateOrPlace: 'Favorite Memories',
              gradientBg: 'from-amber-100 to-rose-100',
            },
          ],
        };
        break;
      case 'reasons_why':
        newBlock = {
          id,
          type: 'reasons_why',
          enabled: true,
          heading: 'Why You Are Irreplaceable',
          subheading: 'Truths I remember every day.',
          reasons: [
            {
              id: `r-${Date.now()}`,
              number: '01',
              title: 'Your Boundless Generosity',
              detail: 'You give with an open heart even when the world is tired.',
            },
          ],
        };
        break;
      case 'promise_bond':
        newBlock = {
          id,
          type: 'promise_bond',
          enabled: true,
          contractTitle: 'Solemn Covenant & Reconciliation Bond',
          preamble: `This pledge is entered into by ${site.apologizerName} to ${site.recipientName} to guarantee non-repetition of past mistakes.`,
          clauses: [
            'Article I: I will always listen with compassion before responding.',
            'Article II: I will prioritize our relationship and never take your presence for granted.',
          ],
          correctiveActions: [
            'Weekly dedicated check-ins with zero digital distractions.',
            'Honest communication whenever feelings arise.',
          ],
          sweetPenalty: 'Two weeks of making your morning beverage of choice and 100% weekend itinerary veto rights.',
          apologizerSignature: site.apologizerName,
          apologizerSignedDate: 'October 11, 2026',
          sealNumber: `BOND-${Math.floor(1000 + Math.random() * 9000)}`,
        };
        break;
      case 'vouchers':
        newBlock = {
          id,
          type: 'vouchers',
          enabled: true,
          heading: 'Reconciliation Vouchers',
          subheading: 'Redeemable anytime at your discretion.',
          vouchers: [
            {
              id: `v-${Date.now()}`,
              title: '1 Hour Soothing Back Massage',
              description: 'Calming evening massage with zero rush.',
              terms: 'Never expires.',
            },
          ],
        };
        break;
      case 'forgiveness_meter':
      default:
        newBlock = {
          id,
          type: 'forgiveness_meter',
          enabled: true,
          heading: 'Will You Forgive Me?',
          promptText: 'Take all the time you need.',
          options: [
            {
              id: 'opt-yes',
              emoji: '❤️',
              label: 'Yes, I forgive you',
              responseMsg: 'Thank you. I will spend every day honoring your trust.',
            },
            {
              id: 'opt-hug',
              emoji: '🫂',
              label: 'I need a warm hug first',
              responseMsg: 'Waiting right here with open arms.',
            },
          ],
        };
        break;
    }

    onUpdateSite({ blocks: [...site.blocks, newBlock] });
  };

  // Drag handlers
  const handleDragStart = (index: number) => {
    setDraggedIdx(index);
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    setDragOverIdx(index);
  };

  const handleDrop = (index: number) => {
    if (draggedIdx !== null && draggedIdx !== index) {
      moveBlock(draggedIdx, index);
    }
    setDraggedIdx(null);
    setDragOverIdx(null);
  };

  const viewportWidthClass = {
    desktop: 'max-w-6xl',
    tablet: 'max-w-3xl',
    mobile: 'max-w-md',
  }[viewport];

  return (
    <div className="flex flex-col items-center w-full pb-20">
      {/* Viewport Control Bar */}
      <div className="sticky top-20 z-30 mb-8 bg-white/95 dark:bg-stone-900/95 backdrop-blur-md px-4 py-2 rounded-2xl shadow-md border border-neutral-200 dark:border-neutral-800 flex items-center gap-4">
        <span className="text-xs font-mono uppercase tracking-wider text-neutral-400 font-semibold">
          Viewport:
        </span>
        <div className="flex items-center gap-1 bg-neutral-100 dark:bg-neutral-800 p-1 rounded-xl">
          <button
            type="button"
            onClick={() => setViewport('desktop')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
              viewport === 'desktop' ? 'bg-white dark:bg-stone-700 shadow-xs text-neutral-900 dark:text-white' : 'text-neutral-500 hover:text-neutral-900'
            }`}
          >
            <Monitor className="w-3.5 h-3.5" />
            Desktop
          </button>
          <button
            type="button"
            onClick={() => setViewport('tablet')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
              viewport === 'tablet' ? 'bg-white dark:bg-stone-700 shadow-xs text-neutral-900 dark:text-white' : 'text-neutral-500 hover:text-neutral-900'
            }`}
          >
            <Tablet className="w-3.5 h-3.5" />
            Tablet
          </button>
          <button
            type="button"
            onClick={() => setViewport('mobile')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
              viewport === 'mobile' ? 'bg-white dark:bg-stone-700 shadow-xs text-neutral-900 dark:text-white' : 'text-neutral-500 hover:text-neutral-900'
            }`}
          >
            <Smartphone className="w-3.5 h-3.5" />
            Mobile
          </button>
        </div>

        <div className="h-4 w-px bg-neutral-200" />

        <span className="text-xs text-neutral-500 font-mono">
          {site.blocks.length} Sections
        </span>
      </div>

      {/* Responsive Preview Canvas Container */}
      <div
        className={`w-full transition-all duration-300 ${viewportWidthClass} rounded-3xl overflow-hidden shadow-2xl border ${theme.colors.borderHairline} ${theme.colors.bgCanvas} min-h-[800px]`}
      >
        {/* Render Blocks */}
        {site.blocks.map((block, idx) => {
          const isEditing = editingBlockId === block.id;
          const isOver = dragOverIdx === idx;

          return (
            <div
              key={block.id}
              draggable
              onDragStart={() => handleDragStart(idx)}
              onDragOver={(e) => handleDragOver(e, idx)}
              onDrop={() => handleDrop(idx)}
              className={`relative group transition-all duration-200 ${
                isOver ? 'ring-2 ring-rose-500 bg-rose-50/20' : ''
              }`}
            >
              {/* Drag & Controls Toolbar (Floating on hover / focus) */}
              <div className="absolute top-2 right-4 z-20 flex items-center gap-1 bg-white/90 dark:bg-stone-800/90 backdrop-blur-md px-2 py-1 rounded-xl shadow-md border border-neutral-200 dark:border-neutral-700 opacity-0 group-hover:opacity-100 transition-opacity">
                {/* Drag handle */}
                <div
                  className="p-1 text-neutral-400 hover:text-neutral-700 cursor-grab active:cursor-grabbing"
                  title="Drag to reorder"
                >
                  <GripVertical className="w-4 h-4" />
                </div>

                <div className="h-3 w-px bg-neutral-200 dark:bg-neutral-700" />

                {/* Move up */}
                <button
                  type="button"
                  disabled={idx === 0}
                  onClick={() => moveBlock(idx, idx - 1)}
                  className="p-1 text-neutral-500 hover:text-neutral-900 disabled:opacity-25"
                  title="Move Up"
                >
                  <ChevronUp className="w-3.5 h-3.5" />
                </button>

                {/* Move down */}
                <button
                  type="button"
                  disabled={idx === site.blocks.length - 1}
                  onClick={() => moveBlock(idx, idx + 1)}
                  className="p-1 text-neutral-500 hover:text-neutral-900 disabled:opacity-25"
                  title="Move Down"
                >
                  <ChevronDown className="w-3.5 h-3.5" />
                </button>

                <div className="h-3 w-px bg-neutral-200 dark:bg-neutral-700" />

                {/* Edit Toggle */}
                <button
                  type="button"
                  onClick={() => setEditingBlockId(isEditing ? null : block.id)}
                  className={`p-1 rounded text-xs transition-colors ${
                    isEditing ? 'text-rose-600 font-bold bg-rose-50' : 'text-neutral-600 hover:text-neutral-900'
                  }`}
                  title={isEditing ? 'Done Editing' : 'Edit Section Texts'}
                >
                  <Edit3 className="w-3.5 h-3.5" />
                </button>

                {/* Duplicate */}
                <button
                  type="button"
                  onClick={() => duplicateBlock(idx)}
                  className="p-1 text-neutral-500 hover:text-neutral-900"
                  title="Duplicate Section"
                >
                  <Copy className="w-3.5 h-3.5" />
                </button>

                {/* Delete */}
                <button
                  type="button"
                  onClick={() => deleteBlock(idx)}
                  className="p-1 text-rose-500 hover:text-rose-700"
                  title="Delete Section"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Block Content View */}
              <div className="w-full">
                {block.type === 'hero' && (
                  <HeroBlockView
                    block={block}
                    theme={theme}
                    recipientName={site.recipientName}
                    apologizerName={site.apologizerName}
                    isEditing={isEditing}
                    onUpdateBlock={(upd) => handleUpdateBlock(block.id, upd)}
                  />
                )}

                {block.type === 'sorry_card' && (
                  <div className="py-8 px-4">
                    <EnvelopeCard
                      config={site.cardConfig}
                      recipientName={site.recipientName}
                      apologizerName={site.apologizerName}
                      onUpdateConfig={(upd) => onUpdateSite({ cardConfig: { ...site.cardConfig, ...upd } })}
                      interactive={true}
                    />
                    <div className="text-center mt-2">
                      <button
                        type="button"
                        onClick={onOpenCardStudio}
                        className="inline-flex items-center gap-1.5 text-xs text-rose-700 hover:text-rose-800 underline font-medium cursor-pointer"
                      >
                        <Sparkles className="w-3.5 h-3.5" />
                        Customize Envelope, Wax Seal & Postage in Card Studio
                      </button>
                    </div>
                  </div>
                )}

                {block.type === 'letter' && (
                  <LetterBlockView
                    block={block}
                    theme={theme}
                    recipientName={site.recipientName}
                    apologizerName={site.apologizerName}
                    isEditing={isEditing}
                    onUpdateBlock={(upd) => handleUpdateBlock(block.id, upd)}
                  />
                )}

                {block.type === 'accountability' && (
                  <AccountabilityBlockView
                    block={block}
                    theme={theme}
                    isEditing={isEditing}
                    onUpdateBlock={(upd) => handleUpdateBlock(block.id, upd)}
                  />
                )}

                {block.type === 'memories' && (
                  <MemoriesBlockView
                    block={block}
                    theme={theme}
                    isEditing={isEditing}
                    onUpdateBlock={(upd) => handleUpdateBlock(block.id, upd)}
                  />
                )}

                {block.type === 'reasons_why' && (
                  <ReasonsWhyBlockView
                    block={block}
                    theme={theme}
                    isEditing={isEditing}
                    onUpdateBlock={(upd) => handleUpdateBlock(block.id, upd)}
                  />
                )}

                {block.type === 'promise_bond' && (
                  <PromiseBondBlockView
                    block={block}
                    theme={theme}
                    recipientName={site.recipientName}
                    apologizerName={site.apologizerName}
                    isEditing={isEditing}
                    onUpdateBlock={(upd) => handleUpdateBlock(block.id, upd)}
                  />
                )}

                {block.type === 'vouchers' && (
                  <VouchersBlockView
                    block={block}
                    theme={theme}
                    isEditing={isEditing}
                    onUpdateBlock={(upd) => handleUpdateBlock(block.id, upd)}
                  />
                )}

                {block.type === 'forgiveness_meter' && (
                  <ForgivenessMeterBlockView
                    block={block}
                    theme={theme}
                    recipientName={site.recipientName}
                    apologizerName={site.apologizerName}
                    isEditing={isEditing}
                    onUpdateBlock={(upd) => handleUpdateBlock(block.id, upd)}
                  />
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Add Section Quick Bar */}
      <div className="mt-10 p-5 rounded-2xl bg-white dark:bg-stone-800 border border-neutral-200 dark:border-neutral-700 shadow-lg max-w-4xl w-full">
        <span className="text-xs font-mono uppercase tracking-wider text-neutral-400 block mb-3 font-semibold text-center">
          + Add a New Section to Your Apology Site
        </span>
        <div className="flex flex-wrap justify-center gap-2">
          <button
            type="button"
            onClick={() => addBlock('hero')}
            className="px-3 py-1.5 rounded-lg border border-neutral-200 hover:border-neutral-400 text-xs font-medium bg-neutral-50 hover:bg-white transition-colors cursor-pointer"
          >
            Hero Banner
          </button>
          <button
            type="button"
            onClick={() => addBlock('sorry_card')}
            className="px-3 py-1.5 rounded-lg border border-neutral-200 hover:border-neutral-400 text-xs font-medium bg-neutral-50 hover:bg-white transition-colors cursor-pointer"
          >
            Wax-Sealed Card
          </button>
          <button
            type="button"
            onClick={() => addBlock('letter')}
            className="px-3 py-1.5 rounded-lg border border-neutral-200 hover:border-neutral-400 text-xs font-medium bg-neutral-50 hover:bg-white transition-colors cursor-pointer"
          >
            Heartfelt Letter
          </button>
          <button
            type="button"
            onClick={() => addBlock('accountability')}
            className="px-3 py-1.5 rounded-lg border border-neutral-200 hover:border-neutral-400 text-xs font-medium bg-neutral-50 hover:bg-white transition-colors cursor-pointer"
          >
            Accountability Points
          </button>
          <button
            type="button"
            onClick={() => addBlock('memories')}
            className="px-3 py-1.5 rounded-lg border border-neutral-200 hover:border-neutral-400 text-xs font-medium bg-neutral-50 hover:bg-white transition-colors cursor-pointer"
          >
            Cherished Memories
          </button>
          <button
            type="button"
            onClick={() => addBlock('reasons_why')}
            className="px-3 py-1.5 rounded-lg border border-neutral-200 hover:border-neutral-400 text-xs font-medium bg-neutral-50 hover:bg-white transition-colors cursor-pointer"
          >
            Reasons I Cherish You
          </button>
          <button
            type="button"
            onClick={() => addBlock('promise_bond')}
            className="px-3 py-1.5 rounded-lg border border-amber-300 hover:border-amber-500 text-xs font-semibold bg-amber-50 text-amber-900 transition-colors cursor-pointer"
          >
            Solemn Promise Bond
          </button>
          <button
            type="button"
            onClick={() => addBlock('vouchers')}
            className="px-3 py-1.5 rounded-lg border border-neutral-200 hover:border-neutral-400 text-xs font-medium bg-neutral-50 hover:bg-white transition-colors cursor-pointer"
          >
            Love Vouchers
          </button>
          <button
            type="button"
            onClick={() => addBlock('forgiveness_meter')}
            className="px-3 py-1.5 rounded-lg border border-rose-300 hover:border-rose-500 text-xs font-semibold bg-rose-50 text-rose-900 transition-colors cursor-pointer"
          >
            Forgiveness Decision
          </button>
        </div>
      </div>
    </div>
  );
};
