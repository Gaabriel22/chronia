## 1. Repository and Workspace Foundation

- [x] 1.1 Initialize the Git repository, default branch, root `.gitignore`, EditorConfig, Node version declaration, and pnpm package-manager declaration without modifying the source brief
- [x] 1.2 Create the pnpm workspace with `apps/web`, `apps/studio`, `packages/chronology`, and `packages/visual-language`
- [x] 1.3 Scaffold the Next.js App Router application with TypeScript, strict compiler settings, Server Components by default, and Tailwind CSS v4
- [x] 1.4 Scaffold the independent Remotion studio application and verify it runs without importing the web application
- [x] 1.5 Configure shared TypeScript settings and package exports for chronology and visual-language packages
- [x] 1.6 Add root scripts for format, format check, lint, type checking, unit tests, browser tests, build, bundle checking, and Lighthouse validation
- [x] 1.7 Configure root Prettier with `semi: false` and Tailwind class sorting, ESLint, Vitest, Testing Library, Playwright, axe, and Lighthouse CI with minimal passing smoke checks
- [x] 1.8 Install dependencies with one lockfile and verify the dependency tree has no unresolved or invalid direct packages
- [x] 1.9 Run format check, lint, type checking, baseline tests, and independent application builds; fix all foundation failures
- [x] 1.10 Create the repository-foundation checkpoint commit

## 2. Visual Language and Semantic Shell

- [x] 2.1 Define Tailwind v4 `@theme` color, typography, spacing, layering, breakpoint, and motion tokens with typed equivalents in `packages/visual-language`
- [x] 2.2 Select, license-check, self-host, and configure the editorial display and reading typefaces with stable fallback metrics
- [x] 2.3 Create global document styles for color scheme, fluid typography, focus visibility, selection, zoom and reflow, and high-contrast compatibility
- [x] 2.4 Build the Server Component page shell with skip link, landmarks, ordered chapter navigation, main narrative article, and footer
- [x] 2.5 Add static metadata, canonical configuration, language declaration, robots directives, sitemap, icons, and Open Graph baseline
- [x] 2.6 Select appropriate Schema.org types from final visible content and verified author data, then add valid server-rendered JSON-LD without invented properties
- [x] 2.7 Add component tests for landmark structure, heading order, navigation names, focus behavior, and metadata output
- [x] 2.8 Run the checkpoint format, lint, type, unit, accessibility, and production-build gates
- [x] 2.9 Create the semantic-shell checkpoint commit

## 3. Historical Research and Content Model

- [x] 3.1 Define typed immutable contracts for temporal ranges, precision, sources, uncertainty, accessibility content, media references, renderer kinds, scale segments, and scene records
- [x] 3.2 Write failing unit tests for duplicate scene IDs, invalid ordering, unsafe integers, invalid temporal ranges, unsupported renderers, missing sources, and missing accessibility content
- [x] 3.3 Implement the smallest build-time scene validator that satisfies the model tests and reports scene-specific failures
- [x] 3.4 Establish the documented source-evaluation workflow and citation record format for scientific and historical claims
- [x] 3.5 Research and record authoritative sources for the Big Bang, early expansion, first stars and galaxies, Solar System formation, and Earth formation
- [x] 3.6 Write concise Portuguese scene copy with approximate language and uncertainty matching the reviewed sources
- [x] 3.7 Create validated scene records for the editorial prelude and five MVP chapters without importing presentation components
- [x] 3.8 Add a source and uncertainty panel that is usable without JavaScript and links every released factual claim to its records
- [x] 3.9 Add tests proving a new valid scene record enters chronology without modification to the core registry consumer
- [x] 3.10 Run the checkpoint format, lint, type, unit, accessibility, and build gates
- [x] 3.11 Create the historical-content checkpoint commit

## 4. Temporal Lens

- [x] 4.1 Write failing tests for canonical time conversion, deterministic progress, boundary values, monotonic ordering, and cosmic-to-planetary scale transitions
- [x] 4.2 Implement named piecewise scale segments and pure temporal mapping functions with authored scroll weights
- [x] 4.3 Implement locale-aware authored time labels without parsing labels for calculations
- [x] 4.4 Build the server-rendered temporal indicator with active scale, time label, direction toward the present, and explanatory copy
- [x] 4.5 Add the client enhancement that updates the visual indicator without frame-by-frame screen-reader announcements
- [x] 4.6 Add a complete ordered textual alternative for visual temporal distance and scale changes
- [x] 4.7 Test boundary transitions, browser resizing, direct fragment navigation, no-JavaScript output, and non-visual chronology
- [x] 4.8 Run the checkpoint format, lint, type, unit, accessibility, browser, and build gates
- [x] 4.9 Create the temporal-lens checkpoint commit

## 5. Scrollytelling Engine

- [x] 5.1 Render every scene as a semantic Server Component section with stable fragment ID, date, heading, narrative, source access, visual slot, and fallback
- [x] 5.2 Write browser tests for native wheel, touch-equivalent, keyboard, scrollbar, chapter-link, forward, and reverse navigation behavior
- [x] 5.3 Implement a small Client Component that progressively imports GSAP and ScrollTrigger only when full-motion enhancement is allowed
- [x] 5.4 Implement one local GSAP context and optional ScrollTrigger timeline per enhanced scene with complete cleanup
- [x] 5.5 Add bounded scene activation and progress events without storing per-frame state in React
- [x] 5.6 Implement limited focal pinning with dynamic viewport sizing, unobscured focus, and reliable exit in both scroll directions
- [x] 5.7 Batch layout reads and writes and restrict per-frame DOM animation to transform and opacity
- [x] 5.8 Add failure tests proving readable navigation and content remain when animation imports or initialization fail
- [x] 5.9 Profile the baseline desktop and mobile scroll trace for layout thrashing, long tasks, and leaked triggers
- [x] 5.10 Run the checkpoint format, lint, type, unit, browser, accessibility, and production-build gates
- [x] 5.11 Create the scrollytelling-engine checkpoint commit

## 6. Static and Interactive Visual Scenes

- [ ] 6.1 Implement the quiet prelude with semantic typography, CSS atmosphere, restrained SVG, and an immediate stable LCP state
- [ ] 6.2 Implement the expansion and scale-transition scene with accessible SVG labels and GSAP enhancement
- [ ] 6.3 Write deterministic Canvas tests for seeded particle layout, density limits, pixel-ratio cap, resize behavior, and fallback selection
- [ ] 6.4 Implement the stars and galaxies Canvas 2D renderer with viewport suspension, document-visibility suspension, resize handling, and disposal
- [ ] 6.5 Implement the Solar System formation scene with semantic SVG relationships and layered CSS depth
- [ ] 6.6 Implement the Earth formation conclusion with poster-first media slot, semantic summary, current-scope disclosure, and next-era boundary
- [ ] 6.7 Add intentional quiet intervals and verify no scene keeps unnecessary animation running outside its focal range
- [ ] 6.8 Verify the production bundle contains no Three.js, React Three Fiber, WebGL engine, smooth-scroll library, or unused scene renderer
- [ ] 6.9 Capture and personally inspect deterministic start, focal, and end Playwright screenshots for every non-video scene on desktop and mobile; record visual findings
- [ ] 6.10 Run the checkpoint format, lint, type, unit, browser, accessibility, bundle, and build gates
- [ ] 6.11 Create the interactive-scenes checkpoint commit

## 7. Remotion Media Pipeline

- [ ] 7.1 Define a versioned media manifest shared as data without exporting Remotion runtime code to the web application
- [ ] 7.2 Create failing tests for manifest completeness, poster presence, dimensions, duration, responsive variants, and transfer budgets
- [ ] 7.3 Build deterministic frame-driven Big Bang and Earth formation compositions with shared visual tokens
- [ ] 7.4 Create distinct desktop and mobile framing for each composition and validate safe text and focal areas
- [ ] 7.5 Render approved posters and short browser-ready desktop and mobile clips through documented commands
- [ ] 7.6 Record source, license, generation, encode, dimensions, duration, and byte size for every media asset
- [ ] 7.7 Integrate picture or video source selection, reserved aspect ratio, near-viewport loading, normal playback, and poster fallback
- [ ] 7.8 Add native or custom pause controls with accessible names, visible focus, touch targets, and synchronized animation pause behavior
- [ ] 7.9 Verify that information conveyed by media is also available through adjacent text and add captions or descriptions where needed
- [ ] 7.10 Inspect the web client bundle and network waterfall to prove studio dependencies and below-fold full video payloads are absent from initial load
- [ ] 7.11 Run deterministic Remotion frame checks plus the checkpoint format, lint, type, unit, browser, bundle, and build gates
- [ ] 7.12 Create the Remotion-media checkpoint commit

## 8. Mobile and Reduced-Motion Experiences

- [ ] 8.1 Define scene-specific mobile layout, scroll length, overlay placement, particle density, media variant, and pin behavior
- [ ] 8.2 Test narrow portrait, wide mobile, tablet, desktop, zoomed, landscape, coarse-pointer, and no-hover layouts
- [ ] 8.3 Implement the operating-system reduced-motion default before decorative enhancement begins
- [ ] 8.4 Add a native keyboard-operable motion preference control and session-scoped persistence
- [ ] 8.5 Implement mode switching that retains the current chapter and cleans up active triggers, Canvas loops, media playback, and listeners
- [ ] 8.6 Implement reduced alternatives for every scene using posters, direct states, restrained opacity, and unchanged semantic content
- [ ] 8.7 Verify reduced mode starts no parallax, broad zoom, rotation, automatic spatial motion, decorative Canvas loop, or automatic cinematic playback
- [ ] 8.8 Complete keyboard-only and touch-only journeys through all scenes and controls without traps or horizontal page scrolling
- [ ] 8.9 Capture and personally inspect deterministic Playwright screenshots for reduced-motion desktop and mobile compositions; record visual findings
- [ ] 8.10 Run the checkpoint format, lint, type, unit, browser, accessibility, visual, and production-build gates
- [ ] 8.11 Create the adaptive-experience checkpoint commit

## 9. Performance, Accessibility, SEO, and Security Validation

- [ ] 9.1 Configure production Lighthouse CI for three mobile-profile runs with median Performance at least 95 and Accessibility, Best Practices, and SEO at 100
- [ ] 9.2 Configure and enforce LCP at or below 2.5 seconds, INP at or below 200 milliseconds, and CLS at or below 0.1 for representative tests
- [ ] 9.3 Establish initial-route JavaScript, per-scene client chunk, poster, mobile clip, and desktop clip budgets from measured production output
- [ ] 9.4 Add automated axe coverage for representative viewports, full and reduced motion, source panels, navigation, and media controls
- [ ] 9.5 Complete and record manual keyboard, NVDA, 200 percent zoom, Windows high contrast, focus visibility, focus obstruction, touch target, and reduced-motion checks
- [ ] 9.6 Run performance traces through representative forward and reverse scroll journeys and remove long animation tasks, repeated layout, paint-heavy effects, and idle work
- [ ] 9.7 Verify HTML validation, metadata, canonical URL, robots, sitemap, Open Graph output, Schema.org JSON-LD, and JavaScript-free crawler content
- [ ] 9.8 Add restrictive production security headers appropriate to a static portfolio and verify no secrets or source-only assets enter browser output
- [ ] 9.9 Run dependency and license review, classify findings, and remediate production exposure without forced breaking upgrades
- [ ] 9.10 Run the complete clean-install release suite and reconcile documented counts and intentional skips with actual output
- [ ] 9.11 Create the quality-validation checkpoint commit

## 10. Documentation and Release Readiness

- [ ] 10.1 Document architecture, workspace commands, renderer-selection rules, temporal-lens rationale, and Server/Client boundaries
- [ ] 10.2 Document the historical research, source review, uncertainty, media provenance, and licensing workflows
- [ ] 10.3 Document how to add an era, scale segment, scene, renderer, Remotion composition, media variant, fallback, and test
- [ ] 10.4 Document mobile, reduced-motion, accessibility, performance, bundle, and media decisions with measured release results
- [ ] 10.5 Create a prominent portfolio-project disclaimer and explain why each production dependency exists
- [ ] 10.6 Verify documentation commands and paths from a clean checkout and remove stale placeholders or unimplemented claims
- [ ] 10.7 Run the final format, lint, type, unit, accessibility, end-to-end, visual, Remotion, bundle, Lighthouse, and production-build gates
- [ ] 10.8 Run strict OpenSpec validation and confirm every MVP requirement maps to implementation evidence or a tracked task
- [ ] 10.9 Create the documentation and release-readiness checkpoint commit
