# Scroll-Scrubbed Text Animations (mixed per section)

## Goal
Add scroll-triggered text animations to every section. Each section gets its own style, and every animation is **scrubbed**: progress is tied directly to scroll position, so it plays backward when you scroll up. Use the existing `framer-motion` (`useScroll` + `useTransform`). Lenis is already running, so scrubbing will feel smooth.

## New file: `src/components/ScrollText.tsx`
Reusable primitives. Each one takes `children`/`text`, `className`, and an optional `offset` (default `["start 90%", "start 40%"]`). Each one uses `useScroll({ target: ref, offset })`.

1. **`MaskedLines`**: a masked slide-up. It takes `lines: ReactNode[]`. Each line sits in an `overflow-hidden` wrapper, and the inner `motion.span` moves `y` from `110%` to `0%`. Each line is staggered by splitting the progress range: line i maps `[i*0.15, i*0.15+0.6]`.
2. **`WordHighlight`**: a scrubbed word reveal. It takes `text: string` and splits it into words. Each word's opacity goes from 0.15 to 1 over its own slice `[i/n, (i+1)/n]`. Optional `accentWords?: string[]` turn `#00F0FF` at full progress. Offset: `["start 85%", "end 50%"]`.
3. **`CharStagger`**: a per-character rise for short display headings. Each char maps `y: 40%→0`, `opacity 0→1`, and `rotateX 60→0` over a staggered slice. Use `aria-label` on the wrapper, with `aria-hidden` spans.
4. **`ParallaxFade`**: a generic block for paragraphs and cards. It maps `y: 40→0` and `opacity: 0→1`.

Each word or char is its own small child component so hooks are never called in loops.
Accessibility: if `useReducedMotion()` is true, render static text.

## Section mapping
| Section | Element | Primitive |
|---|---|---|
| Hero (`HeroSection.tsx`) | Main headline | Keep the entrance animation. Add an exit scrub: track the section `["start start","end start"]`, then headline `y 0→-120`, `opacity 1→0`, and slight `letterSpacing` widen |
| Philosophy (`PhilosophySection.tsx`) | Lead statement (line 25 paragraph) | `WordHighlight`, with accent on "data infrastructure" |
| Philosophy | Column headings / bodies | `ParallaxFade` |
| Stats (`StatsSection.tsx`) | `h2` (line 44) | `WordHighlight` |
| Bento (`BentoGrid.tsx`) | "Core / Specializations" `h2` | `MaskedLines` (2 lines, keep the `text-zinc-600` span) |
| Bento | Card descriptions | `ParallaxFade` |
| Experience (`ExperienceSection.tsx`) | "Field Notes" and "Selected Experience" `h2`s | `CharStagger` per line |
| Gallery (`GallerySection.tsx`) | "Gallery & Certifications" `h2` | `MaskedLines` |
| Gallery footer | "// LET'S BUILD SOMETHING" plus CTA | `CharStagger` on the mono label, `ParallaxFade` on CTA |

## Edge cases
- Horizontal Experience showcase: apply the animations only to the vertical-flow headings, not to items inside the horizontal track, because vertical scroll progress doesn't map to their position.
- Keep the existing classes on the outer `h2`, and the primitives render inline spans inside it, so typography stays the same.
- Use `will-change: transform` only on animated spans. Don't animate `filter`, for performance.
- Keep the existing hover behaviors and tilt hooks intact.

## Verification
- Run `npx tsc --noEmit` and confirm it passes.
- In the preview, check that scrolling down reveals text progressively, scrolling up reverses it, and the reduced-motion OS setting shows static text.
