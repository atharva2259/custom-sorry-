import React from 'react';
import { THEMES } from '../../data/templates';
import { ThemeDefinition, ThemeId } from '../../types/builder';
import { X, Check } from 'lucide-react';

interface TemplatePickerModalProps {
  isOpen: boolean;
  onClose: () => void;
  activeThemeId: ThemeId;
  onSelectTheme: (themeId: ThemeId) => void;
}

export const TemplatePickerModal: React.FC<TemplatePickerModalProps> = ({
  isOpen,
  onClose,
  activeThemeId,
  onSelectTheme,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-3xl w-full p-6 sm:p-8 shadow-2xl border border-neutral-200 max-h-[90vh] overflow-y-auto my-auto">
        <div className="flex items-center justify-between pb-4 mb-6 border-b border-neutral-100">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-neutral-900 font-serif">
              Responsive Apology Themes
            </h2>
            <p className="text-xs text-neutral-500">
              Select an aesthetic palette tuned for sincere apology deliveries and covenants.
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

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {(Object.values(THEMES) as ThemeDefinition[]).map((theme) => {
            const isSelected = activeThemeId === theme.id;

            return (
              <button
                key={theme.id}
                type="button"
                onClick={() => {
                  onSelectTheme(theme.id);
                  onClose();
                }}
                className={`p-5 rounded-2xl border text-left transition-all relative overflow-hidden cursor-pointer ${
                  isSelected
                    ? 'border-neutral-900 ring-2 ring-neutral-900/15 bg-neutral-50'
                    : 'border-neutral-200 hover:border-neutral-300 bg-white hover:bg-neutral-50'
                }`}
              >
                {/* Theme Palette Swatch preview strip */}
                <div className="flex items-center gap-1.5 mb-3">
                  <span className={`w-6 h-6 rounded-md ${theme.colors.bgCanvas} border border-black/10`} />
                  <span className={`w-6 h-6 rounded-md ${theme.colors.accent} border border-black/10`} />
                  <span className={`w-6 h-6 rounded-md ${theme.colors.badgeBg} border border-black/10`} />
                </div>

                <div className="flex items-center justify-between">
                  <h3 className="text-base font-bold text-neutral-900">{theme.name}</h3>
                  {isSelected && (
                    <span className="p-1 rounded-full bg-neutral-900 text-white">
                      <Check className="w-3 h-3" />
                    </span>
                  )}
                </div>

                <p className="text-xs text-neutral-600 mt-1 line-clamp-2 leading-relaxed">{theme.tagline}</p>
                <div className="mt-3 pt-2 border-t border-neutral-100 flex items-center justify-between text-[10px] text-neutral-400 font-mono">
                  <span>{theme.aestheticMood}</span>
                  <span className="capitalize">{theme.id}</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
