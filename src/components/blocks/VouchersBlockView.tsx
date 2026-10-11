import React, { useState } from 'react';
import { VouchersBlock, ThemeDefinition } from '../../types/builder';
import { Ticket, CheckCircle2, Plus, Trash2 } from 'lucide-react';

interface VouchersBlockViewProps {
  block: VouchersBlock;
  theme: ThemeDefinition;
  isEditing?: boolean;
  onUpdateBlock?: (updated: Partial<VouchersBlock>) => void;
}

export const VouchersBlockView: React.FC<VouchersBlockViewProps> = ({
  block,
  theme,
  isEditing = false,
  onUpdateBlock,
}) => {
  const [redeemedMap, setRedeemedMap] = useState<Record<string, boolean>>({});

  const toggleRedeem = (id: string) => {
    setRedeemedMap((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleVoucherChange = (index: number, field: string, value: string) => {
    if (!onUpdateBlock) return;
    const newVouchers = [...block.vouchers];
    newVouchers[index] = { ...newVouchers[index], [field]: value };
    onUpdateBlock({ vouchers: newVouchers });
  };

  const handleAddVoucher = () => {
    if (!onUpdateBlock) return;
    onUpdateBlock({
      vouchers: [
        ...block.vouchers,
        {
          id: `v-${Date.now()}`,
          title: 'Unconditional Breakfast in Bed',
          description: 'Fluffy pancakes, fresh coffee, and your favorite songs played at your requested hour.',
          terms: 'Redeemable any Saturday or Sunday morning.',
        },
      ],
    });
  };

  const handleDeleteVoucher = (index: number) => {
    if (!onUpdateBlock) return;
    const newVouchers = block.vouchers.filter((_, i) => i !== index);
    onUpdateBlock({ vouchers: newVouchers });
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
              placeholder="Vouchers Heading"
            />
            <input
              type="text"
              value={block.subheading}
              onChange={(e) => onUpdateBlock && onUpdateBlock({ subheading: e.target.value })}
              className="w-full text-center text-sm opacity-70 bg-transparent border-b border-dashed border-neutral-300 focus:outline-none"
              placeholder="Vouchers Subheading"
            />
          </div>
        ) : (
          <>
            <h2 className={`text-2xl sm:text-3xl font-bold tracking-tight mb-2 ${theme.fontDisplay}`}>
              {block.heading || 'Reconciliation Vouchers'}
            </h2>
            <p className="text-sm opacity-75 max-w-md mx-auto">
              {block.subheading || 'Redeemable at your total discretion, with no expiration date.'}
            </p>
          </>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {block.vouchers.map((voucher, idx) => {
          const isClaimed = redeemedMap[voucher.id];

          return (
            <div
              key={voucher.id || idx}
              className={`relative rounded-2xl border-2 border-dashed p-6 transition-all duration-300 overflow-hidden ${
                isClaimed ? 'bg-emerald-50/50 border-emerald-300' : `${theme.colors.surfaceCard} ${theme.colors.borderHairline}`
              }`}
              style={{
                boxShadow: '0 6px 16px -4px rgba(0,0,0,0.03)',
              }}
            >
              {/* Ticket Notches */}
              <div className="absolute top-1/2 -left-3 w-6 h-6 rounded-full bg-[#faf6f2] border-r-2 border-dashed border-neutral-300 transform -translate-y-1/2 pointer-events-none" />
              <div className="absolute top-1/2 -right-3 w-6 h-6 rounded-full bg-[#faf6f2] border-l-2 border-dashed border-neutral-300 transform -translate-y-1/2 pointer-events-none" />

              <div className="flex items-center justify-between pb-3 mb-3 border-b border-black/5 dark:border-white/5">
                <span className="text-[10px] font-mono tracking-wider uppercase opacity-60 flex items-center gap-1.5">
                  <Ticket className="w-3.5 h-3.5 text-rose-500" />
                  Pass #0{idx + 1}
                </span>

                {isEditing ? (
                  <button
                    type="button"
                    onClick={() => handleDeleteVoucher(idx)}
                    className="text-rose-500 hover:text-rose-700"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                ) : (
                  <span className="text-[10px] font-mono font-semibold text-rose-700 uppercase">100% Transferable</span>
                )}
              </div>

              {isEditing ? (
                <div className="space-y-2">
                  <input
                    type="text"
                    value={voucher.title}
                    onChange={(e) => handleVoucherChange(idx, 'title', e.target.value)}
                    className="w-full text-sm font-bold p-1.5 border border-neutral-200 rounded"
                    placeholder="Voucher Title"
                  />
                  <textarea
                    rows={2}
                    value={voucher.description}
                    onChange={(e) => handleVoucherChange(idx, 'description', e.target.value)}
                    className="w-full text-xs p-1.5 border border-neutral-200 rounded"
                    placeholder="Voucher Description"
                  />
                  <input
                    type="text"
                    value={voucher.terms}
                    onChange={(e) => handleVoucherChange(idx, 'terms', e.target.value)}
                    className="w-full text-[11px] p-1.5 border border-neutral-200 rounded"
                    placeholder="Validity Terms"
                  />
                </div>
              ) : (
                <div>
                  <h4 className="text-base font-bold mb-2">{voucher.title}</h4>
                  <p className="text-xs opacity-80 leading-relaxed font-sans mb-4">{voucher.description}</p>
                  <p className="text-[11px] text-neutral-500 font-mono italic mb-4">{voucher.terms}</p>

                  <button
                    type="button"
                    onClick={() => toggleRedeem(voucher.id)}
                    className={`w-full py-2 px-3 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer ${
                      isClaimed
                        ? 'bg-emerald-600 text-white'
                        : 'bg-neutral-900 text-white hover:bg-neutral-800'
                    }`}
                  >
                    {isClaimed ? (
                      <>
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        Redeemed by Partner
                      </>
                    ) : (
                      'Tap to Redeem Pass'
                    )}
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {isEditing && (
        <div className="text-center mt-6">
          <button
            type="button"
            onClick={handleAddVoucher}
            className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-medium rounded-lg bg-black/5 hover:bg-black/10 transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            Add Love Voucher
          </button>
        </div>
      )}
    </div>
  );
};
