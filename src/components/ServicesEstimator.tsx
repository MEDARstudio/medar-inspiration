import React, { useState } from 'react';
import { Check, Plus, Minus, Calculator, ArrowRight, Clock, Sparkles } from 'lucide-react';
import { ServiceItem } from '../types';
import { soundEngine } from '../utils/audio';

interface ServicesEstimatorProps {
  services: ServiceItem[];
  onApplyScopeToBrief: (selectedServiceIds: string[]) => void;
}

export const ServicesEstimator: React.FC<ServicesEstimatorProps> = ({
  services,
  onApplyScopeToBrief,
}) => {
  const [selectedIds, setSelectedIds] = useState<string[]>(['direction-artistique', 'digital-experience']);
  const [projectSpeed, setProjectSpeed] = useState<'standard' | 'express'>('standard');

  const toggleService = (id: string) => {
    soundEngine.playClick();
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // Calculate live scope numbers
  const baseBudgetMap: Record<string, number> = {
    'direction-artistique': 8500,
    'digital-experience': 12000,
    'motion-3d': 6000,
    'club-lab': 5500,
  };

  const totalBase = selectedIds.reduce((sum, id) => sum + (baseBudgetMap[id] || 0), 0);
  const adjustedTotal = projectSpeed === 'express' ? Math.round(totalBase * 1.25) : totalBase;
  const estimatedWeeks = Math.max(3, selectedIds.length * 2);

  return (
    <section id="services" className="py-24 md:py-32 bg-[#080808] border-b border-[#222222]">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 pb-12 border-b border-[#222222]">
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-xs font-mono text-[#FF1E1E] uppercase tracking-widest">
              <span>04. SERVICES & CONFIGURATEUR</span>
              <span aria-hidden="true">·</span>
              <span className="text-neutral-500">SUR MESURE</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-display font-extrabold uppercase text-white tracking-tight">
              Expertises <span className="text-[#FF1E1E]">Atelier</span>
            </h2>
          </div>

          <p className="text-xs sm:text-sm text-[#A1A1AA] max-w-md font-sans leading-relaxed">
            Configurez vos modules créatifs ci-dessous pour simuler votre périmètre et initier un devis précis sans perte de temps.
          </p>
        </div>

        {/* Services Grid with Interactive Selection */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mt-12">
          {/* Services Cards List (8 Cols) */}
          <div className="lg:col-span-8 space-y-6">
            {services.map((service) => {
              const isSelected = selectedIds.includes(service.id);
              return (
                <div
                  key={service.id}
                  onClick={() => toggleService(service.id)}
                  onMouseEnter={() => soundEngine.playHover()}
                  className={`p-6 sm:p-8 rounded-xl border transition-all duration-300 cursor-pointer ${
                    isSelected
                      ? 'bg-[#121212] border-[#FF1E1E] shadow-md shadow-red-950/20'
                      : 'bg-[#0E0E0E] border-[#222222] hover:border-white/30'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/5">
                    <div className="flex items-center gap-4">
                      <span className="text-xs font-mono text-[#FF1E1E] font-bold">
                        {service.number}
                      </span>
                      <h3 className="text-xl sm:text-2xl font-display font-bold text-white uppercase tracking-tight">
                        {service.title}
                      </h3>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="text-xs font-mono text-neutral-400">
                        Dès {service.baseBudget}
                      </span>
                      <div
                        className={`w-6 h-6 rounded flex items-center justify-center border transition-colors ${
                          isSelected
                            ? 'bg-[#FF1E1E] border-[#FF1E1E] text-white'
                            : 'border-white/20 text-transparent'
                        }`}
                      >
                        <Check className="w-3.5 h-3.5" />
                      </div>
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-[#A1A1AA] font-sans my-4 leading-relaxed">
                    {service.description}
                  </p>

                  {/* Deliverables tags */}
                  <div className="flex flex-wrap gap-2 pt-2">
                    {service.deliverables.map((deliv, i) => (
                      <span
                        key={i}
                        className="text-[11px] font-mono text-neutral-300 bg-[#181818] px-2.5 py-1 rounded border border-white/5"
                      >
                        {deliv}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Live Estimator Floating Box (4 Cols) */}
          <div className="lg:col-span-4">
            <div className="sticky top-28 bg-[#111111] border border-[#262626] rounded-xl p-6 sm:p-8 space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-white/10">
                <div className="flex items-center gap-2 text-xs font-mono text-white font-bold uppercase tracking-wider">
                  <Calculator className="w-4 h-4 text-[#FF1E1E]" />
                  <span>Calculateur de Projet</span>
                </div>
                <span className="text-[10px] font-mono text-[#FF1E1E]">TEMPS RÉEL</span>
              </div>

              {/* Modules selected */}
              <div>
                <span className="text-xs font-mono text-[#8E8E93] uppercase block mb-2">
                  Modules sélectionnés ({selectedIds.length})
                </span>
                {selectedIds.length === 0 ? (
                  <p className="text-xs text-neutral-500 italic">Sélectionnez au moins un module à gauche.</p>
                ) : (
                  <ul className="space-y-1.5">
                    {selectedIds.map((id) => {
                      const item = services.find((s) => s.id === id);
                      if (!item) return null;
                      return (
                        <li key={id} className="text-xs font-mono text-white flex items-center justify-between">
                          <span className="truncate max-w-[180px]">{item.title}</span>
                          <span className="text-[#FF1E1E] tabular-nums">{item.baseBudget}</span>
                        </li>
                      );
                    })}
                  </ul>
                )}
              </div>

              {/* Delivery Speed Selector */}
              <div className="pt-4 border-t border-white/5">
                <span className="text-xs font-mono text-[#8E8E93] uppercase block mb-2">
                  Rythme de Production
                </span>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => {
                      soundEngine.playClick();
                      setProjectSpeed('standard');
                    }}
                    className={`py-2 px-3 text-xs font-mono uppercase tracking-wider rounded border transition-all ${
                      projectSpeed === 'standard'
                        ? 'bg-white text-black font-bold border-white'
                        : 'border-[#262626] text-neutral-400 hover:text-white'
                    }`}
                  >
                    Standard
                  </button>
                  <button
                    onClick={() => {
                      soundEngine.playClick();
                      setProjectSpeed('express');
                    }}
                    className={`py-2 px-3 text-xs font-mono uppercase tracking-wider rounded border transition-all ${
                      projectSpeed === 'express'
                        ? 'bg-[#FF1E1E] text-white font-bold border-[#FF1E1E]'
                        : 'border-[#262626] text-neutral-400 hover:text-white'
                    }`}
                  >
                    Express (+25%)
                  </button>
                </div>
              </div>

              {/* Total & Timeline Preview */}
              <div className="pt-4 border-t border-white/10 space-y-3">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-neutral-400 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-[#FF1E1E]" />
                    <span>Délai estimé :</span>
                  </span>
                  <span className="text-white font-bold">{estimatedWeeks} semaines</span>
                </div>

                <div className="flex items-baseline justify-between pt-2">
                  <span className="text-xs font-mono text-neutral-300 uppercase">Budget Indicatif</span>
                  <span className="text-2xl sm:text-3xl font-display font-extrabold text-white tabular-nums">
                    {adjustedTotal.toLocaleString('fr-FR')} € <span className="text-xs text-[#FF1E1E] font-mono">HT</span>
                  </span>
                </div>
              </div>

              {/* Apply Scope Button */}
              <button
                disabled={selectedIds.length === 0}
                onClick={() => {
                  soundEngine.playConfirm();
                  onApplyScopeToBrief(selectedIds);
                }}
                className="w-full py-3.5 bg-[#FF1E1E] hover:bg-[#E01010] disabled:bg-neutral-800 disabled:text-neutral-600 text-white font-mono text-xs font-bold uppercase tracking-wider transition-colors flex items-center justify-center gap-2 rounded"
              >
                <span>Transférer vers le brief</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
