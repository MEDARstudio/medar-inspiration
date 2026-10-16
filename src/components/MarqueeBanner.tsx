import React from 'react';

interface MarqueeBannerProps {
  items?: string[];
  direction?: 'left' | 'right';
  className?: string;
}

export const MarqueeBanner: React.FC<MarqueeBannerProps> = ({
  items = [
    'DIRECTION ARTISTIQUE',
    'SCÉNOGRAPHIE ROUGE & NOIRE',
    '3D TEMPS RÉEL',
    'WEBGL EXPÉRIENCE',
    'PARIS × BERLIN × TOKYO',
    'TYPOGRAPHIE MONUMENTALE',
    'DESIGN D’INTERACTION',
    'CLUB SOUND DESIGN',
  ],
  className = '',
}) => {
  return (
    <div className={`relative py-4 border-y border-[#222222] bg-[#0A0A0A] overflow-hidden ${className}`}>
      <div className="flex select-none">
        <div className="animate-marquee flex items-center whitespace-nowrap">
          {items.concat(items).map((text, i) => (
            <div key={i} className="flex items-center mx-6 gap-6">
              <span className="text-xs md:text-sm font-mono tracking-widest uppercase font-bold text-neutral-300 hover:text-[#FF1E1E] transition-colors">
                {text}
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF1E1E]" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
