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
  title: 'Front-End Web Developer',
  phone: '+91-6382755066',
  email: 'yogeshwar11012k02@gmail.com',
  location: 'Erode, Tamil Nadu',
  github: PROJECT_URLS.githubProfile,
  linkedin: PROJECT_URLS.linkedinProfile,
  aboutMe:
    'Front-end web developer with 2.5+ years of hands-on experience building responsive, SEO-optimized websites using JavaScript, HTML5, and modern CSS frameworks. Skilled in web performance optimization, cross-browser compatibility, and clean, well-documented, scalable code. A keen eye for detail, strong problem-solving skills, and an eagerness to learn and adapt quickly to new tools and workflows. Comfortable collaborating closely with design and content teams to bring new pages and experiences to life.',
  languages: ['Tamil (Native)', 'English (Professional)']
};

export const WORK_EXPERIENCE: WorkExperience[] = [
  {
    company: 'Sculpxtech Labs',
    role: 'Front-End Developer',
    period: 'Mar 2026 – Jun 2026',
    location: 'Erode, Tamil Nadu',
    highlights: [
      'Built and maintained responsive, SEO-optimized web pages with React.js and JavaScript, collaborating with design and content teams.',
      'Applied SEO best practices and performance optimization across page templates, ensuring cross-browser compatibility.',
      'Troubleshot front-end issues and maintained clean, scalable, well-documented code while implementing interactive UI animations.'
    ]
  },
  {
    company: 'Accenture (British Telecom)',
    role: 'App Development Associate',
    period: 'Nov 2023 – Mar 2026',
    location: 'India',
    highlights: [
      'Built enterprise-grade, reusable UI components using React and JavaScript for high-traffic business applications.',
      'Optimized front-end performance and troubleshot issues to maintain a smooth, accessible user experience.',
      'Collaborated with product managers, designers, and QA within cross-functional Agile teams.'
    ]
  }
];

export const EDUCATION_DATA: Education = {
  institution: 'Kongu Engineering College',
  degree: 'B.Tech in Information Technology',
  cgpa: '7.66'
};

export const METRICS: Metric[] = [
  { label: 'Years Experience', value: 2.5, suffix: '+', subtext: 'React.js, JavaScript & CSS frameworks' },
  { label: 'Key Projects Delivered', value: 5, suffix: '+', subtext: 'Sculpxtech, Koredio SaaS & Sawaraiya' },
  { label: 'B.Tech IT CGPA', value: 7.66, suffix: '', subtext: 'Kongu Engineering College' },
  { label: 'Lighthouse Performance', value: 98, suffix: '%', subtext: 'SEO & Web performance optimization' }
];

export const PROJECTS: Project[] = [
  {
    id: 'sculpxtech-b2b',
    title: 'Sculpxtech Product Platform & B2B Suite',
    subtitle: 'Enterprise UI Components & Design System',
    category: 'Enterprise B2B',
    year: '2026',
    client: 'Sculpxtech Labs',
    role: 'Front-End Developer',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1200&auto=format&fit=crop',
    featuredImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1400&auto=format&fit=crop',
    secondaryImage: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=1000&auto=format&fit=crop',
    description: 'Designed and developed enterprise UI components using React.js and Tailwind CSS; implemented reusable component libraries and optimized page load performance.',
    fullDescription: 'Sculpxtech Product Platform & B2B Suite is an enterprise workstation engineered to streamline client operations and asset management. Built with React.js, Redux, and Tailwind CSS, the platform delivers high-density data tables, modular UI widgets, type-safe API consumers, and strict coding compliance.',
    challenge: 'Architecting a standardized, reusable component system capable of servicing multiple enterprise client sub-apps without styling regressions or bundle bloat.',
    solution: 'Created a modular design system using React, JavaScript, and Tailwind CSS, with rigorous state normalization and lazy-loaded routes for instant initial loads.',
    deliverables: [
      'Reusable React & Tailwind Component Library',
      'Page Load & Asset Bundle Optimization',
      'SEO Best Practices & Cross-Browser Compatibility',
      'REST API Integration & Responsive UI'
    ],
    techStack: ['React.js', 'JavaScript', 'Tailwind CSS', 'HTML5', 'Git/GitHub', 'SEO Best Practices'],
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
    subtitle: 'Multi-Tenant B2B SaaS Dashboard & E-Commerce Integration',
    category: 'Enterprise B2B',
    year: '2026',
    client: 'Koredio Fitness Tech',
    role: 'Front-End Developer',
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1200&auto=format&fit=crop',
    featuredImage: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=1400&auto=format&fit=crop',
    secondaryImage: 'https://images.unsplash.com/photo-1540497077202-7c8a3999166f?q=80&w=1000&auto=format&fit=crop',
    description: 'Built a multi-tenant B2B SaaS dashboard with React.js and Tailwind CSS, including responsive admin panels, membership modules, and e-commerce integration.',
    fullDescription: 'Koredio Gym SaaS is a comprehensive management platform designed for fitness clubs and chains. It provides gym owners with real-time membership analytics, automated recurring billing interfaces, trainer scheduling, and an integrated e-commerce shop for supplement sales.',
    challenge: 'Managing complex state synchronization across multi-tenant admin dashboards, workout logs, member check-ins, and checkout carts.',
    solution: 'Implemented centralized React state slices with optimistic UI updates and responsive Tailwind CSS layout grids optimized for desktop workstations and mobile devices.',
    deliverables: [
      'Multi-Tenant Responsive Admin Panel',
      'Membership & Check-in Management Modules',
      'E-Commerce Storefront & Payment Gateway UI',
      'Member Analytics & Attendance Reports'
    ],
    techStack: ['React.js', 'Tailwind CSS', 'JavaScript', 'HTML5', 'RESTful APIs', 'Git/GitHub'],
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
    subtitle: 'Interactive Brand Website with GSAP Scroll Animations',
    category: 'UI/UX & Animation',
    year: '2025',
    client: 'Sawaraiya Hospitality Group',
    role: 'Front-End Developer',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=1200&auto=format&fit=crop',
    featuredImage: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=1400&auto=format&fit=crop',
    secondaryImage: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=1000&auto=format&fit=crop',
    description: 'Created an interactive, high-end brand website with GSAP scroll animations, video integration, and fully responsive layouts.',
    fullDescription: 'Sawaraiya Hotel is a luxury resort experience that blends serene architecture with modern digital elegance. Built with React.js and GSAP ScrollTrigger, the website features scroll-synced video backgrounds, interactive suite tours, and fluid section reveals.',
    challenge: 'Achieving butter-smooth 60 FPS scroll performance while scrubbing high-definition video backgrounds and rendering animated typography overlays.',
    solution: 'Utilized hardware-accelerated GSAP timelines with debounced scroll triggers and adaptive media loading for pristine 60 FPS playback on all screen sizes.',
    deliverables: [
      'GSAP Scroll-Triggered Video Playback Engine',
      'Interactive Suite & Villa Tour Showcases',
      'Direct Reservation Request Modal',
      'Fully Responsive Cross-Device UI'
    ],
    techStack: ['React.js', 'GSAP ScrollTrigger', 'JavaScript', 'Tailwind CSS', 'Responsive Web Design'],
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
    subtitle: '3D-Enabled Product Storefront with React Three Fiber & GSAP',
    category: '3D & eCommerce',
    year: '2025',
    client: 'Sawaraiya Luxury Atelier',
    role: 'Front-End Developer',
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
    techStack: ['React.js', 'React Three Fiber', 'GSAP', 'Tailwind CSS', 'JavaScript', 'HTML5'],
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
    role: 'Front-End Developer',
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
    techStack: ['React.js', 'JavaScript', 'HTML5', 'Tailwind CSS', 'CSS / Responsive Design'],
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
    title: 'Responsive & SEO-Optimized Web UI',
    subtitle: 'Building clean, scalable, and cross-browser compatible websites using React.js and modern CSS.',
    description: 'Designing and maintaining responsive, SEO-optimized web pages with React.js, JavaScript, HTML5, and Tailwind CSS. We apply SEO best practices, performance optimizations, and maintain clean, well-documented code.',
    deliverables: [
      'Responsive Web Design Across All Breakpoints',
      'SEO Best Practices & Meta Tag Optimization',
      'Web Performance & Accessibility Tweaks',
      'Cross-Browser Compatibility Assurance'
    ],
    iconName: 'Atom',
    highlights: ['2.5+ Years Hands-On Experience', 'SEO Best Practices', 'Clean & Scalable Code']
  },
  {
    id: 'interactive-gsap-3d',
    number: '02',
    title: 'Interactive UI Animations & 3D Visuals',
    subtitle: 'Troubleshooting front-end issues and delivering smooth, animated web experiences.',
    description: 'Implementing interactive UI animations with GSAP and 3D product viewports with React Three Fiber. Creating high-end brand websites with video integration and fluid transitions.',
    deliverables: [
      'GSAP Scroll-Triggered Storytelling',
      'React Three Fiber 3D Product Showcase',
      'Smooth Page Transitions & Micro-Interactions',
      'Cross-Device Animation Performance'
    ],
    iconName: 'Sparkles',
    highlights: ['GSAP Scroll Animations', '3D WebGL (R3F)', '60 FPS Smooth Transitions']
  },
  {
    id: 'b2b-saas-dashboards',
    number: '03',
    title: 'Enterprise UI Components & B2B SaaS',
    subtitle: 'Building enterprise-grade, reusable component libraries for high-traffic business applications.',
    description: 'Engineering multi-tenant B2B SaaS dashboards, responsive admin panels, membership modules, and e-commerce integrations using React.js and Tailwind CSS.',
    deliverables: [
      'Enterprise Reusable UI Component Libraries',
      'Multi-Tenant Responsive Admin Dashboards',
      'Membership & E-Commerce Module UI',
      'Agile Cross-Functional Team Collaboration'
    ],
    iconName: 'LayoutGrid',
    highlights: ['Sculpxtech Labs & Accenture', 'Reusable Component Libraries', 'Agile Team Delivery']
  },
  {
    id: 'api-performance-opt',
    number: '04',
    title: 'Web Performance Optimization & Debugging',
    subtitle: 'Troubleshooting front-end issues, optimizing load speeds, and maintaining code quality.',
    description: 'Optimizing front-end performance across page templates, conducting root-cause analysis for bug fixes, and maintaining clean, well-documented code.',
    deliverables: [
      'Lighthouse Performance & Asset Optimization',
      'Front-End Bug Fixes & Root-Cause Troubleshooting',
      'Git / GitHub Version Control & Workflows',
      'Cross-Browser Testing & Quality Assurance'
    ],
    iconName: 'Zap',
    highlights: ['Web Performance', 'Cross-Browser Compatibility', 'Git/GitHub Workflow']
  }
];

export const TECH_STACK: TechItem[] = [
  {
    name: 'JavaScript',
    category: 'Frontend',
    level: 98,
    experience: '2.5+ yrs',
    icon: 'FileCode',
    description: 'Core programming language for building dynamic, interactive web features.'
  },
  {
    name: 'HTML5',
    category: 'Frontend',
    level: 98,
    experience: '2.5+ yrs',
    icon: 'FileCode',
    description: 'Semantic markup, accessible page structures, and SEO best practices.'
  },
  {
    name: 'CSS / Tailwind CSS',
    category: 'Frontend',
    level: 98,
    experience: '2.5+ yrs',
    icon: 'Palette',
    description: 'Modern CSS frameworks, utility-first styling, and responsive web design.'
  },
  {
    name: 'React.js',
    category: 'Frontend',
    level: 96,
    experience: '2.5+ yrs',
    icon: 'Atom',
    description: 'Building enterprise UI components, modular design systems, and web apps.'
  },
  {
    name: 'Responsive Web Design',
    category: 'Frontend',
    level: 98,
    experience: '2.5+ yrs',
    icon: 'LayoutGrid',
    description: 'Fluid layouts and media queries ensuring 100% cross-device compatibility.'
  },
  {
    name: 'Cross-Browser Compatibility',
    category: 'Architecture & Tools',
    level: 96,
    experience: '2.5+ yrs',
    icon: 'Globe2',
    description: 'Ensuring seamless rendering across Chrome, Safari, Firefox, and Edge.'
  },
  {
    name: 'SEO Best Practices',
    category: 'Architecture & Tools',
    level: 95,
    experience: '2.5+ yrs',
    icon: 'Zap',
    description: 'Optimizing page metadata, heading hierarchy, and Lighthouse SEO scores.'
  },
  {
    name: 'Web Performance & Accessibility',
    category: 'Architecture & Tools',
    level: 95,
    experience: '2.5+ yrs',
    icon: 'Cpu',
    description: 'Optimizing asset load times, DOM trees, and WCAG accessibility.'
  },
  {
    name: 'Git / GitHub',
    category: 'Architecture & Tools',
    level: 95,
    experience: '2.5+ yrs',
    icon: 'GitBranch',
    description: 'Version control, branch management, pull requests, and collaborative code reviews.'
  },
  {
    name: 'Problem-Solving & Fast Learner',
    category: 'Architecture & Tools',
    level: 96,
    experience: '2.5+ yrs',
    icon: 'Sparkles',
    description: 'Troubleshooting front-end issues and adapting quickly to new tools and workflows.'
  }
];

export const PROCESS_STEPS = [
  {
    number: '01',
    title: 'Requirement Analysis & Design Sync',
    description: 'Collaborating with product managers and design teams to understand requirements and plan responsive page structures.'
  },
  {
    number: '02',
    title: 'React & Tailwind UI Development',
    description: 'Building reusable, clean UI components with React.js, JavaScript, and Tailwind CSS following strict coding standards.'
  },
  {
    number: '03',
    title: 'SEO & Performance Optimization',
    description: 'Applying SEO best practices, optimizing image bundles, and ensuring butter-smooth GSAP animations across devices.'
  },
  {
    number: '04',
    title: 'Cross-Browser QA & Git Delivery',
    description: 'Conducting cross-browser testing, troubleshooting front-end issues, and deploying clean code via Git/GitHub.'
  }
];
