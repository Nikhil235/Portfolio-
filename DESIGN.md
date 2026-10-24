---
name: "Nikhil Arjun Portfolio"
description: "Interactive dark editorial portfolio for a Design Engineer bridging Figma precision & production React"
colors:
  primary: "#00f0ff"
  primary-glow: "rgba(0, 240, 255, 0.35)"
  background: "#080808"
  elevated: "#0e0e11"
  border: "#27272a"
  border-subtle: "rgba(63, 63, 70, 0.45)"
  accent-cyan: "#00f0ff"
  accent-blue: "#00b8ff"
  accent-amber: "#fbbf24"
  accent-coral: "#f87171"
  accent-emerald: "#10b981"
  text-primary: "#ffffff"
  text-muted: "#a1a1aa"
typography:
  display:
    fontFamily: "Archivo Black, Syne, sans-serif"
    letterSpacing: "-0.035em"
  editorial:
    fontFamily: "Instrument Serif, Georgia, serif"
    fontStyle: "italic"
  body:
    fontFamily: "Space Grotesk, -apple-system, BlinkMacSystemFont, sans-serif"
    letterSpacing: "-0.03em"
  mono:
    fontFamily: "JetBrains Mono, monospace"
  signature:
    fontFamily: "Sacramento, cursive"
rounded:
  sm: "6px"
  md: "12px"
  lg: "16px"
  full: "9999px"
spacing:
  xs: "4px"
  sm: "8px"
  md: "16px"
  lg: "24px"
  xl: "48px"
components:
  glass-pill:
    backgroundColor: "rgba(20, 20, 23, 0.78)"
    textColor: "{colors.text-primary}"
    rounded: "{rounded.full}"
    border: "1px solid rgba(63, 63, 70, 0.45)"
  glass-card:
    backgroundColor: "rgba(11, 11, 13, 0.95)"
    textColor: "{colors.text-primary}"
    rounded: "{rounded.lg}"
    border: "1px solid rgba(39, 39, 42, 0.85)"
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.background}"
    rounded: "{rounded.full}"
    padding: "12px 28px"
---

# Tokens / Overview
This design system defines an interactive dark editorial aesthetic tailored for a high-craft Design Engineer portfolio. Tokens balance brutalist typography hierarchy with subtle atmospheric lighting and glassmorphic depth.

# Typography
- **Display (`.font-display`)**: `Archivo Black` & `Syne`. High weight, ultra-tight tracking (`-0.035em`), used for high-impact hero headings and section title cards.
- **Editorial Accent (`.font-serif-editorial`)**: `Instrument Serif` (italic). Provides refined editorial contrast against brutalist sans forms.
- **Body (`.font-sans-tight`)**: `Space Grotesk`. Geometric, crisp, optimized for dark mode readability at `-0.03em` tracking.
- **Technical Monospace (`.font-mono-tech`)**: `JetBrains Mono`. Used for coordinates, timestamps, metrics, stack badges, and terminal-style telemetry.
- **Signature (`.font-signature`)**: `Sacramento` cursive, used selectively for personal authentic touchpoints.

# Color & Theme
- **Deep Void Background**: `#080808` base with `#0e0e11` elevated container surfaces.
- **Atmospheric Lighting**: Volumetric radial spotlights (`hero-spotlight-left`, `hero-spotlight-right`) with low-opacity white fades (`rgba(255,255,255,0.08)`) and radial dot noise overlay (`.bg-noise`).
- **Semantic Accents**:
  - `Cyan (#00f0ff)`: Primary active glow, interactive highlights, live status.
  - `Amber (#fbbf24)`: Milestone badges, certifications, high-priority stats.
  - `Coral (#f87171)`: Secondary highlights and contrast pins.
  - `Emerald (#10b981)`: Operational status, live indicators, availability tag.

# Spatial Layout & Grid
- **Container Max Width**: `1400px` with fluid responsive padding (`px-5 md:px-10`).
- **Asymmetric Bento Grid**: Variable spans (`col-span-12`, `md:col-span-8`, `md:col-span-4`) establishing natural focal hierarchies.
- **Rhythm**: Generous vertical section padding (`py-24` to `py-32`) allowing breathing room between dense information blocks.

# Components
- **Floating Dock Navbar**: Fixed glass pill navigation with active section tracking, smooth scroll triggers, and quick action links.
- **Bento Work Cards**: Glass cards with `border-zinc-800`, hover glow, progressive tag stacks, and live demo anchors.
- **Custom Magnetic Cursor**: Double-ring follower with pointer detection, auto-hiding on touch screens via `@media (pointer: fine)`.
- **Preloader**: Minimalist countdown / brand seal sequence on initial session entry.

# Motion & Interaction
- **Smooth Inertia Scrolling**: Powered by `lenis` with synchronized Framer Motion scroll transforms (`useScroll`, `useTransform`).
- **Kinetic Text Reveals**: Masked overflow containers with staggered spring / cubic-bezier entrance lines (`[0.16, 1, 0.3, 1]`).
- **Micro-Interactions**: Hover scale (`scale-[1.02]`), glowing border transitions, and magnetic button pulls.

# Accessibility Rules
- Adhere to `useReducedMotion()` across all Framer Motion components to silence kinetic transforms for sensitive users.
- Fallback pointer cursor gracefully when custom cursor is unmounted or on coarse pointer / mobile devices.
- High contrast foreground text (`#ffffff` and `#e4e4e7`) on `#080808` to guarantee WCAG AA+ compliance.

# Anti-Patterns / Constraints
- **No generic AI gradients**: Do not use generic purple-indigo gradients. Use tailored cyan/amber glow on deep zinc.
- **No generic Inter font**: Maintain the distinct pairing of Archivo Black / Syne + Space Grotesk + Instrument Serif.
- **No card nesting abuse**: Keep cards flat with clear single-level depth and subtle border definition.
- **No layout shifts during scroll**: Smooth scrub transforms must use GPU-composited properties (`transform`, `opacity`).
