// Bundled via Vite static import → hashed URL in /assets, can never 404 like a remote/public path.
import tokenSearchbarImage from '../assets/token-searchbar-system.jpg';

/**
 * Single source of truth for career dates. The "Years Crafting" stat and the
 * experience timeline both derive from this, so they can never disagree with
 * each other (keep it in sync with your résumé / LinkedIn start date).
 */
export const CAREER_START_YEAR = 2020;
const YEARS_CRAFTING = Math.max(1, new Date().getFullYear() - CAREER_START_YEAR);

export interface ExperienceItem {
  id: string;
  index: string;
  role: string;
  organization: string;
  category: 'Design Engineering' | 'Design Systems' | 'Creative Tech' | 'Production React';
  period: string;
  location: string;
  impact: string;
  description: string;
  metrics: string[];
  stack: string[];
  previewImage: string;
  certificateBadge: string;
  liveUrl?: string;
}

export interface BlogPost {
  id: string;
  tag: string;
  readTime: string;
  date: string;
  title: string;
  excerpt: string;
  image: string;
  accentColor: string;
  metrics: string;
  content: string[];
  codeSnippet: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  subtitle: string;
  issuerOrEvent: string;
  date: string;
  category: 'Traditional Art' | 'Design System' | 'Methodology' | 'Certification';
  credentialId?: string;
  image: string;
  span: string;
  accent: string;
}

export const HERO_DATA = {
  name: 'Nikhil Arjun',
  shortSignature: 'Nikhil',
  locationTag: 'BANGALORE, IN — 2026',
  leftBioLines: [
    "HI, I'M NIKHIL ARJUN.",
    'DESIGN ENGINEER BRIDGING',
    'FIGMA PRECISION &',
    'PRODUCTION REACT.',
  ],
  rightCollabLines: [
    'OPEN TO OPPORTUNITIES:',
    'UI DEVELOPER · FRONTEND DESIGN',
    'PRODUCT DESIGN & TOKENS.',
  ],
  socials: {
    github: 'https://github.com/nikhilarjun',
    linkedin: 'https://linkedin.com',
    instagram: 'https://instagram.com',
    email: 'nikhilarjun.design@gmail.com',
  },
  // Linked from the Philosophy section's quant-trading line.
  // TODO: point `url` at the live trading dashboard / model case study once it's public.
  quantProject: {
    label: 'quantitative trading models',
    url: 'https://github.com/nikhilarjun?tab=repositories&q=quant',
  },
};

export const STATS_LINES = [
  {
    text: 'Design with intent. Engineer with precision.',
    blockColor: '#5865F2', // Electric Indigo
    cursorColor: '#5865F2',
  },
  {
    text: 'Scalable tokens. Fluid interactions.',
    blockColor: '#10B981', // Emerald Green
    cursorColor: '#10B981',
  },
  {
    text: 'From atomic values to tangible experiences —',
    blockColor: '#F59E0B', // Amber Orange
    cursorColor: '#F59E0B',
  },
  {
    text: 'every pixel has a purpose.',
    blockColor: '#EF4444', // Coral Red
    cursorColor: '#EF4444',
  },
];

export const KEY_METRICS = [
  {
    id: 'criteria',
    label: 'UI CRAFT CRITERIA',
    startValue: 10,
    endValue: 101,
    decimals: 0,
    suffix: ' Points',
  },
  {
    id: 'variants',
    label: 'CODED VARIANTS',
    startValue: 1,
    endValue: 52,
    decimals: 0,
    suffix: '+',
  },
  {
    id: 'designers',
    label: 'DESIGNERS REACHED',
    startValue: 100,
    endValue: 1200,
    decimals: 0,
    suffix: '+',
  },
  {
    id: 'experience',
    label: 'YEARS CRAFTING',
    startValue: 1,
    endValue: YEARS_CRAFTING,
    decimals: 0,
    suffix: '+ Years',
  },
];

export interface TechArsenalItem {
  name: string;
  domain: 'Design Systems' | 'Frontend' | 'Tooling' | 'Methodology';
  level: 'Production' | 'Advanced';
}

export const TECH_ARSENAL: TechArsenalItem[] = [
  { name: 'Three-Tier Tokens', domain: 'Design Systems', level: 'Production' },
  { name: 'Figma & Auto-Layout', domain: 'Design Systems', level: 'Production' },
  { name: 'React 19 & Next.js', domain: 'Frontend', level: 'Production' },
  { name: 'TypeScript 5', domain: 'Frontend', level: 'Production' },
  { name: 'Tailwind CSS v4', domain: 'Frontend', level: 'Production' },
  { name: 'WebAudio Synthesizer', domain: 'Frontend', level: 'Production' },
  { name: 'Claude Code + Figma MCP', domain: 'Tooling', level: 'Production' },
  { name: 'GSAP & ScrollTrigger', domain: 'Frontend', level: 'Production' },
  { name: 'Framer Motion', domain: 'Frontend', level: 'Production' },
  { name: 'SHAPE Framework', domain: 'Methodology', level: 'Production' },
  { name: 'Shift Nudge 101 QA', domain: 'Methodology', level: 'Production' },
  { name: 'Storybook & Chromatic', domain: 'Design Systems', level: 'Production' },
  { name: '16-Variant SearchBar', domain: 'Design Systems', level: 'Production' },
  { name: '36-Variant Danger Buttons', domain: 'Design Systems', level: 'Production' },
  { name: 'Accessibility & A11y', domain: 'Methodology', level: 'Production' },
  { name: 'CRO & Friction Reduction', domain: 'Methodology', level: 'Advanced' },
  { name: 'Traditional Ink & Wash', domain: 'Methodology', level: 'Production' },
  { name: 'Quant Trading Logic', domain: 'Tooling', level: 'Advanced' },
];

export const EXPERIENCE_ITEMS: ExperienceItem[] = [
  {
    id: 'exp-01',
    index: '01',
    role: 'Lead UI/UX Designer & Frontend Engineer',
    organization: 'Design Engineering Studio',
    category: 'Design Engineering',
    period: '2023 — PRESENT',
    location: 'Bangalore, India (Remote)',
    impact: 'Architecting scalable design systems, building three-tier token pipelines in Figma and React, and engineering high-impact D2C e-commerce experiences with tactile interaction physics.',
    description:
      'Bridging Figma precision and React components. Owns the entire pipeline from typography scales and variant matrices to shipped, production-ready interfaces with zero handoff drift.',
    metrics: ['3-Tier Token Pipeline', '100% Token Mapping', 'Zero Handoff Drift'],
    stack: ['Figma', 'React 19', 'Next.js', 'Tailwind CSS v4', 'WebAudio', 'TypeScript'],
    previewImage:
      'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    certificateBadge: 'STUDIO LEAD',
  },
  {
    id: 'exp-02',
    index: '02',
    role: 'Design System Architect',
    organization: 'Lucifer Team Systems',
    category: 'Design Systems',
    period: '2022 — 2023',
    location: 'Bangalore, India',
    impact: 'Engineered the 36-variant Danger Button system, 16-variant SearchBar, and component guidelines. Built the Shift Nudge-inspired UI-Checklist web app.',
    description:
      'Designed and deployed an interactive evaluation engine allowing product designers to audit web interfaces against 101 visual craft criteria spanning typography, alignment, contrast, spacing, and microcopy.',
    metrics: ['52+ Coded Variants', '1,200+ Active Designers', '16 SearchBar States'],
    stack: ['Figma Tokens', 'React', 'Storybook', 'TypeScript', 'Tailwind CSS'],
    previewImage:
      'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    certificateBadge: 'SYSTEM ARCHITECT',
  },
  {
    id: 'exp-03',
    index: '03',
    role: 'Traditional Art & Digital Interface Creator',
    organization: 'Independent Creative Technologist',
    category: 'Creative Tech',
    period: `${CAREER_START_YEAR} — 2022`,
    location: 'Bangalore, India',
    impact: 'Synthesized analog ink portraiture and watercolor principles into digital product design. Shipped 15+ custom web experiences and automated design book principles into Claude skills.',
    description:
      'Trained in analog ink portraiture, watercolour, and manga illustration before touching a screen. Applied negative space, focal contrast, and balance principles directly to software design.',
    metrics: ['15+ Shipped Sites', 'Analog-to-Digital', 'Bespoke Microcopy'],
    stack: ['Traditional Ink', 'Watercolor', 'HTML/CSS', 'JavaScript', 'Figma'],
    previewImage:
      'https://images.unsplash.com/photo-1607799279861-4dd421887fb3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    certificateBadge: 'ANALOG TO DIGITAL',
  },
];

export const FEATURED_BLOGS: BlogPost[] = [
  {
    id: 'slade-wilson',
    tag: 'E-COMMERCE // TIMEPIECES',
    readTime: '6 MIN READ',
    date: '2024',
    title: 'Slade Wilson Watches: D2C Luxury Digital Timepiece Platform',
    excerpt:
      'A luxury D2C digital watch experience with bespoke editorial copy, interactive chronometer inspection, tactile haptic feedback, and a dark horology aesthetic.',
    image:
      'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    accentColor: '#F5B83D',
    metrics: '+34% Session · 99 Lighthouse',
    content: [
      'Engineered an interactive 360-degree watch dial inspector with tactile haptic WebAudio sound effects.',
      'Editorial homepage copy focused on precision horology storytelling with fluid character-by-character headline reveals.',
      'Optimized high-conversion checkout flow grounded in CRO principles.',
    ],
    codeSnippet: `// WebAudio Mechanical Chronograph Click Synthesizer
const playTick = (freq = 1200) => {
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.frequency.setValueAtTime(freq, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.03);
  osc.connect(gain).connect(ctx.destination);
  osc.start(); osc.stop(ctx.currentTime + 0.03);
};`,
  },
  {
    id: 'ui-checklist',
    tag: 'DEVELOPER TOOL // QA',
    readTime: '5 MIN READ',
    date: '2024',
    title: 'UI-Checklist Tool: Shift Nudge 101-Point Visual Inspection App',
    excerpt:
      'Live interactive quality-assurance web application deployed on Vercel, based on Shift Nudge’s renowned 101-point UI framework. Used by 1,200+ designers.',
    image:
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    accentColor: '#38bdf8',
    metrics: '1,200+ Active Designers',
    content: [
      '101 granular UI craft criteria categorized by Layout, Typography, Color, and Feedback.',
      'Real-time compliance scoring with instant visual defect reports and keyboard-driven rapid grading.',
      'Exportable audit summaries for team design critiques with instant local state persistence.',
    ],
    codeSnippet: `// LocalStorage-Synced Compliance Scoring
export function calculateCompliance(checklist: Criterion[]) {
  const passed = checklist.filter(c => c.status === 'pass').length;
  return Math.round((passed / checklist.length) * 100);
}`,
  },
  {
    id: 'my-design-system',
    tag: 'DESIGN SYSTEMS // TOKENS',
    readTime: '8 MIN READ',
    date: '2024',
    title: 'My-Design-System & Lucifer: Three-Tier Token Architecture & Variant Matrix',
    excerpt:
      'Comprehensive Figma & React design system featuring a 16-variant SearchBar, 36-variant Danger button set, and food delivery app composition.',
    image: tokenSearchbarImage,
    accentColor: '#10B981',
    metrics: '52+ Coded Variants // 3 Tiers',
    content: [
      'Strict three-tier token pipeline: Primitives → Semantic Aliases → Component Tokens.',
      '16-variant SearchBar with live search states, filters, and keyboard shortcut listeners.',
      '36-variant Danger Button matrix covering destructive flows with extreme visual clarity.',
    ],
    codeSnippet: `// Three-Tier Token Mapping Spec
export const tokens = {
  primitive: { neutral950: '#0d0d0d', lime400: '#b8f36b' },
  semantic: { bgSurface: 'primitive.neutral950', textAccent: 'primitive.lime400' },
  component: { searchBarBg: 'semantic.bgSurface', searchBarBorder: 'semantic.borderSubtle' },
};`,
  },
  {
    id: 'bhringa-haircare',
    tag: 'E-COMMERCE // BOTANICALS',
    readTime: '6 MIN READ',
    date: '2023',
    title: 'Bhringa Botanical Haircare: High-Sensory D2C Product Storytelling',
    excerpt:
      'Immersive shampoo and botanical hair ritual product experience with interactive ingredient exploration and high-converting microcopy.',
    image:
      'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    accentColor: '#86efac',
    metrics: '+42% Add-to-Cart Rate',
    content: [
      'Tactile ingredient drawer revealing organic herbs, formulation specs, and extraction methods.',
      'Custom ritual selector matching hair profiles to bespoke herbal regiments.',
      'Silk-smooth scroll narrative with parallax layer separation.',
    ],
    codeSnippet: `// Interactive Formulation Drawer State Machine
const [activeIngredient, setActive] = useState<Herb | null>(null);
const { scrollYProgress } = useScroll({ target: containerRef });`,
  },
];

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'gal-01',
    title: 'Rally — Nadal Mid-Roar & Dense Panel Study',
    subtitle: 'Watercolour tennis player stacked over an ink Dragon Ball panel and a two-tone stencil.',
    issuerOrEvent: 'Analog Sketchbook Series',
    date: '2023',
    category: 'Traditional Art',
    credentialId: 'ART-SKETCH-01',
    image:
      'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    span: 'md:col-span-7',
    accent: '#00F0FF',
  },
  {
    id: 'gal-02',
    title: 'Beckham / Mark III — Depth Through Contrast',
    subtitle: 'Two ways to fake depth: pure black shapes on the left, cross-hatching and ink on the right.',
    issuerOrEvent: 'Analog Sketchbook Series',
    date: '2022',
    category: 'Traditional Art',
    image:
      'https://images.unsplash.com/photo-1544717305-2782549b5136?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    span: 'md:col-span-5',
    accent: '#F59E0B',
  },
  {
    id: 'gal-03',
    title: 'Three-Tier Token Architecture & 16-Variant SearchBar',
    subtitle: 'Comprehensive Figma Auto-Layout 5.0 and React component library with Token Studio synchronization.',
    issuerOrEvent: 'Lucifer Team Design System',
    date: '2024',
    category: 'Design System',
    credentialId: 'DS-TOKENS-2024',
    image: tokenSearchbarImage,
    span: 'md:col-span-4',
    accent: '#10B981',
  },
  {
    id: 'gal-04',
    title: 'S.H.A.P.E. Framework — Digital Product Methodology',
    subtitle: 'Strategy, Hierarchy, Aesthetics, Platform, and Evolve: systematic design engineering execution.',
    issuerOrEvent: 'Design Engineering Methodology',
    date: '2024',
    category: 'Methodology',
    credentialId: 'SHAPE-FRAMEWORK',
    image:
      'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    span: 'md:col-span-4',
    accent: '#EF4444',
  },
  {
    id: 'gal-05',
    title: 'Super Saiyan Trio & Naruto Split-Face Study',
    subtitle: 'Saturated marker work beside a split-face pen portrait exploring extreme focal hierarchy.',
    issuerOrEvent: 'Analog Sketchbook Series',
    date: '2022',
    category: 'Traditional Art',
    credentialId: 'ART-SKETCH-02',
    image:
      'https://images.unsplash.com/photo-1513364776144-60967b0f800f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    span: 'md:col-span-4',
    accent: '#5865F2',
  },
];
