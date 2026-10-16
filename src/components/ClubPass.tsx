import React, { useState } from 'react';
import { CreditCard, Shield, Sparkles, Key, Check, Copy } from 'lucide-react';
import { NEOCLUB_PASS_PERKS } from '../data/projects';
import { soundEngine } from '../utils/audio';

export const ClubPass: React.FC = () => {
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [passNumber, setPassNumber] = useState('7704-8921-MEDAR');

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - card.left;
    const y = e.clientY - card.top;
    const centerX = card.width / 2;
    const centerY = card.height / 2;
    
    // Smooth 3D tilt calculation
    const rotX = -((y - centerY) / centerY) * 12;
    const rotY = ((x - centerX) / centerX) * 12;

    setRotateX(rotX);
    setRotateY(rotY);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
    soundEngine.playHover();
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotateX(0);
    setRotateY(0);
  };

  const handleCopyCode = (code: string) => {
    soundEngine.playClick();
    navigator.clipboard?.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  return (
    <section id="club-pass" className="py-24 md:py-32 bg-[#0A0A0A] border-b border-[#222222] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Description & Perks */}
          <div className="lg:col-span-7 space-y-8">
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-xs font-mono text-[#FF1E1E] uppercase tracking-widest">
                <span>05. ÉCOSYSTÈME PRIVÉ</span>
                <span aria-hidden="true">·</span>
                <span className="text-neutral-500">NEOCLUB MEMBRE</span>
              </div>
              <h2 className="text-3xl sm:text-5xl font-display font-extrabold uppercase text-white tracking-tight leading-tight">
                Le Pass <span className="text-[#FF1E1E]">Atelier</span> Neoclub.
              </h2>
              <p className="text-base text-[#A1A1AA] leading-relaxed font-sans max-w-xl">
                Réservé aux créateurs, collectionneurs et partenaires de l’écosystème. Ce pass déverrouille l’accès anticipé à nos installations sonores, aux fichiers sources et aux soirées privées.
              </p>
            </div>

            {/* Perks list */}
            <div className="space-y-4">
              {NEOCLUB_PASS_PERKS.map((perk) => (
                <div
                  key={perk.code}
                  className="p-5 rounded-lg bg-[#111111] border border-[#222222] hover:border-white/20 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  <div className="space-y-1">
                    <div className="text-sm font-display font-bold text-white flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#FF1E1E]" />
                      <span>{perk.title}</span>
                    </div>
                    <p className="text-xs text-[#8E8E93] font-sans">
                      {perk.detail}
                    </p>
                  </div>

                  <button
                    onClick={() => handleCopyCode(perk.code)}
                    className="flex items-center gap-2 px-3 py-1.5 rounded bg-[#1A1A1A] hover:bg-[#252525] text-xs font-mono text-neutral-300 hover:text-white border border-white/10 shrink-0 self-start sm:self-center"
                    title="Copier le code privilège"
                  >
                    <span>{perk.code}</span>
                    {copiedCode === perk.code ? (
                      <Check className="w-3.5 h-3.5 text-green-400" />
                    ) : (
                      <Copy className="w-3.5 h-3.5 text-neutral-400" />
                    )}
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Right 3D Interactive Card Showcase */}
          <div className="lg:col-span-5 flex justify-center [perspective:1000px]">
            <div
              onMouseMove={handleMouseMove}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              className="relative w-full max-w-[420px] aspect-[1.586/1] rounded-2xl p-7 bg-gradient-to-br from-[#1A1A1A] via-[#0E0E0E] to-[#050505] border border-white/20 shadow-2xl transition-transform duration-150 ease-out cursor-grab select-none flex flex-col justify-between"
              style={{
                transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
                transformStyle: 'preserve-3d',
                boxShadow: isHovered
                  ? '0 25px 50px -12px rgba(255, 30, 30, 0.25), 0 0 20px rgba(255, 30, 30, 0.15)'
                  : '0 20px 40px -15px rgba(0, 0, 0, 0.7)',
              }}
            >
              {/* Dynamic Holographic Sheen Layer */}
              <div
                className={`absolute inset-0 rounded-2xl pointer-events-none transition-opacity duration-300 ${
                  isHovered ? 'opacity-40' : 'opacity-10'
                }`}
                style={{
                  background: `linear-gradient(${
                    115 + rotateY * 2
                  }deg, rgba(255, 30, 30, 0.4) 0%, rgba(255, 255, 255, 0.2) 50%, transparent 100%)`,
                }}
              />

              {/* Card Header */}
              <div className="relative z-10 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="font-display font-extrabold text-sm sm:text-base tracking-tighter text-white">
                    MEDAR STUDIO
                  </span>
                  <span className="text-[#FF1E1E] font-mono text-xs">/</span>
                  <span className="font-display text-sm tracking-tight text-white/80">NEOCLUB</span>
                </div>

                <div className="w-8 h-6 rounded border border-white/40 flex items-center justify-center bg-black/40">
                  <div className="w-4 h-3 rounded-sm bg-[#FF1E1E]" />
                </div>
              </div>

              {/* Card Center Chip & Hologram */}
              <div className="relative z-10 flex items-center justify-between py-2">
                <div className="w-12 h-9 rounded bg-[#2A2A2A] border border-white/20 flex items-center justify-center overflow-hidden">
                  <div className="w-8 h-5 border border-amber-400/60 rounded-xs bg-amber-500/10" />
                </div>

                <span className="text-xl sm:text-2xl font-mono tracking-widest text-[#FF1E1E] font-bold">
                  PASS VIP
                </span>
              </div>

              {/* Card Footer Numbers */}
              <div className="relative z-10 space-y-2">
                <div className="font-mono text-sm sm:text-base tracking-widest text-white/90 drop-shadow">
                  {passNumber}
                </div>

                <div className="flex items-center justify-between text-[10px] font-mono text-[#8E8E93] uppercase">
                  <span>MEMBRE D’HONNEUR</span>
                  <span className="text-white">VALIDE 2026/2027</span>
                </div>
              </div>

              {/* Card Glint Border */}
              <div className="absolute inset-0 rounded-2xl border border-[#FF1E1E]/40 pointer-events-none" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
