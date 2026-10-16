export interface ProjectMetric {
  label: string;
  value: string;
}

export interface Project {
  id: string;
  number: string;
  title: string;
  client: string;
  category: string;
  discipline: 'DA & Branding' | '3D & Motion' | 'Digital Experience' | 'Spatial & Sonore';
  year: string;
  description: string;
  fullCaseStudy: {
    context: string;
    concept: string;
    execution: string;
    results: string;
  };
  metrics: ProjectMetric[];
  deliverables: string[];
  techStack: string[];
  accentColor: string;
  featured: boolean;
  visualType: 'kinetic' | 'editorial' | 'sound' | 'pavilion' | 'monolith' | 'protocol';
}

export interface ServiceItem {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  description: string;
  deliverables: string[];
  timeline: string;
  baseBudget: string;
}

export interface ClubPerk {
  title: string;
  detail: string;
  code: string;
}
