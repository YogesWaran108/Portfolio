export interface Project {
  id: string;
  title: string;
  subtitle: string;
  category: 'UI/UX & Animation' | '3D & eCommerce' | 'Enterprise B2B' | 'Creative WebGL';
  year: string;
  client: string;
  role: string;
  image: string;
  featuredImage: string;
  secondaryImage?: string;
  description: string;
  fullDescription: string;
  challenge: string;
  solution: string;
  deliverables: string[];
  techStack: string[];
  metrics: { label: string; value: string }[];
  liveUrl?: string;
  githubUrl?: string;
  videoUrl?: string;
}

export interface Service {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  description: string;
  deliverables: string[];
  iconName: string;
  highlights: string[];
}

export interface TechItem {
  name: string;
  category: 'Frontend' | 'Animation & 3D' | 'Backend & DB' | 'Architecture & Tools';
  level: number; // percentage
  experience: string;
  icon: string;
  description: string;
}

export interface Metric {
  label: string;
  value: number;
  suffix: string;
  subtext: string;
}
