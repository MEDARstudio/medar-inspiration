import React, { useState, useRef, useEffect } from 'react';
import { LayoutGrid, List, ArrowUpRight, Sparkles } from 'lucide-react';
import { Project } from '../types';
import { ProjectVisual } from './ProjectVisual';
import { soundEngine } from '../utils/audio';

interface ProjectShowcaseProps {
  projects: Project[];
  onSelectProject: (project: Project) => void;
}

export const ProjectShowcase: React.FC<ProjectShowcaseProps> = ({
  projects,
  onSelectProject,
}) => {
  const [viewMode, setViewMode] = useState<'index' | 'grid'>('index');
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [hoveredProjectId, setHoveredProjectId] = useState<string | null>(null);
  
  // Floating preview coordinates
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [smoothPos, setSmoothPos] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  const categories = [
    { id: 'all', label: 'Toutes les Œuvres' },
    { id: 'DA & Branding', label: 'DA & Branding' },
    { id: 'Digital Experience', label: 'Expérience Web' },
    { id: '3D & Motion', label: '3D & Motion' },
    { id: 'Spatial & Sonore', label: 'Spatial & Sonore' },
  ];

  const filteredProjects = activeCategory === 'all'
    ? projects
    : projects.filter((p) => p.discipline === activeCategory);

  // Smooth floating preview movement
  useEffect(() => {
    let animationFrameId: number;
    const updateSmoothPos = () => {
      setSmoothPos((prev) => ({
        x: prev.x + (cursorPos.x - prev.x) * 0.14,
        y: prev.y + (cursorPos.y - prev.y) * 0.14,
      }));
      animationFrameId = requestAnimationFrame(updateSmoothPos);
    };
    animationFrameId = requestAnimationFrame(updateSmoothPos);
    return () => cancelAnimationFrame(animationFrameId);
  }, [cursorPos]);

  const handleContainerMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setCursorPos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const hoveredProject = projects.find((p) => p.id === hoveredProjectId);

  return (
    <section id="projets" className="py-24 md:py-32 relative bg-[#080808]" ref={containerRef} onMouseMove={handleContainerMouseMove}>
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 pb-10 border-b border-[#222222]">
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-xs font-mono text-[#FF1E1E] uppercase tracking-widest">
              <span>02. SÉLECTION D’ŒUVRES</span>
              <span aria-hidden="true">·</span>
              <span className="text-neutral-500">2024 — 2026</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-extrabold uppercase tracking-tight text-white">
              Catalogue <span className="text-[#FF1E1E]">Atelier</span>
            </h2>
          </div>

          {/* Controls: Category Filter + View Mode Toggle */}
          <div className="flex flex-wrap items-center gap-4">
            {/* Functional Category Filter Tabs */}
            <div className="flex items-center gap-1 p-1 bg-[#121212] border border-[#222222] rounded-lg">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => {
                    soundEngine.playClick();
                    setActiveCategory(cat.id);
                  }}
                  onMouseEnter={() => soundEngine.playHover()}
                  className={`px-3 py-1.5 text-xs font-mono uppercase tracking-wider transition-all whitespace-nowrap shrink-0 rounded ${
                    activeCategory === cat.id
                      ? 'bg-white text-black font-bold shadow-sm'
                      : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* View Mode Switcher */}
            <div className="flex items-center gap-1 p-1 bg-[#121212] border border-[#222222] rounded-lg">
              <button
                onClick={() => {
                  soundEngine.playClick();
                  setViewMode('index');
                }}
                onMouseEnter={() => soundEngine.playHover()}
                className={`p-1.5 rounded transition-colors ${
                  viewMode === 'index' ? 'bg-white text-black' : 'text-neutral-400 hover:text-white'
                }`}
                title="Vue Liste Index"
              >
                <List className="w-4 h-4" />
              </button>
              <button
                onClick={() => {
                  soundEngine.playClick();
                  setViewMode('grid');
                }}
                onMouseEnter={() => soundEngine.playHover()}
                className={`p-1.5 rounded transition-colors ${
                  viewMode === 'grid' ? 'bg-white text-black' : 'text-neutral-400 hover:text-white'
                }`}
                title="Vue Grille Bento"
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* View Mode: INDEX (Interactive List with Floating Cursor Preview) */}
        {viewMode === 'index' && (
          <div className="relative mt-4">
            {/* Floating Image Preview Canvas following cursor */}
            {hoveredProject && (
              <div
                className="hidden lg:block pointer-events-none absolute z-30 w-80 h-56 rounded-lg overflow-hidden border-2 border-[#FF1E1E] shadow-2xl shadow-red-950/60 transition-opacity duration-200"
                style={{
                  top: `${smoothPos.y - 110}px`,
                  left: `${smoothPos.x + 40}px`,
                  opacity: hoveredProjectId ? 1 : 0,
                }}
              >
                <ProjectVisual type={hoveredProject.visualType} isHovered={true} />
                <div className="absolute bottom-2 left-3 right-3 flex items-center justify-between text-[10px] font-mono bg-black/80 backdrop-blur-md px-2 py-1 rounded border border-white/10">
                  <span className="text-white font-bold">{hoveredProject.client}</span>
                  <span className="text-[#FF1E1E]">{hoveredProject.year}</span>
                </div>
              </div>
            )}

            {/* Project Rows */}
            <div className="divide-y divide-[#222222]">
              {filteredProjects.map((project) => {
                const isHovered = hoveredProjectId === project.id;
                return (
                  <div
                    key={project.id}
                    onMouseEnter={() => {
                      setHoveredProjectId(project.id);
                      soundEngine.playHover();
                    }}
                    onMouseLeave={() => setHoveredProjectId(null)}
                    onClick={() => {
                      soundEngine.playClick();
                      onSelectProject(project);
                    }}
                    data-cursor-text="EXPLORER"
                    className="group relative py-8 sm:py-10 flex flex-col md:flex-row md:items-center justify-between gap-6 cursor-pointer transition-colors duration-200 hover:bg-[#0F0F0F] px-4 -mx-4"
                  >
                    {/* Left: Number + Title */}
                    <div className="flex items-start md:items-center gap-6 md:gap-10">
                      <span className="text-sm md:text-base font-mono text-[#8E8E93] group-hover:text-[#FF1E1E] transition-colors tabular-nums">
                        {project.number}
                      </span>

                      <div>
                        <h3 className="text-2xl sm:text-3xl md:text-4xl font-display font-extrabold uppercase tracking-tight text-white group-hover:text-[#FF1E1E] transition-colors flex items-center gap-3">
                          <span>{project.title}</span>
                          <ArrowUpRight className="w-5 h-5 opacity-0 -translate-x-2 translate-y-2 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 transition-all text-[#FF1E1E]" />
                        </h3>
                        <p className="text-xs sm:text-sm text-[#A1A1AA] line-clamp-1 mt-1 max-w-lg font-sans">
                          {project.description}
                        </p>
                      </div>
                    </div>

                    {/* Right: Metadata without pills */}
                    <div className="flex flex-wrap items-center gap-4 sm:gap-8 text-xs font-mono text-[#8E8E93]">
                      <div className="flex items-center gap-2">
                        <span className="text-white group-hover:text-[#FF1E1E] transition-colors">{project.category}</span>
                        <span aria-hidden="true">·</span>
                        <span>{project.year}</span>
                      </div>

                      <div className="hidden xl:flex items-center gap-2 text-neutral-400">
                        <span>{project.client}</span>
                      </div>

                      <span className="text-xs uppercase tracking-wider text-white border border-white/20 group-hover:border-[#FF1E1E] group-hover:bg-[#FF1E1E] group-hover:text-white px-3 py-1.5 transition-all">
                        Cas d’étude
                      </span>
                    </div>

                    {/* Left red accent indicator on hover */}
                    <div
                      className={`absolute top-0 bottom-0 left-0 w-1 bg-[#FF1E1E] transition-all duration-300 ${
                        isHovered ? 'opacity-100 h-full' : 'opacity-0 h-0'
                      }`}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* View Mode: BENTO GRID (3D Cards) */}
        {viewMode === 'grid' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">
            {filteredProjects.map((project, idx) => (
              <div
                key={project.id}
                onClick={() => {
                  soundEngine.playClick();
                  onSelectProject(project);
                }}
                onMouseEnter={() => soundEngine.playHover()}
                data-cursor-text="OUVRIR"
                className="group relative bg-[#0E0E0E] border border-[#222222] rounded-xl overflow-hidden cursor-pointer hover:border-[#FF1E1E]/60 transition-all duration-500 flex flex-col justify-between"
              >
                {/* Visual Header */}
                <div className="relative aspect-[4/3] w-full overflow-hidden border-b border-[#222222]">
                  <ProjectVisual type={project.visualType} isHovered={true} />
                  
                  {/* Overlay tags unboxed */}
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between text-[11px] font-mono text-white/90">
                    <span className="bg-black/60 backdrop-blur-md px-2 py-0.5 rounded border border-white/10">{project.number}</span>
                    <span className="bg-black/60 backdrop-blur-md px-2 py-0.5 rounded border border-white/10 text-[#FF1E1E] font-bold">{project.year}</span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col justify-between flex-grow">
                  <div>
                    <div className="text-xs font-mono text-[#8E8E93] mb-1">
                      <span>{project.client}</span>
                    </div>
                    <h3 className="text-xl font-display font-extrabold uppercase text-white group-hover:text-[#FF1E1E] transition-colors flex items-center justify-between">
                      <span>{project.title}</span>
                      <ArrowUpRight className="w-4 h-4 text-[#FF1E1E] transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                    </h3>
                    <p className="text-xs text-[#A1A1AA] line-clamp-2 mt-2 leading-relaxed">
                      {project.description}
                    </p>
                  </div>

                  {/* Clean unboxed footer metadata */}
                  <div className="pt-4 mt-4 border-t border-white/5 flex items-center justify-between text-xs font-mono text-neutral-400">
                    <span>{project.category}</span>
                    <span className="text-[#FF1E1E] group-hover:translate-x-1 transition-transform font-bold">Détails →</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
