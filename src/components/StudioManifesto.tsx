import React, { useState } from 'react';
import { Eye, Flame, Compass, Zap } from 'lucide-react';
import { soundEngine } from '../utils/audio';

export const StudioManifesto: React.FC = () => {
  const [activePillar, setActivePillar] = useState<number>(0);

  const pillars = [
    {
      number: '01',
      title: 'Le Minimalisme Absolu',
      icon: Eye,
      summary: 'Éliminer le décoratif pour exalter la puissance du vide et de la typographie.',
      detail: 'Dans un paysage numérique saturé de gradients artificiels et de cartes arrondies génériques, nous revendiquons la discipline du design suisse et du constructivisme : une grille au pixel près, des marges généreuses et un impact immédiat.',
    },
    {
      number: '02',
      title: 'La Tension Noir / Blanc / Rouge',
      icon: Flame,
      summary: 'Un spectre chromatique réduit à son intensité la plus haute.',
      detail: 'Le noir profond (#080808) pour l’obscurité du clubbing, le blanc pur (#FFFFFF) pour la lisibilité architecturale, et le rouge vermillon (#FF1E1E) pour focaliser le regard sur l’essentiel. Chaque touche de couleur est un acte d’intention.',
    },
    {
      number: '03',
      title: 'L’Interaction Haptique & 60 FPS',
      icon: Zap,
      summary: 'Des transitions sans saccade où chaque survol procure une émotion tactile.',
      detail: 'Le web moderne doit être vivant sans être bruyant. Nos interfaces réagissent au micromètre : amortis physiques, prévisualisations magnétiques et micro-sonorités procédurales pour une expérience mémorable.',
    },
  ];

  return (
    <section id="manifesto" className="py-24 md:py-32 bg-[#0A0A0A] border-b border-[#222222] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="space-y-4 max-w-2xl mb-16">
          <div className="flex items-center gap-2 text-xs font-mono text-[#FF1E1E] uppercase tracking-widest">
            <span>03. PHILOSOPHIE & ÉTHOS</span>
            <span aria-hidden="true">·</span>
            <span className="text-neutral-500">PARIS</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-display font-extrabold uppercase text-white tracking-tight leading-tight">
            Pourquoi <span className="text-[#FF1E1E]">Medar</span> Remix <span className="text-white">Neoclub</span> ?
          </h2>

          <p className="text-base text-[#A1A1AA] leading-relaxed font-sans pt-2">
            Neoclub.fr a redéfini le clubbing culturel. Avec Medar Studio, nous poussons cette vision vers une épure graphique intransigeante : une fusion entre haute culture underground et technologies web d’avant-garde.
          </p>
        </div>

        {/* Big Interactive Editorial Manifesto Block */}
        <div className="p-8 sm:p-12 md:p-16 rounded-2xl bg-[#0F0F0F] border border-[#222222] relative mb-16">
          <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-display font-bold leading-relaxed text-[#71717A] tracking-tight">
            « Nous refusons le consensuel. Nous concevons pour les marques qui souhaitent{' '}
            <span className="text-white hover:text-[#FF1E1E] transition-colors cursor-default">
              dominer l’espace visuel
            </span>
            , faire battre le pouls de leur communauté et transformer chaque clic en une{' '}
            <span className="text-[#FF1E1E] underline decoration-1 underline-offset-8">
              scénographie inoubliable
            </span>
            . »
          </p>
          <div className="mt-8 flex items-center justify-between text-xs font-mono text-[#8E8E93]">
            <span>MEDAR ATELIER // PAROLES DE FONDATEURS</span>
            <span className="text-white">EDITION 2026</span>
          </div>
        </div>

        {/* 3 Pillars Grid with interactive hover focus */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pillars.map((pillar, idx) => {
            const IconComponent = pillar.icon;
            const isSelected = activePillar === idx;

            return (
              <div
                key={pillar.number}
                onMouseEnter={() => {
                  setActivePillar(idx);
                  soundEngine.playHover();
                }}
                onClick={() => {
                  setActivePillar(idx);
                  soundEngine.playClick();
                }}
                className={`p-8 rounded-xl border transition-all duration-300 cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? 'bg-[#121212] border-[#FF1E1E] shadow-lg shadow-red-950/20'
                    : 'bg-[#0D0D0D] border-[#222222] hover:border-white/30'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-8">
                    <span className="text-xs font-mono text-[#FF1E1E] tabular-nums font-bold">
                      {pillar.number}
                    </span>
                    <IconComponent className={`w-5 h-5 ${isSelected ? 'text-[#FF1E1E]' : 'text-neutral-500'}`} />
                  </div>

                  <h3 className="text-xl font-display font-bold text-white uppercase tracking-tight mb-3">
                    {pillar.title}
                  </h3>

                  <p className="text-xs font-mono text-neutral-300 mb-4 font-semibold">
                    {pillar.summary}
                  </p>

                  <p className="text-xs text-[#8E8E93] leading-relaxed font-sans">
                    {pillar.detail}
                  </p>
                </div>

                <div className="mt-8 pt-4 border-t border-white/5 flex items-center justify-between text-[11px] font-mono">
                  <span className={isSelected ? 'text-[#FF1E1E]' : 'text-neutral-500'}>
                    PILIER DE CONCEPTION
                  </span>
                  <span className="text-neutral-400">0{idx + 1} / 03</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
