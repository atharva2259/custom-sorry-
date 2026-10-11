import React from 'react';
import { WaxSealColor, WaxSealIcon } from '../../types/builder';
import { Heart, Sparkles } from 'lucide-react';

interface WaxSealProps {
  color?: WaxSealColor;
  icon?: WaxSealIcon;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  onClick?: () => void;
  showShimmer?: boolean;
}

export const WaxSeal: React.FC<WaxSealProps> = ({
  color = 'gold',
  icon = 'heart',
  size = 'md',
  className = '',
  onClick,
  showShimmer = false,
}) => {
  const sizeMap = {
    sm: 'w-8 h-8 text-xs',
    md: 'w-12 h-12 text-sm',
    lg: 'w-16 h-16 text-base',
    xl: 'w-20 h-20 text-lg',
  };

  const colorStyles: Record<WaxSealColor, { bg: string; border: string; glow: string; text: string }> = {
    gold: {
      bg: 'bg-gradient-to-br from-amber-400 via-amber-600 to-amber-800',
      border: 'border-amber-300/60 ring-2 ring-amber-700/50',
      glow: 'shadow-[0_4px_14px_rgba(217,119,6,0.35)]',
      text: 'text-amber-100',
    },
    ruby: {
      bg: 'bg-gradient-to-br from-rose-600 via-red-800 to-stone-900',
      border: 'border-rose-400/50 ring-2 ring-rose-950/60',
      glow: 'shadow-[0_4px_14px_rgba(225,29,72,0.35)]',
      text: 'text-rose-100',
    },
    emerald: {
      bg: 'bg-gradient-to-br from-emerald-500 via-emerald-800 to-stone-900',
      border: 'border-emerald-300/50 ring-2 ring-emerald-950/60',
      glow: 'shadow-[0_4px_14px_rgba(16,185,129,0.35)]',
      text: 'text-emerald-100',
    },
    'rose-quartz': {
      bg: 'bg-gradient-to-br from-pink-300 via-rose-400 to-rose-600',
      border: 'border-pink-200/60 ring-2 ring-rose-700/40',
      glow: 'shadow-[0_4px_14px_rgba(244,114,182,0.35)]',
      text: 'text-white',
    },
    bronze: {
      bg: 'bg-gradient-to-br from-amber-700 via-stone-700 to-stone-900',
      border: 'border-amber-600/40 ring-2 ring-stone-950/60',
      glow: 'shadow-[0_4px_14px_rgba(180,83,9,0.35)]',
      text: 'text-amber-200',
    },
  };

  const currentTheme = colorStyles[color] || colorStyles.gold;

  const renderIcon = () => {
    switch (icon) {
      case 'rose':
        return (
          <svg className="w-1/2 h-1/2 fill-current" viewBox="0 0 24 24">
            <path d="M12 2C8.5 2 6 4.5 6 7.5C6 9.8 7.5 11.8 9.5 12.6C9.2 13.5 9 14.5 9 15.5C9 18.5 11 20 12 21C13 20 15 18.5 15 15.5C15 14.5 14.8 13.5 14.5 12.6C16.5 11.8 18 9.8 18 7.5C18 4.5 15.5 2 12 2ZM12 4C14 4 15.5 5.5 15.5 7.5C15.5 9.5 14 11 12 11C10 11 8.5 9.5 8.5 7.5C8.5 5.5 10 4 12 4Z" />
          </svg>
        );
      case 'branch':
        return (
          <svg className="w-1/2 h-1/2 fill-current" viewBox="0 0 24 24">
            <path d="M19.5 3.5C17.5 3.5 15 5 13.5 7C12 9 11 11.5 11 13.5C11 14.2 11.2 14.9 11.5 15.5L7.5 19.5C6.7 20.3 5.4 20.3 4.6 19.5C3.8 18.7 3.8 17.4 4.6 16.6L8.6 12.6C9.2 12.9 9.9 13.1 10.6 13.1C12.6 13.1 15.1 12.1 17.1 10.6C19.1 9.1 20.6 6.6 20.6 4.6C20.6 4 20.1 3.5 19.5 3.5Z" />
          </svg>
        );
      case 'knot':
        return (
          <svg className="w-1/2 h-1/2 fill-current" viewBox="0 0 24 24">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z" />
          </svg>
        );
      case 'star':
        return <Sparkles className="w-1/2 h-1/2" />;
      case 'heart':
      default:
        return <Heart className="w-1/2 h-1/2 fill-current" />;
    }
  };

  return (
    <div
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      className={`relative inline-flex items-center justify-center rounded-full select-none transition-transform duration-200 ${
        onClick ? 'cursor-pointer hover:scale-105 active:scale-95' : ''
      } ${sizeMap[size]} ${currentTheme.bg} ${currentTheme.border} ${currentTheme.glow} ${currentTheme.text} ${className}`}
      style={{
        boxShadow: 'inset 0 2px 4px rgba(255,255,255,0.4), inset 0 -2px 6px rgba(0,0,0,0.5), 0 4px 10px rgba(0,0,0,0.25)',
      }}
    >
      {/* Outer organic scalloped wax border overlay */}
      <div className="absolute inset-[-2px] rounded-full border border-white/20 pointer-events-none" />
      {/* Inner debossed ring */}
      <div className="w-[82%] h-[82%] rounded-full border border-black/25 flex items-center justify-center shadow-inner">
        {renderIcon()}
      </div>
      {showShimmer && (
        <span className="absolute -top-1 -right-1 flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-3 w-3 bg-amber-500" />
        </span>
      )}
    </div>
  );
};
