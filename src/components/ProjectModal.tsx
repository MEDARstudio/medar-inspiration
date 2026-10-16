import React, { useEffect } from 'react';
import { X, ArrowLeft, ArrowRight, CheckCircle2, Layers, Cpu, Calendar, Building2 } from 'lucide-react';
import { Project } from '../types';
import { ProjectVisual } from './ProjectVisual';
import { soundEngine } from '../utils/audio';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
  onStartSimilarBrief: (discipline: string) => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({
  project,
  onClose,
  onNext,
  onPrev,
  onStartSimilarBrief,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') onNext();
      if (e.key === 'ArrowLeft') onPrev();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose, onNext, onPrev]);

  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/90 backdrop-blur-xl flex justify-center p-0 md:p-6 lg:p-10 animate-in fade-in duration-300">
      {/* Backdrop click */}
      <div className="fixed inset-0" onClick={onClose} />

      {/* Modal Container */}
      <div className="relative w-full max-w-5xl bg-[#0C0C0C] border border-[#262626] rounded-none md:rounded-2xl shadow-2xl overflow-hidden my-auto z-10 flex flex-col">
        {/* Top Header Bar */}
        <div className="px-6 py-4 border-b border-[#222222] flex items-center justify-between bg-[#111111]/80 backdrop-blur-md sticky top-0 z-20">
          <div className="flex items-center gap-3 text-xs font-mono text-neutral-400">
            <span className="text-[#FF1E1E] font-bold">CAS D’ÉTUDE // {project.number}</span>
            <span aria-hidden="true">·</span>
            <span className="text-white font-medium">{project.client}</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                soundEngine.playClick();
                onPrev();
              }}
              className="p-2 text-neutral-400 hover:text-white border border-white/10 rounded hover:border-white/20 transition-colors"
              title="Projet précédent (←)"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>

            <button
              onClick={() => {
                soundEngine.playClick();
                onNext();
              }}
              className="p-2 text-neutral-400 hover:text-white border border-white/10 rounded hover:border-white/20 transition-colors"
              title="Projet suivant (→)"
            >
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => {
                soundEngine.playClick();
                onClose();
              }}
              className="p-2 text-neutral-400 hover:text-white border border-[#FF1E1E]/40 hover:bg-[#FF1E1E] hover:text-white rounded transition-all ml-2"
              title="Fermer (Échap)"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Hero Visual Area */}
        <div className="relative aspect-[16/9] sm:aspect-[21/9] w-full border-b border-[#222222] bg-[#070707] overflow-hidden">
          <ProjectVisual type={project.visualType} isHovered={true} />
          
          <div className="absolute bottom-6 left-6 right-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4 pointer-events-none">
            <div className="space-y-1">
              <span className="text-xs font-mono text-[#FF1E1E] uppercase tracking-widest bg-black/80 px-2 py-0.5 rounded border border-white/10 inline-block">
                {project.category}
              </span>
              <h2 className="text-3xl sm:text-5xl font-display font-extrabold text-white uppercase tracking-tight">
                {project.title}
              </h2>
            </div>
            
            <div className="text-xs font-mono text-neutral-300 bg-black/80 backdrop-blur-md px-3 py-1.5 rounded border border-white/10">
              Année : {project.year}
            </div>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-10 space-y-12">
          {/* Key Metrics Banner */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 p-6 rounded-xl bg-[#141414] border border-[#222222]">
            {project.metrics.map((metric, i) => (
              <div key={i} className="space-y-1">
                <span className="text-xs font-mono text-[#8E8E93] uppercase">{metric.label}</span>
                <div className="text-2xl sm:text-3xl font-display font-bold text-white tabular-nums">
                  {metric.value}
                </div>
              </div>
            ))}
          </div>

          {/* Narrative Breakdown */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="space-y-6">
              <div>
                <h4 className="text-xs font-mono text-[#FF1E1E] uppercase tracking-wider mb-2">01. Contexte & Défi</h4>
                <p className="text-sm sm:text-base text-neutral-300 leading-relaxed font-sans">
                  {project.fullCaseStudy.context}
                </p>
              </div>

              <div>
                <h4 className="text-xs font-mono text-[#FF1E1E] uppercase tracking-wider mb-2">02. Concept & Direction</h4>
                <p className="text-sm sm:text-base text-neutral-300 leading-relaxed font-sans">
                  {project.fullCaseStudy.concept}
                </p>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <h4 className="text-xs font-mono text-[#FF1E1E] uppercase tracking-wider mb-2">03. Déploiement & Tech</h4>
                <p className="text-sm sm:text-base text-neutral-300 leading-relaxed font-sans">
                  {project.fullCaseStudy.execution}
                </p>
              </div>

              <div>
                <h4 className="text-xs font-mono text-[#FF1E1E] uppercase tracking-wider mb-2">04. Impact & Résultats</h4>
                <p className="text-sm sm:text-base text-neutral-300 leading-relaxed font-sans">
                  {project.fullCaseStudy.results}
                </p>
              </div>
            </div>
          </div>

          {/* Deliverables & Stack */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-8 border-t border-[#222222]">
            <div>
              <h4 className="text-xs font-mono text-neutral-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                <Layers className="w-4 h-4 text-[#FF1E1E]" />
                <span>Livrables Clés</span>
              </h4>
              <ul className="space-y-2">
                {project.deliverables.map((item, i) => (
                  <li key={i} className="text-xs sm:text-sm text-neutral-300 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#FF1E1E]" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-xs font-mono text-neutral-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                <Cpu className="w-4 h-4 text-[#FF1E1E]" />
                <span>Technologies & Outils</span>
              </h4>
              <div className="flex flex-wrap gap-2">
                {project.techStack.map((tech, i) => (
                  <span
                    key={i}
                    className="text-xs font-mono text-neutral-300 bg-[#161616] px-3 py-1 rounded border border-[#2A2A2A]"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom Action */}
          <div className="pt-8 border-t border-[#222222] flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-xs font-mono text-[#8E8E93]">
              Projet vérifié par Medar Studio × Neoclub Paris
            </div>

            <button
              onClick={() => {
                soundEngine.playClick();
                onClose();
                onStartSimilarBrief(project.discipline);
              }}
              className="w-full sm:w-auto px-6 py-3 bg-[#FF1E1E] hover:bg-[#E01010] text-white font-mono text-xs font-bold uppercase tracking-wider transition-colors rounded"
            >
              Initier un projet similaire →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
