import React, { useState } from 'react';
import { CustomCursor } from './components/CustomCursor';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { MarqueeBanner } from './components/MarqueeBanner';
import { ProjectShowcase } from './components/ProjectShowcase';
import { ProjectModal } from './components/ProjectModal';
import { StudioManifesto } from './components/StudioManifesto';
import { ServicesEstimator } from './components/ServicesEstimator';
import { ClubPass } from './components/ClubPass';
import { ContactSection } from './components/ContactSection';
import { BriefModal } from './components/BriefModal';
import { Footer } from './components/Footer';
import { PROJECTS, STUDIO_SERVICES } from './data/projects';
import { Project } from './types';

export default function App() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isBriefOpen, setIsBriefOpen] = useState(false);
  const [briefDiscipline, setBriefDiscipline] = useState<string>('');
  const [selectedModules, setSelectedModules] = useState<string[]>([]);

  // Open Project Modal
  const handleOpenProject = (project: Project) => {
    setSelectedProject(project);
  };

  // Close Project Modal
  const handleCloseProject = () => {
    setSelectedProject(null);
  };

  // Navigate to Next Project
  const handleNextProject = () => {
    if (!selectedProject) return;
    const currentIndex = PROJECTS.findIndex((p) => p.id === selectedProject.id);
    const nextIndex = (currentIndex + 1) % PROJECTS.length;
    setSelectedProject(PROJECTS[nextIndex]);
  };

  // Navigate to Previous Project
  const handlePrevProject = () => {
    if (!selectedProject) return;
    const currentIndex = PROJECTS.findIndex((p) => p.id === selectedProject.id);
    const prevIndex = (currentIndex - 1 + PROJECTS.length) % PROJECTS.length;
    setSelectedProject(PROJECTS[prevIndex]);
  };

  // Open Brief with prefilled discipline
  const handleStartSimilarBrief = (discipline: string) => {
    setBriefDiscipline(discipline);
    setIsBriefOpen(true);
  };

  // Open Brief from Services Estimator
  const handleApplyScopeToBrief = (modules: string[]) => {
    setSelectedModules(modules);
    setIsBriefOpen(true);
  };

  // Smooth scroll to projects
  const handleExploreProjects = () => {
    const el = document.getElementById('projets');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#080808] text-white selection:bg-[#FF1E1E] selection:text-white">
      {/* Custom Fluid Cursor */}
      <CustomCursor />

      {/* Top Bar Contract Navbar */}
      <Navbar onOpenBrief={() => setIsBriefOpen(true)} />

      {/* Main Content */}
      <main>
        {/* Split-Screen Hero */}
        <Hero
          onOpenBrief={() => setIsBriefOpen(true)}
          onExploreProjects={handleExploreProjects}
        />

        {/* Animated Marquee Ribbon */}
        <MarqueeBanner />

        {/* Project Showcase (List with Floating Cursor Preview & Bento Grid) */}
        <ProjectShowcase
          projects={PROJECTS}
          onSelectProject={handleOpenProject}
        />

        {/* Studio Manifesto & 3 Pillars */}
        <StudioManifesto />

        {/* Interactive Services & Scope Estimator */}
        <ServicesEstimator
          services={STUDIO_SERVICES}
          onApplyScopeToBrief={handleApplyScopeToBrief}
        />

        {/* Neoclub Pass 3D Tilt Card */}
        <ClubPass />

        {/* Contact & Studio Brief Section */}
        <ContactSection initialDiscipline={briefDiscipline} />
      </main>

      {/* Clean Studio Footer */}
      <Footer />

      {/* Project Case Study Fullscreen Lightbox Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={handleCloseProject}
        onNext={handleNextProject}
        onPrev={handlePrevProject}
        onStartSimilarBrief={handleStartSimilarBrief}
      />

      {/* Interactive Project Brief Configurator Modal */}
      <BriefModal
        isOpen={isBriefOpen}
        onClose={() => setIsBriefOpen(false)}
        preselectedDiscipline={briefDiscipline}
        preselectedModules={selectedModules}
      />
    </div>
  );
}
