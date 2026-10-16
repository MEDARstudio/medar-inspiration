import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Menu, X, ArrowUpRight } from 'lucide-react';
import { soundEngine } from '../utils/audio';

interface NavbarProps {
  onOpenBrief: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenBrief }) => {
  const [scrolled, setScrolled] = useState(false);
  const [soundActive, setSoundActive] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSoundToggle = () => {
    const active = soundEngine.toggle();
    setSoundActive(active);
  };

  const navLinks = [
    { label: 'Projets', href: '#projets' },
    { label: 'Studio', href: '#manifesto' },
    { label: 'Expertise', href: '#services' },
    { label: 'Club Pass', href: '#club-pass' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          scrolled
            ? 'bg-[#080808]/90 backdrop-blur-md border-b border-[#222222] py-4'
            : 'bg-transparent py-6 border-b border-white/5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between gap-8">
          {/* Zone 1: Single element brand wordmark */}
          <a
            href="#"
            className="group flex items-center gap-2 text-base md:text-lg font-bold tracking-tighter text-white whitespace-nowrap shrink-0 transition-colors"
            onMouseEnter={() => soundEngine.playHover()}
          >
            <span className="font-display font-extrabold tracking-tight">MEDAR STUDIO</span>
            <span className="text-[#FF1E1E] font-mono text-xs font-normal">×</span>
            <span className="font-display tracking-tight text-white/90 group-hover:text-[#FF1E1E] transition-colors">NEOCLUB</span>
          </a>

          {/* Zone 2: 4-5 single-line clean text navigation links */}
          <nav className="hidden md:flex items-center gap-8 text-xs font-mono uppercase tracking-wider text-[#A1A1AA]">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="hover:text-white hover:text-[#FF1E1E] transition-colors whitespace-nowrap shrink-0 relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-[#FF1E1E] hover:after:w-full after:transition-all after:duration-300"
                onMouseEnter={() => soundEngine.playHover()}
                onClick={() => soundEngine.playClick()}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Zone 3: 1 primary action & sound switch */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={handleSoundToggle}
              className="hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 rounded text-[11px] font-mono uppercase tracking-widest text-neutral-400 hover:text-white border border-white/10 hover:border-white/20 transition-all"
              title="Activer le son d’ambiance haptique"
            >
              {soundActive ? (
                <>
                  <Volume2 className="w-3.5 h-3.5 text-[#FF1E1E] animate-pulse" />
                  <span className="text-[#FF1E1E]">SON ON</span>
                </>
              ) : (
                <>
                  <VolumeX className="w-3.5 h-3.5" />
                  <span>SON OFF</span>
                </>
              )}
            </button>

            <button
              onClick={() => {
                soundEngine.playClick();
                onOpenBrief();
              }}
              className="relative group overflow-hidden px-4 py-2 text-xs font-mono font-bold uppercase tracking-wider text-black bg-white hover:bg-[#FF1E1E] hover:text-white transition-all duration-300 flex items-center gap-1.5 whitespace-nowrap shrink-0"
              onMouseEnter={() => soundEngine.playHover()}
            >
              <span>Lancer un projet</span>
              <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-neutral-300 hover:text-white border border-white/10"
              aria-label="Menu"
            >
              {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-30 bg-[#080808]/98 backdrop-blur-xl pt-24 px-8 pb-10 flex flex-col justify-between md:hidden animate-in fade-in duration-200">
          <div className="flex flex-col gap-6">
            <span className="text-[11px] font-mono text-[#8E8E93] uppercase tracking-widest">Navigation // Index</span>
            {navLinks.map((link, idx) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => {
                  soundEngine.playClick();
                  setMobileMenuOpen(false);
                }}
                className="text-2xl font-display font-bold text-white hover:text-[#FF1E1E] transition-colors flex items-center justify-between border-b border-white/10 pb-4"
              >
                <span>{link.label}</span>
                <span className="text-xs font-mono text-[#FF1E1E]">0{idx + 1}</span>
              </a>
            ))}
          </div>

          <div className="pt-6 border-t border-white/10 flex flex-col gap-4">
            <button
              onClick={() => {
                handleSoundToggle();
              }}
              className="flex items-center justify-between py-2 text-xs font-mono text-neutral-400"
            >
              <span>Son interactif :</span>
              <span className={soundActive ? 'text-[#FF1E1E]' : ''}>{soundActive ? 'ACTIF' : 'MUTÉ'}</span>
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenBrief();
              }}
              className="w-full py-3 bg-[#FF1E1E] text-white font-mono text-xs font-bold uppercase tracking-wider text-center"
            >
              Lancer un brief studio
            </button>
          </div>
        </div>
      )}
    </>
  );
};
