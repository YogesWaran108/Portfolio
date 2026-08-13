import { Project, Service, TechItem, Metric } from '../types';

export interface WorkExperience {
  company: string;
  role: string;
  period: string;
  location: string;
  highlights: string[];
}

export interface Education {
  institution: string;
  degree: string;
  cgpa: string;
}

// -------------------------------------------------------------
// CENTRALIZED SITE & PROJECT URL CONFIGURATION
// (Edit any live demo or social profile link here in the future)
// -------------------------------------------------------------
export const PROJECT_URLS = {
  sculpxtech: 'https://www.sculpxtechlabs.com/',
  koredioGym: 'https://www.korediogym.com/',
  sawaraiyaHotel: 'https://sawariya.sculpxtechlabs.co.in/',
  sawaraiyaJewelry: 'https://jewellery.sculpxtechlabs.co.in/',
  learnersLeaf: 'https://learnersleaf.sculpxtechlabs.co.in/',
  githubProfile: 'https://github.com/YogesWaran108',
  linkedinProfile: 'https://www.linkedin.com/in/yogeshwaran-ravishankar-300414233/'
};

export const USER_INFO = {
  name: 'Yogeshwaran Ravishankar',
  title: 'Frontend Software Engineer',
  phone: '+91-6382755066',
  email: 'yogeshwar11012k02@gmail.com',
  location: 'Erode, Tamil Nadu, India',
  github: PROJECT_URLS.githubProfile,
  linkedin: PROJECT_URLS.linkedinProfile,
  aboutMe:
    'Frontend Software Engineer with 2.5+ years of experience designing and developing scalable web applications using React, Redux, and TypeScript. Skilled in designing scalable UI architectures, writing clean maintainable code, and collaborating cross-functionally to deliver features on time.',
  languages: ['Tamil (Native)', 'English (Professional)']
};

export const WORK_EXPERIENCE: WorkExperience[] = [
  {
    company: 'Sculpxtech Labs',
    role: 'Frontend Software Engineer',
    period: '2023 - Present',
    location: 'India',
    highlights: [
      'Architected high-throughput React & TypeScript frontend platforms for B2B enterprise clients.',
      'Optimized application bundle sizes and network request waterfalls, boosting Lighthouse scores by 35%.',
      'Engineered reusable UI components and collaborated cross-functionally to ensure timely feature delivery.'
    ]
  },
  {
    company: 'Accenture',
    role: 'Associate Frontend Engineer',
    period: '2021 - 2023',
    location: 'India',
    highlights: [
      'Developed responsive UI modules using React.js, Redux Toolkit, and Tailwind CSS.',
      'Collaborated with product managers, designers, and QA to deliver high-performance user interfaces.',
      'Implemented automated unit testing and code quality pipelines.'
    ]
  }
];

export const EDUCATION_DATA: Education = {
  institution: 'Kongu Engineering College',
  degree: 'B.Tech in Information Technology',
  cgpa: '7.66'
};

export const METRICS: Metric[] = [
  { label: 'Years Experience', value: 2.5, suffix: '+', subtext: 'React, Redux & TypeScript development' },
  { label: 'Enterprise Projects', value: 5, suffix: '+', subtext: 'Production platforms & B2B suites' },
  { label: 'Lighthouse Score', value: 98, suffix: '%', subtext: 'Average performance optimization' },
  { label: 'B.Tech IT CGPA', value: 7.66, suffix: '', subtext: 'Kongu Engineering College' }
];

export const PROJECTS: Project[] = [
  {
    id: 'sculpxtech-b2b',
    title: 'Sculpxtech Product Platform & B2B Suite',
    subtitle: 'Enterprise UI Design System & Component Library',
    category: 'Enterprise B2B',
    year: '2026',
    client: 'Sculpxtech Labs',
    role: 'Front-End Developer',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1200&auto=format&fit=crop',
    featuredImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1400&auto=format&fit=crop',
    secondaryImage: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=1000&auto=format&fit=crop',
    description: 'Designed and developed enterprise UI components using React.js and Tailwind CSS, implementing reusable component libraries and optimizing page load performance.',
    fullDescription: 'Sculpxtech Product Platform & B2B Suite is an enterprise workstation engineered to streamline client operations and asset management. Built with React.js, Redux Toolkit, and Tailwind CSS, the platform delivers high-density data tables, modular UI widgets, type-safe API consumers, and strict coding compliance.',
    challenge: 'Architecting a standardized, reusable component system capable of servicing multiple enterprise client sub-apps without styling regressions or bundle bloat.',
    solution: 'Created a modular design system using React, TypeScript, and Tailwind CSS, with rigorous Redux state normalization and lazy-loaded routes for instant initial loads.',
    deliverables: [
      'Reusable React & Tailwind Component Library',
      'Redux State Management Architecture',
      'Page Load & Asset Bundle Optimization',
      'REST API Integration & Type Contracts'
    ],
    techStack: ['React.js', 'Redux', 'TypeScript', 'Tailwind CSS', 'RESTful APIs', 'Node.js'],
    metrics: [
      { label: 'Page Load Boost', value: '45% Faster' },
      { label: 'Component Reusability', value: '85%' },
      { label: 'Lighthouse Audit', value: '98/100' }
    ],
    liveUrl: PROJECT_URLS.sculpxtech,
    githubUrl: PROJECT_URLS.githubProfile
  },
  {
    id: 'koredio-gym',
    title: 'Koredio Gym SaaS Platform',
    subtitle: 'Multi-Tenant B2B Gym Management & E-Commerce Dashboard',
    category: 'Enterprise B2B',
    year: '2026',
    client: 'Koredio Fitness Tech',
    role: 'Lead Frontend Developer',
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1200&auto=format&fit=crop',
    featuredImage: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=1400&auto=format&fit=crop',
    secondaryImage: 'https://images.unsplash.com/photo-1540497077202-7c8a3999166f?q=80&w=1000&auto=format&fit=crop',
    description: 'Built a multi-tenant B2B SaaS dashboard with React.js and Tailwind CSS, including responsive admin panels, membership modules, and e-commerce integration.',
    fullDescription: 'Koredio Gym SaaS is a comprehensive management platform designed for fitness clubs and chains. It provides gym owners with real-time membership analytics, automated recurring billing interfaces, trainer scheduling, and an integrated e-commerce shop for supplement sales.',
    challenge: 'Managing complex state synchronization across multi-tenant admin dashboards, workout logs, member check-ins, and checkout carts.',
    solution: 'Implemented centralized Redux state slices with optimistic UI updates and responsive Tailwind CSS layout grids optimized for desktop workstations and mobile devices.',
    deliverables: [
      'Multi-Tenant Responsive Admin Panel',
      'Membership & Check-in Management Modules',
      'E-Commerce Storefront & Payment Gateway UI',
      'Member Analytics & Attendance Reports'
    ],
    techStack: ['React.js', 'Redux', 'TypeScript', 'Tailwind CSS', 'RESTful APIs', 'Git'],
    metrics: [
      { label: 'Member Onboarding Time', value: '-60%' },
      { label: 'Mobile Responsiveness', value: '100%' },
      { label: 'SaaS Active Gyms', value: '120+' }
    ],
    liveUrl: PROJECT_URLS.koredioGym,
    githubUrl: PROJECT_URLS.githubProfile
  },
  {
    id: 'sawaraiya-hotel',
    title: 'Sawaraiya Luxury Hotel Digital Experience',
    subtitle: 'Interactive High-End Hospitality Brand Website',
    category: 'UI/UX & Animation',
    year: '2025',
    client: 'Sawaraiya Hospitality Group',
    role: 'Interactive Experience Developer',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=1200&auto=format&fit=crop',
    featuredImage: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=1400&auto=format&fit=crop',
    secondaryImage: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=1000&auto=format&fit=crop',
    description: 'Created an interactive, high-end brand website with GSAP scroll animations, video integration, and fully responsive layouts.',
    fullDescription: 'Sawaraiya Hotel is a luxury resort experience that blends serene architecture with modern digital elegance. Built with React.js and GSAP ScrollTrigger, the website features scroll-synced video backgrounds, interactive suite tours, and fluid section reveals that evoke tranquility.',
    challenge: 'Achieving butter-smooth 60 FPS scroll performance while scrubbing high-definition video backgrounds and rendering animated typography overlays.',
    solution: 'Utilized hardware-accelerated GSAP timelines with debounced scroll triggers and adaptive media loading for pristine 60 FPS playback on all screen sizes.',
    deliverables: [
      'GSAP Scroll-Triggered Video Playback Engine',
      'Interactive Suite & Villa Tour Showcases',
      'Direct Reservation Request Modal',
      'Fully Responsive Cross-Device UI'
    ],
    techStack: ['React.js', 'GSAP ScrollTrigger', 'JavaScript', 'Tailwind CSS', 'Responsive Design'],
    metrics: [
      { label: 'Direct Inquiries Growth', value: '+140%' },
      { label: 'Average Session Duration', value: '3m 45s' },
      { label: 'FPS Smoothness', value: '60 FPS' }
    ],
    liveUrl: PROJECT_URLS.sawaraiyaHotel,
    githubUrl: PROJECT_URLS.githubProfile
  },
  {
    id: 'sawaraiya-jewelry',
    title: 'Sawaraiya Ultra-Premium Jewelry Platform',
    subtitle: '3D-Enabled E-Commerce Storefront with React Three Fiber',
    category: '3D & eCommerce',
    year: '2025',
    client: 'Sawaraiya Luxury Atelier',
    role: '3D Web Frontend Specialist',
    image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=1200&auto=format&fit=crop',
    featuredImage: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=1400&auto=format&fit=crop',
    secondaryImage: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=1000&auto=format&fit=crop',
    description: 'Built a 3D-enabled product storefront using React Three Fiber and GSAP, delivering immersive product views and smooth animated transitions.',
    fullDescription: 'Sawaraiya Ultra-Premium Jewelry Platform presents fine jewelry crafted with mathematical precision. The digital experience incorporates real-time 3D model rotation, facet illumination, and scroll-guided assembly explosions powered by React Three Fiber and GSAP.',
    challenge: 'Rendering high-detail 3D ring and diamond models smoothly in web browsers without causing device overheating or long initial load delays.',
    solution: 'Optimized 3D GLTF asset compression, implemented dynamic LOD (Level of Detail), and mapped lighting calculations into efficient WebGL shaders.',
    deliverables: [
      'Interactive 3D Ring & Diamond Viewer',
      'GSAP Scroll-Triggered Exploded Views',
      'Custom Ring Customizer & Size Tool',
      'E-Commerce Cart Integration'
    ],
    techStack: ['React.js', 'React Three Fiber', 'Three.js', 'GSAP', 'Tailwind CSS', 'TypeScript'],
    metrics: [
      { label: '3D Engagement Rate', value: '78%' },
      { label: 'E-Commerce Conversion', value: '+3.4%' },
      { label: 'Mobile Frame Rate', value: '60 FPS' }
    ],
    liveUrl: PROJECT_URLS.sawaraiyaJewelry,
    githubUrl: PROJECT_URLS.githubProfile
  },
  {
    id: 'learners-leaf',
    title: 'Learners Leaf Educational Portal',
    subtitle: 'Interactive E-Learning Platform with Dynamic Content Rendering',
    category: 'UI/UX & Animation',
    year: '2024',
    client: 'Learners Leaf EdTech',
    role: 'Frontend Developer',
    image: 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?q=80&w=1200&auto=format&fit=crop',
    featuredImage: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1400&auto=format&fit=crop',
    secondaryImage: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1000&auto=format&fit=crop',
    description: 'Developed an interactive e-learning platform with dynamic content rendering, course navigation, and responsive design across devices.',
    fullDescription: 'Learners Leaf is an educational web portal designed for online learning and skill mastery. Features dynamic lesson rendering, quiz progress tracking, video module embeds, and course completion certificate generators.',
    challenge: 'Ensuring seamless performance and responsive layout adaptation across diverse devices, including low-spec tablets and smartphones.',
    solution: 'Engineered lightweight React components with Redux state caching, responsive Tailwind CSS layouts, and smooth transition animations.',
    deliverables: [
      'Dynamic Lesson Content Renderer',
      'Course Navigation & Module Tracker',
      'Interactive Quiz & Assessment UI',
      'Cross-Device Responsive Layout'
    ],
    techStack: ['React.js', 'Redux', 'TypeScript', 'Tailwind CSS', 'RESTful APIs'],
    metrics: [
      { label: 'Course Completion Rate', value: '+32%' },
      { label: 'User Retention', value: '88%' },
      { label: 'Device Support', value: '100% Mobile/Tablet' }
    ],
    liveUrl: PROJECT_URLS.learnersLeaf,
    githubUrl: PROJECT_URLS.githubProfile
  }
];

export const SERVICES: Service[] = [
  {
    id: 'scalable-web-ui',
    number: '01',
    title: 'Scalable React & TypeScript Web UI',
    subtitle: 'Crafting clean, maintainable, and high-performance user interfaces for enterprise web apps.',
    description: 'Designing and building component-driven frontend architecture using React.js, TypeScript, and Redux. We enforce strict coding standards, reusability, and modular state management to ensure long-term scalability.',
    deliverables: [
      'Reusable React & Tailwind Design Systems',
      'Redux State Management Architecture',
      'Type-Safe Frontend Contracts with TypeScript',
      'Responsive Web Design Across All Breakpoints'
    ],
    iconName: 'Atom',
    highlights: ['2.5+ Years Frontend Expertise', 'Redux State Management', 'Clean & Maintainable Code']
  },
  {
    id: 'interactive-gsap-3d',
    number: '02',
    title: 'Interactive GSAP & 3D Web Experiences',
    subtitle: 'Engaging user experiences with scroll-triggered animations and 3D WebGL visuals.',
    description: 'Elevating brand web presences through GSAP ScrollTrigger timelines, video background syncing, and 3D product viewports using React Three Fiber and Three.js.',
    deliverables: [
      'GSAP Scroll-Triggered Storytelling',
      'React Three Fiber 3D Product Showcase',
      'Smooth Page Transitions & Micro-Interactions',
      'Hardware-Accelerated 60 FPS Motion'
    ],
    iconName: 'Sparkles',
    highlights: ['GSAP ScrollTrigger Specialist', 'React Three Fiber', '60 FPS Smooth Motion']
  },
  {
    id: 'b2b-saas-dashboards',
    number: '03',
    title: 'Multi-Tenant B2B SaaS & Admin Portals',
    subtitle: 'Transforming complex business logic into intuitive, high-efficiency dashboards.',
    description: 'Engineering responsive admin panels, membership management modules, and integrated e-commerce checkout flows built for speed, reliability, and ease of use.',
    deliverables: [
      'Responsive Multi-Tenant Admin Panels',
      'Role-Based Controls & Data Tables',
      'E-Commerce & Checkout UI Integration',
      'User Telemetry & Analytics Widgets'
    ],
    iconName: 'LayoutGrid',
    highlights: ['Multi-Tenant SaaS Panels', 'E-Commerce Integration', 'High-Density Workstations']
  },
  {
    id: 'api-performance-opt',
    number: '04',
    title: 'API Integration & Performance Optimization',
    subtitle: 'Sub-second page speeds, RESTful API synchronization, and root-cause debugging.',
    description: 'Integrating frontend components with backend REST APIs, conducting thorough root-cause analysis for bug fixes, and optimizing page load speeds for 95+ Lighthouse scores.',
    deliverables: [
      'RESTful API Endpoint Integration',
      'Lighthouse 95+ Performance Audit & Tweaks',
      'Root-Cause Analysis & Debugging',
      'Agile/Scrum Cross-Functional Delivery'
    ],
    iconName: 'Zap',
    highlights: ['RESTful API Integration', 'Root-Cause Analysis', 'Lighthouse 95+ Score']
  }
];

export const TECH_STACK: TechItem[] = [
  {
    name: 'React.js',
    category: 'Frontend',
    level: 96,
    experience: '2.5+ yrs',
    icon: 'Atom',
    description: 'Building scalable, reusable UI component architecture and custom hooks.'
  },
  {
    name: 'TypeScript',
    category: 'Frontend',
    level: 94,
    experience: '2.5+ yrs',
    icon: 'FileCode',
    description: 'Strict type definitions, interfaces, and maintainable type-safe contracts.'
  },
  {
    name: 'Redux & Redux Toolkit',
    category: 'Frontend',
    level: 95,
    experience: '2.5+ yrs',
    icon: 'Database',
    description: 'Predictable state containers, normalized state slices, and asynchronous thunks.'
  },
  {
    name: 'JavaScript (ES6+)',
    category: 'Frontend',
    level: 98,
    experience: '2.5+ yrs',
    icon: 'FileCode',
    description: 'Modern asynchronous JS, closures, array methods, and DOM optimization.'
  },
  {
    name: 'Tailwind CSS',
    category: 'Frontend',
    level: 98,
    experience: '2.5+ yrs',
    icon: 'Palette',
    description: 'Utility-first styling, design token systems, and responsive grid layouts.'
  },
  {
    name: 'GSAP & ScrollTrigger',
    category: 'Animation & 3D',
    level: 92,
    experience: '2.5+ yrs',
    icon: 'Move',
    description: 'Scroll-driven animations, timeline sequencing, and smooth micro-interactions.'
  },
  {
    name: 'React Three Fiber & Three.js',
    category: 'Animation & 3D',
    level: 88,
    experience: '2+ yrs',
    icon: 'Box',
    description: '3D model viewports, WebGL lighting, and interactive product viewports.'
  },
  {
    name: 'RESTful APIs & Node.js',
    category: 'Backend & DB',
    level: 90,
    experience: '2.5+ yrs',
    icon: 'Server',
    description: 'Integrating frontend components with backend APIs and JSON handling.'
  },
  {
    name: 'Git & GitHub',
    category: 'Architecture & Tools',
    level: 95,
    experience: '2.5+ yrs',
    icon: 'GitBranch',
    description: 'Version control, branch management, pull requests, and collaborative workflows.'
  },
  {
    name: 'Performance Optimization',
    category: 'Architecture & Tools',
    level: 94,
    experience: '2.5+ yrs',
    icon: 'Cpu',
    description: 'Lazy loading, bundle splitting, asset compression, and Lighthouse audits.'
  }
];

export const PROCESS_STEPS = [
  {
    number: '01',
    title: 'UI Architecture & Requirements',
    description: 'Analyzing specifications, defining clean UI component contracts, establishing state architecture, and planning execution milestones.'
  },
  {
    number: '02',
    title: 'Component Design & Motion',
    description: 'Building modular React/Redux components with Tailwind CSS, integrating GSAP scroll animations, and ensuring responsive layouts.'
  },
  {
    number: '03',
    title: 'API Integration & State Flow',
    description: 'Connecting frontend state with RESTful APIs, optimizing data flow, conducting root-cause debugging, and ensuring seamless client-server sync.'
  },
  {
    number: '04',
    title: 'Testing & Production Delivery',
    description: 'Executing cross-browser QA audits, Lighthouse score optimizations, CI/CD deployment pipelines, and delivering production-ready releases.'
  }
];
