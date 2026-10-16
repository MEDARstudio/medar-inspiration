import React from 'react';
import { ArrowUp, Disc3 } from 'lucide-react';
import { soundEngine } from '../utils/audio';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    soundEngine.playClick();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#050505] text-white border-t border-[#222222] pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-6">
        {/* Main Footer Row */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-16 border-b border-white/10">
          {/* Brand Col */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-2 text-xl font-display font-extrabold tracking-tighter">
              <span>MEDAR STUDIO</span>
              <span className="text-[#FF1E1E] font-mono text-xs font-normal">×</span>
              <span>NEOCLUB.FR</span>
            </div>
            <p className="text-xs text-[#8E8E93] max-w-sm leading-relaxed font-sans">
              Remix haute fidélité associant la culture club avant-gardiste de Neoclub à la rigueur graphique et technologique de Medar Studio.
            </p>
            <div className="text-[11px] font-mono text-neutral-400">
              PARIS // 48.8566° N, 2.3522° E
            </div>
          </div>

          {/* Navigation Links */}
          <div className="md:col-span-3 space-y-3">
            <span className="text-xs font-mono uppercase tracking-wider text-[#FF1E1E] block">
              Exploration
            </span>
            <ul className="space-y-2 text-xs font-mono text-neutral-300">
              <li>
                <a href="#projets" className="hover:text-[#FF1E1E] transition-colors">
                  Œuvres & Cas d’Études
                </a>
              </li>
              <li>
                <a href="#manifesto" className="hover:text-[#FF1E1E] transition-colors">
                  Manifeste & Éthos
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-[#FF1E1E] transition-colors">
                  Configurateur Atelier
                </a>
              </li>
              <li>
                <a href="#club-pass" className="hover:text-[#FF1E1E] transition-colors">
                  Neoclub Pass Privé
                </a>
              </li>
            </ul>
          </div>

          {/* Socials & Dispatch */}
          <div className="md:col-span-4 space-y-3">
            <span className="text-xs font-mono uppercase tracking-wider text-[#FF1E1E] block">
              Réseaux & Diffusion
            </span>
            <ul className="space-y-2 text-xs font-mono text-neutral-300">
              <li>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-[#FF1E1E] transition-colors flex items-center justify-between"
                >
                  <span>Instagram</span>
                  <span className="text-neutral-500">@medar.studio</span>
                </a>
              </li>
              <li>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-[#FF1E1E] transition-colors flex items-center justify-between"
                >
                  <span>X / Twitter</span>
                  <span className="text-neutral-500">@neoclub_fr</span>
                </a>
              </li>
              <li>
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-[#FF1E1E] transition-colors flex items-center justify-between"
                >
                  <span>GitHub</span>
                  <span className="text-neutral-500">/medar-atelier</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-[#8E8E93]">
          <div>
            © {new Date().getFullYear()} MEDAR STUDIO × NEOCLUB.FR. TOUS DROITS RÉSERVÉS.
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 hover:text-white transition-colors group"
          >
            <span>REMONTER EN HAUT</span>
            <ArrowUp className="w-3.5 h-3.5 transition-transform group-hover:-translate-y-1 text-[#FF1E1E]" />
          </button>
        </div>
      </div>
    </footer>
  );
};
