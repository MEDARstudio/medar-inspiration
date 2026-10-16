import React, { useState, useEffect } from 'react';
import { ArrowDown, Sparkles, Disc3, ShieldCheck } from 'lucide-react';
import { soundEngine } from '../utils/audio';

interface HeroProps {
  onOpenBrief: () => void;
  onExploreProjects: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenBrief, onExploreProjects }) => {
  const [parisTime, setParisTime] = useState<string>('');
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });
  const [isVisualHovered, setIsVisualHovered] = useState(false);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const timeStr = now.toLocaleTimeString('fr-FR', {
        timeZone: 'Europe/Paris',
        hour12: false,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      });
      setParisTime(timeStr);
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 20;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 20;
    setMouseOffset({ x, y });
  };

  const handleMouseLeave = () => {
    setMouseOffset({ x: 0, y: 0 });
    setIsVisualHovered(false);
  };

  return (
    <section className="relative pt-32 pb-16 md:pt-40 md:pb-24 overflow-hidden border-b border-[#222222]">
      {/* Ambient background glow */}
      <div className="absolute top-1/4 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#FF1E1E]/8 blur-[140px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-6">
        {/* Editorial Sub-bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-8 mb-8 border-b border-white/10 text-xs font-mono text-[#8E8E93]">
          <div className="flex items-center gap-3">
            <span className="inline-block w-2 h-2 rounded-full bg-[#FF1E1E]" />
            <span className="text-white font-medium">MEDAR × NEOCLUB</span>
            <span aria-hidden="true">·</span>
            <span>ÉDITION LIMITÉE NOIR & ROUGE</span>
          </div>

          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <span className="text-neutral-500">PARIS TIME</span>
              <span className="text-white font-mono tabular-nums">{parisTime || '13:35:19'}</span>
            </div>
            <div className="hidden sm:flex items-center gap-2">
              <span className="text-neutral-500">COORD</span>
              <span className="text-white">48.8566° N, 2.3522° E</span>
            </div>
          </div>
        </div>

        {/* 2-Column Balanced Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-stretch">
          {/* Left Column: Typographic Hierarchy */}
          <div className="lg:col-span-7 flex flex-col justify-between">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 text-xs font-mono tracking-widest text-[#FF1E1E] uppercase">
                <span>[ 01 // MANIFESTE DIGITAL ]</span>
              </div>

              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-extrabold uppercase leading-[0.95] tracking-tight text-white text-balance">
                L’Esthétique <span className="text-[#FF1E1E]">Radicale</span> du Clubbing Numérique.
              </h1>

              <p className="text-base sm:text-lg text-[#A1A1AA] max-w-xl leading-relaxed font-sans font-normal pt-2">
                Medar Studio fusionne avec <span className="text-white font-medium">neoclub.fr</span> pour créer un sanctuaire digital ultra-minimaliste. Direction artistique tranchée, typographie monumentale, 3D temps réel et interactions cinétiques à fleur de peau.
              </p>
            </div>

            {/* Action CTA Group */}
            <div className="pt-8 sm:pt-10 flex flex-wrap items-center gap-4">
              <button
                onClick={() => {
                  soundEngine.playClick();
                  onExploreProjects();
                }}
                className="group px-7 py-3.5 bg-white text-black font-mono text-xs font-bold uppercase tracking-wider hover:bg-[#FF1E1E] hover:text-white transition-all duration-300 flex items-center gap-2"
                onMouseEnter={() => soundEngine.playHover()}
              >
                <span>Explorer les œuvres</span>
                <ArrowDown className="w-4 h-4 transition-transform group-hover:translate-y-1" />
              </button>

              <button
                onClick={() => {
                  soundEngine.playClick();
                  onOpenBrief();
                }}
                className="px-6 py-3.5 border border-white/20 text-white font-mono text-xs font-medium uppercase tracking-wider hover:border-[#FF1E1E] hover:text-[#FF1E1E] transition-all duration-300"
                onMouseEnter={() => soundEngine.playHover()}
              >
                Inaugurer un brief
              </button>
            </div>
          </div>

          {/* Right Column: Interactive Monolithic Visual Container */}
          <div
            className="lg:col-span-5 h-[380px] sm:h-[460px] lg:h-auto min-h-[380px] relative rounded-lg border border-[#262626] bg-[#0E0E0E] overflow-hidden group cursor-crosshair"
            onMouseMove={handleMouseMove}
            onMouseEnter={() => {
              setIsVisualHovered(true);
              soundEngine.playHover();
            }}
            onMouseLeave={handleMouseLeave}
            data-cursor-text="INTERACT"
          >
            {/* Grid Pattern */}
            <div
              className="absolute inset-0 opacity-20 pointer-events-none"
              style={{
                backgroundImage: 'radial-gradient(circle, #444 1px, transparent 1px)',
                backgroundSize: '20px 20px',
              }}
            />

            {/* Central Holographic Emblem */}
            <div
              className="absolute inset-0 flex flex-col items-center justify-center transition-transform duration-500 ease-out p-8"
              style={{
                transform: `translate3d(${mouseOffset.x}px, ${mouseOffset.y}px, 0)`,
              }}
            >
              <div className="relative w-52 h-52 sm:w-64 sm:h-64 flex items-center justify-center">
                {/* Rotating Rings */}
                <div
                  className={`absolute inset-0 rounded-full border border-white/10 transition-all duration-700 ${
                    isVisualHovered ? 'border-[#FF1E1E]/60 scale-105' : ''
                  }`}
                  style={{ animation: 'spin 20s linear infinite' }}
                />
                <div
                  className="absolute inset-4 rounded-full border border-dashed border-[#FF1E1E]/40"
                  style={{ animation: 'spin 35s linear infinite reverse' }}
                />
                <div className="absolute inset-12 rounded-full border border-white/20" />

                {/* Core Monolith */}
                <div className="relative z-10 text-center space-y-1">
                  <span className="block text-4xl sm:text-5xl font-display font-extrabold text-white tracking-tighter">
                    M // NC
                  </span>
                  <span className="block text-[11px] font-mono text-[#FF1E1E] uppercase tracking-widest font-semibold">
                    PARIS ATELIER
                  </span>
                  <span className="block text-[10px] font-mono text-[#8E8E93]">
                    60 FPS · LATENCE 0
                  </span>
                </div>

                {/* Laser scan line */}
                <div
                  className={`absolute top-0 bottom-0 w-[2px] bg-gradient-to-b from-transparent via-[#FF1E1E] to-transparent pointer-events-none transition-opacity duration-300 ${
                    isVisualHovered ? 'opacity-100' : 'opacity-40'
                  }`}
                  style={{
                    left: `${50 + mouseOffset.x * 2}%`,
                    boxShadow: '0 0 15px #FF1E1E',
                  }}
                />
              </div>
            </div>

            {/* Interactive Badge / Corner Metadata */}
            <div className="absolute top-4 left-4 text-[10px] font-mono text-neutral-400 flex items-center gap-1.5">
              <Disc3 className={`w-3.5 h-3.5 text-[#FF1E1E] ${isVisualHovered ? 'animate-spin' : ''}`} />
              <span>SYSTÈME INTERACTIF 3.0</span>
            </div>

            <div className="absolute top-4 right-4 text-[10px] font-mono text-neutral-500">
              STABILITÉ 100%
            </div>

            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-[11px] font-mono border-t border-white/10 pt-3">
              <span className="text-[#8E8E93]">SURVOLEZ POUR MODULER</span>
              <span className="text-white font-bold text-[#FF1E1E]">Δ {Math.round(mouseOffset.x * 5)}ms</span>
            </div>
          </div>
        </div>

        {/* Full-Width Quantitative Rigor Row (Claim-to-Proof Adjacency) */}
        <div className="mt-16 sm:mt-20 pt-8 border-t border-[#222222] grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <div className="text-3xl sm:text-4xl font-display font-bold text-white tracking-tight tabular-nums">
              12<span className="text-[#FF1E1E]">+</span>
            </div>
            <div className="text-xs font-mono text-[#8E8E93] uppercase tracking-wider mt-1">
              Années de Direction Artistique
            </div>
          </div>

          <div>
            <div className="text-3xl sm:text-4xl font-display font-bold text-white tracking-tight tabular-nums">
              40<span className="text-[#FF1E1E]">+</span>
            </div>
            <div className="text-xs font-mono text-[#8E8E93] uppercase tracking-wider mt-1">
              Projets & Défilés Déployés
            </div>
          </div>

          <div>
            <div className="text-3xl sm:text-4xl font-display font-bold text-white tracking-tight tabular-nums">
              18
            </div>
            <div className="text-xs font-mono text-[#8E8E93] uppercase tracking-wider mt-1">
              Distinctions & Club Awards
            </div>
          </div>

          <div>
            <div className="text-3xl sm:text-4xl font-display font-bold text-white tracking-tight tabular-nums">
              60 <span className="text-xs text-[#FF1E1E] font-mono">FPS</span>
            </div>
            <div className="text-xs font-mono text-[#8E8E93] uppercase tracking-wider mt-1">
              Fluidité Native Temps Réel
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
