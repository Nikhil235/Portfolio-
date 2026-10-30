// Bundled via Vite static imports → hashed URLs in /assets, never 404 or suffer from stock-photo mismatch.
import tokenSearchbarImage from '../assets/token-searchbar-system.jpg';
import sladeWilsonImage from '../assets/slade-wilson-chronograph.svg';
import uiChecklistImage from '../assets/ui-checklist-inspector.svg';
import bhringaBotanicalImage from '../assets/bhringa-botanical-ritual.svg';
import sketchNadalImage from '../assets/sketch-nadal-rally.svg';
import sketchBeckhamImage from '../assets/sketch-beckham-contrast.svg';
import shapeFrameworkImage from '../assets/shape-framework-diagram.svg';
import sketchSaiyanNarutoImage from '../assets/sketch-saiyan-naruto-study.svg';

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
  liveUrl?: string;
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
  ctaRoles: 'UI Developer · Frontend Design · Product Design & Tokens',
  socials: {
    github: 'https://github.com/Nikhil235',
    linkedin: 'https://linkedin.com',
    instagram: 'https://instagram.com',
    email: 'nikhilarjun.design@gmail.com',
  },
  // Linked from the Philosophy section's quant-trading line.
  quantProject: {
    label: 'quantitative trading models',
    url: 'https://github.com/Nikhil235?tab=repositories',
  },
};

export const STATS_LINES = [
  {
    text: 'Design with intent. Engineer with precision.',
    blockColor: '#5865F2', // Electric Indigo
    cursorColor: '#5865F2',
  },
  {
    text: 'From atomic tokens to shipped React — every pixel earned.',
    blockColor: '#10B981', // Emerald Green
    cursorColor: '#10B981',
  },
];

export interface KeyMetricItem {
  id: string;
  label: string;
  startValue: number;
  endValue: number;
  decimals: number;
  suffix: string;
  accent: string;
  description: string;
}

export const KEY_METRICS: KeyMetricItem[] = [
  {
    id: 'criteria',
    label: 'UI CRAFT CRITERIA',
    startValue: 10,
    endValue: 101,
    decimals: 0,
    suffix: ' Points',
    accent: '#00F0FF',
    description: 'Visual QA checks in my Shift Nudge inspection app covering layout, type, and contrast.',
  },
  {
    id: 'variants',
    label: 'CODED VARIANTS',
    startValue: 1,
    endValue: 52,
    decimals: 0,
    suffix: '+',
    accent: '#10B981',
    description: 'Production Figma & React component states mapped through a 3-tier token pipeline.',
  },
  {
    id: 'designers',
    label: 'DESIGNERS REACHED',
    startValue: 100,
    endValue: 1200,
    decimals: 0,
    suffix: '+',
    accent: '#F5B83D',
    description: 'Product designers and frontend engineers auditing interfaces with my open-source QA tool.',
  },
  {
    id: 'experience',
    label: 'YEARS CRAFTING',
    startValue: 1,
    endValue: YEARS_CRAFTING,
    decimals: 0,
    suffix: '+ Years',
    accent: '#8b93ff',
    description: 'From analog ink portraiture and watercolor composition to production React engineering.',
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
  { name: 'Component Variant Matrices', domain: 'Design Systems', level: 'Production' },
  { name: 'Destructive Flow UX', domain: 'Design Systems', level: 'Production' },
  { name: 'Accessibility & WCAG AA+', domain: 'Methodology', level: 'Production' },
  { name: 'CRO & Checkout Telemetry', domain: 'Methodology', level: 'Advanced' },
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
    impact:
      'Owns end-to-end delivery from Figma architecture to production React 19 storefronts, lifting D2C checkout and session metrics across luxury retail and botanical brands.',
    description:
      'Bridging Figma specification and production code as a single owner—eliminating translation loss between design intent and shipped DOM.',
    metrics: ['+34% Session Duration', '99 Lighthouse Perf', 'Zero Handoff Drift'],
    stack: ['Figma', 'React 19', 'Next.js', 'Tailwind CSS v4', 'WebAudio', 'TypeScript'],
    previewImage: sladeWilsonImage,
    certificateBadge: 'STUDIO LEAD',
    liveUrl: '#field-notes',
  },
  {
    id: 'exp-02',
    index: '02',
    role: 'Design System Architect',
    organization: 'Lucifer Team Systems',
    category: 'Design Systems',
    period: '2022 — 2023',
    location: 'Bangalore, India',
    impact:
      'Authored a three-tier token architecture (Primitives → Semantic → Component) and shipped the interactive 101-point UI inspection web app adopted by 1,200+ designers.',
    description:
      'Built synchronized Figma Token Studio pipelines and accessible React component libraries with automated visual compliance grading.',
    metrics: ['3-Tier Token Graph', '1,200+ Active Users', '101 QA Criteria'],
    stack: ['Figma Tokens', 'React', 'Storybook', 'TypeScript', 'Tailwind CSS'],
    previewImage: tokenSearchbarImage,
    certificateBadge: 'SYSTEM ARCHITECT',
    liveUrl: '#field-notes',
  },
  {
    id: 'exp-03',
    index: '03',
    role: 'Traditional Art & Digital Interface Creator',
    organization: 'Independent Creative Technologist',
    category: 'Creative Tech',
    period: `${CAREER_START_YEAR} — 2022`,
    location: 'Bangalore, India',
    impact:
      'Translated analog ink portraiture, chiaroscuro value blocking, and watercolor composition into editorial web layouts across 15+ shipped client projects.',
    description:
      'Trained in traditional pen-and-ink and watercolor before digital UI—applying focal contrast and negative space discipline directly to screen layout.',
    metrics: ['15+ Shipped Sites', 'Analog-to-Digital', 'Bespoke Editorial UI'],
    stack: ['Traditional Ink', 'Watercolor', 'HTML/CSS', 'JavaScript', 'Figma'],
    previewImage: sketchNadalImage,
    certificateBadge: 'ANALOG TO DIGITAL',
  },
];

export const FEATURED_BLOGS: BlogPost[] = [
  {
    id: 'my-design-system',
    tag: 'DESIGN SYSTEMS // TOKENS',
    readTime: '8 MIN CASE STUDY',
    date: '2024',
    title: 'My-Design-System & Lucifer: Three-Tier Token Architecture & Variant Matrix',
    excerpt:
      'Synchronized Figma Auto-Layout and React 19 component library built on a strict Primitives → Semantic → Component token graph across 52+ interactive states.',
    image: tokenSearchbarImage,
    accentColor: '#10B981',
    metrics: '52+ Coded Variants · 3 Token Tiers',
    liveUrl: 'https://github.com/Nikhil235',
    content: [
      'Strict three-tier token pipeline: Primitives → Semantic Aliases → Component Tokens with zero hardcoded hex leakage.',
      '16-variant SearchBar supporting live filter chips, error validation states, and keyboard shortcut listeners (⌘K / Ctrl+F).',
      '36-variant Danger Button matrix covering destructive confirmation flows with high-contrast focus and disabled states.',
    ],
    codeSnippet: `// Three-Tier Token Mapping Spec
export const tokens = {
  primitive: { emerald500: '#10B981', neutral950: '#09090b' },
  semantic: { bgSurface: 'primitive.neutral950', borderFocus: 'primitive.emerald500' },
  component: { searchBarBg: 'semantic.bgSurface', searchBarFocusRing: 'semantic.borderFocus' },
};`,
  },
  {
    id: 'ui-checklist',
    tag: 'DEVELOPER TOOL // QA',
    readTime: '5 MIN CASE STUDY',
    date: '2024',
    title: 'UI-Checklist Tool: Shift Nudge 101-Point Visual Inspection App',
    excerpt:
      'Interactive quality-assurance web app deployed on Vercel that lets designers grade interfaces against 101 visual craft criteria across layout, type, and contrast.',
    image: uiChecklistImage,
    accentColor: '#38bdf8',
    metrics: '1,200+ Active Designers · 101 Checks',
    liveUrl: 'https://github.com/Nikhil235',
    content: [
      '101 granular UI craft criteria categorized into Typography, Layout & Grid, Color & Contrast, and Interactive Feedback.',
      'Real-time compliance scoring with keyboard-driven rapid grading and local-storage session persistence.',
      'Exportable JSON and markdown audit summaries for engineering handoff and design critiques.',
    ],
    codeSnippet: `// LocalStorage-Synced Compliance Scoring
export function calculateCompliance(checklist: Criterion[]) {
  const passed = checklist.filter(c => c.status === 'pass').length;
  return Math.round((passed / checklist.length) * 100);
}`,
  },
  {
    id: 'slade-wilson',
    tag: 'E-COMMERCE // HOROLOGY',
    readTime: '6 MIN CASE STUDY',
    date: '2024',
    title: 'Slade Wilson Watches: D2C Luxury Mechanical Timepiece Platform',
    excerpt:
      'Dark horology storefront featuring an interactive 360° calibre dial inspector, synthesized mechanical escapement audio, and a friction-free luxury checkout flow.',
    image: sladeWilsonImage,
    accentColor: '#F5B83D',
    metrics: '+34% Session Duration · 99 Lighthouse',
    liveUrl: 'https://github.com/Nikhil235',
    content: [
      'Engineered an interactive watch dial inspector with zoomable sub-dials, lume toggle, and opt-in WebAudio mechanical chronograph clicks.',
      'Editorial typography pairing high-contrast display headers with tabular technical specification readouts.',
      'Streamlined 2-step luxury checkout flow grounded in CRO friction reduction.',
    ],
    codeSnippet: `// WebAudio Mechanical Chronograph Escapement Click
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
    id: 'bhringa-haircare',
    tag: 'E-COMMERCE // BOTANICALS',
    readTime: '6 MIN CASE STUDY',
    date: '2023',
    title: 'Bhringa Botanical Haircare: Apothecary D2C Formulation Storytelling',
    excerpt:
      'High-converting botanical hair ritual storefront with an interactive ingredient provenance drawer and hair-porosity diagnostic matcher.',
    image: bhringaBotanicalImage,
    accentColor: '#86efac',
    metrics: '+42% Add-to-Cart Conversion Lift',
    liveUrl: 'https://github.com/Nikhil235',
    content: [
      'Interactive formulation drawer revealing cold-pressed botanical ingredients, extraction timelines, and scalp benefits.',
      'Diagnostic ritual builder matching scalp and hair porosity profiles to tailored herbal regimens.',
      'Sub-second page transitions with zero layout shift and accessible keyboard drawer controls.',
    ],
    codeSnippet: `// Interactive Formulation Drawer State Machine
const [activeHerb, setActiveHerb] = useState<HerbId>('bhringraj');
const regimen = useMemo(() => matchPorosityProfile(porosity, activeHerb), [porosity, activeHerb]);`,
  },
];

/**
 * Note: To replace any study with a new raw camera scan, drop the .jpg/.png/.svg
 * into `src/assets/` and import it at the top of this file.
 */
export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'gal-01',
    title: 'Rally — Nadal Mid-Roar & Dense Panel Study',
    subtitle: 'Watercolour wash and India ink roar study stacked beside a manga speed-line burst and two-tone negative-space stencil.',
    issuerOrEvent: 'Analog Sketchbook Series',
    date: '2023',
    category: 'Traditional Art',
    credentialId: 'ART-SKETCH-01',
    image: sketchNadalImage,
    span: 'md:col-span-7',
    accent: '#00F0FF',
  },
  {
    id: 'gal-02',
    title: 'Beckham / Mark III — Depth Through Contrast',
    subtitle: 'Split value study: pure 1-bit black shadow blocking on the left half vs. 0.05mm Micron cross-hatching on the right.',
    issuerOrEvent: 'Analog Sketchbook Series',
    date: '2022',
    category: 'Traditional Art',
    credentialId: 'ART-SKETCH-02',
    image: sketchBeckhamImage,
    span: 'md:col-span-5',
    accent: '#F59E0B',
  },
  {
    id: 'gal-03',
    title: 'Three-Tier Token Architecture & 16-Variant SearchBar',
    subtitle: 'Primitive color swatches → semantic aliases → component tokens wired across all 16 interactive SearchBar states.',
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
    subtitle: 'Strategy, Hierarchy, Aesthetics, Platform, and Evolve: systematic execution from problem framing to Playwright CI.',
    issuerOrEvent: 'Design Engineering Methodology',
    date: '2024',
    category: 'Methodology',
    credentialId: 'SHAPE-FRAMEWORK',
    image: shapeFrameworkImage,
    span: 'md:col-span-4',
    accent: '#EF4444',
  },
  {
    id: 'gal-05',
    title: 'Super Saiyan Trio & Naruto Split-Face Study',
    subtitle: 'Saturated alcohol-marker aura silhouettes paired with a split-face pen study exploring dual focal hierarchy.',
    issuerOrEvent: 'Analog Sketchbook Series',
    date: '2022',
    category: 'Traditional Art',
    credentialId: 'ART-SKETCH-03',
    image: sketchSaiyanNarutoImage,
    span: 'md:col-span-4',
    accent: '#5865F2',
  },
];
