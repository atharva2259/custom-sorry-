import React from 'react';
import { Mail, Sparkles, Eye, Palette, BookOpen } from 'lucide-react';

interface HeaderProps {
  currentView: 'builder' | 'preview';
  onViewChange: (view: 'builder' | 'preview') => void;
  onOpenCardStudio: () => void;
  onOpenMessageLibrary: () => void;
  onOpenThemePicker: () => void;
  onOpenEmailShare: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentView,
  onViewChange,
  onOpenCardStudio,
  onOpenMessageLibrary,
  onOpenThemePicker,
  onOpenEmailShare,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white/95 dark:bg-stone-900/95 backdrop-blur-md border-b border-neutral-200 dark:border-neutral-800 transition-colors">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Brand Wordmark (Single text element wordmark, whitespace-nowrap shrink-0) */}
        <button
          type="button"
          onClick={() => onViewChange('builder')}
          className="text-xl font-bold tracking-tight text-neutral-900 dark:text-white font-serif whitespace-nowrap shrink-0 cursor-pointer flex items-center gap-2"
        >
          <span className="text-rose-600">Heartfelt</span>
        </button>

        {/* Zone 2: 4-5 single-line text links (whitespace-nowrap shrink-0) */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-neutral-600 dark:text-neutral-300">
          <button
            type="button"
            onClick={() => onViewChange('builder')}
            className={`hover:text-neutral-900 dark:hover:text-white transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
              currentView === 'builder' ? 'text-rose-700 font-semibold' : ''
            }`}
          >
            Canvas Builder
          </button>
          <button
            type="button"
            onClick={onOpenCardStudio}
            className="hover:text-neutral-900 dark:hover:text-white transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            Card Studio
          </button>
          <button
            type="button"
            onClick={onOpenMessageLibrary}
            className="hover:text-neutral-900 dark:hover:text-white transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            Message Library
          </button>
          <button
            type="button"
            onClick={onOpenThemePicker}
            className="hover:text-neutral-900 dark:hover:text-white transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            Theme Styles
          </button>
          <button
            type="button"
            onClick={() => onViewChange(currentView === 'builder' ? 'preview' : 'builder')}
            className={`hover:text-neutral-900 dark:hover:text-white transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
              currentView === 'preview' ? 'text-rose-700 font-semibold' : ''
            }`}
          >
            {currentView === 'builder' ? 'Recipient Preview' : 'Exit Preview'}
          </button>
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={onOpenEmailShare}
            className="px-4 py-2 text-xs font-semibold text-white bg-neutral-900 hover:bg-neutral-800 rounded-xl transition-colors whitespace-nowrap shrink-0 flex items-center gap-2 shadow-xs cursor-pointer"
          >
            <Mail className="w-3.5 h-3.5" />
            Send via Email
          </button>
        </div>
      </div>
    </header>
  );
};
