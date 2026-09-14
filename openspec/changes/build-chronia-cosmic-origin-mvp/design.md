## Context

Chronia starts in a workspace that contains only OpenSpec configuration and the project brief. The first product slice must prove that a changing temporal scale can drive a memorable visual narrative without sacrificing historical rigor, semantic HTML, mobile usability, reduced-motion support, or loading and interaction performance.

The initial narrative ends with Earth's formation. It introduces two distinct build-time and runtime concerns: an interactive Next.js site and deterministic Remotion compositions rendered into web media. Historical content, temporal calculations, presentation components, animation controllers, and generated media must remain independently replaceable.

## Goals / Non-Goals

**Goals:**

- Create an extensible architecture for source-backed chronological scenes.
- Render the complete narrative and navigation as useful server-generated HTML before enhancement.
- Make the transition from cosmic to planetary scale visible and understandable.
- Add scroll-controlled cinematic motion through small, disposable client boundaries.
- Prove one reusable Remotion-to-web media workflow.
- Deliver purpose-built desktop, mobile, and reduced-motion compositions.
- Establish measurable accessibility, performance, SEO, test, and asset budgets.
- Organize work as independently verifiable, commit-ready checkpoints.

**Non-Goals:**

- Cover the history of life, humanity, civilizations, or the contemporary world.
- Add a CMS, database, authentication, personalization, analytics backend, or public API.
- Implement continuous frame-accurate video seeking across the complete page.
- Ship Three.js, React Three Fiber, WebGL, AI-generated footage, maps, or audio narration in the MVP.
- Build a reusable general-purpose animation framework before three real scene implementations expose repeated needs.

## Decisions

### 1. Use a small pnpm workspace

The repository will contain `apps/web`, `apps/studio`, `packages/chronology`, and `packages/visual-language`. The web and Remotion applications need independent build configurations but must share scene contracts, factual content, temporal utilities, and visual tokens.

Alternative considered: place Remotion inside the Next.js application. This reduces folders but couples server bundling, browser dependencies, rendering dependencies, and deployment. The workspace boundary is worth its small setup cost.

### 2. Keep narrative HTML server-rendered

Next.js App Router Server Components will render page structure, headings, dates, descriptions, citations, navigation, media posters, and fallbacks. Client Components will own only GSAP, ScrollTrigger, Canvas, media playback, and user controls. Server-to-client props will be plain serializable values.

Alternative considered: make the whole experience a Client Component. Rejected because it delays meaningful content, enlarges the initial bundle, weakens progressive enhancement, and makes accessibility dependent on hydration.

### 3. Use declarative TypeScript scene records

`packages/chronology` will expose typed, immutable scene records. Each scene contains identity, order, temporal range, display copy, renderer kind, scroll weight, source records, uncertainty, media references, and accessibility text. Build-time validation will reject duplicate IDs, invalid ranges, missing sources, unsupported renderers, or missing fallbacks.

Simple records are preferred over a hierarchy of scene classes. This applies SOLID at module boundaries while avoiding primitive wrappers and speculative abstractions that conflict with KISS and YAGNI for a read-only frontend domain.

### 4. Represent time with a piecewise temporal lens

Canonical time values will use finite integer years before present, safely within JavaScript's exact integer range for this scope. Display labels remain authored content because scientific precision and wording cannot be inferred safely from a number.

The visual timeline will consist of named scale segments. Each segment maps a real temporal domain to an authored scroll weight using a deterministic monotonic function. The interface will announce every scale transition and never depict the complete period as uniformly linear.

Alternative considered: one linear scale. Rejected because events near Earth's formation collapse into an unreadable area. One logarithmic scale was also rejected because it hides editorial pacing and remains difficult to explain.

### 5. Use native scroll with isolated GSAP timelines

The document remains the scroll container. Each enhanced scene owns one GSAP context and, when needed, one ScrollTrigger timeline. Scene activation, pinning, progress, and cleanup stay local. DOM animation uses transforms and opacity; layout reads and writes are batched. Pinning is limited to focal passages, and mandatory scroll snapping is excluded.

Alternative considered: Lenis or another smooth-scroll layer. Rejected for the MVP because native scroll preserves platform behavior, keyboard navigation, anchors, restoration, and lower mobile risk.

### 6. Select the least complex renderer per scene

- Prelude: semantic DOM, CSS, and restrained SVG.
- Big Bang: short Remotion render with poster and DOM overlays.
- Expansion and temporal scale transition: SVG and GSAP.
- First stars and galaxies: bounded Canvas 2D particle field with deterministic seeds.
- Solar System formation: SVG and layered CSS.
- Earth formation: short Remotion render with semantic DOM conclusion.

Three.js/WebGL remains a later spike. No current scene requires a navigable camera, depth interaction, physical material, or 3D model pipeline.

### 7. Treat Remotion as an offline asset producer

`apps/studio` will define deterministic, frame-driven compositions using `useCurrentFrame()` and `interpolate()`. The initial pipeline will render posters plus short desktop and mobile variants. Generated outputs will be referenced by a manifest so the web application never imports Remotion runtime code.

Video will not be the only source of information. The browser will reserve media dimensions, load clips near the viewport, provide pause controls, and use posters in reduced-motion mode. Continuous scroll seeking remains a measured spike, not an MVP dependency.

### 8. Make mobile and reduced motion explicit compositions

Responsive behavior will change scene framing, scroll distance, particle density, overlay placement, media source, and pin duration. It will not merely scale desktop coordinates.

Reduced motion will use the same scene content and chapter order with posters, direct state changes, restrained opacity transitions, no parallax, no broad zoom, no automatic spatial movement, and no decorative Canvas loop. A user-visible motion control will supplement the operating-system preference and persist for the browser session.

### 9. Use Tailwind CSS v4 and shared theme tokens

Tailwind CSS is the default styling system for layout, responsive composition, typography, states, spacing, and ordinary visual treatment. Shared theme values are declared with Tailwind v4 `@theme` variables and mirrored as typed values for Remotion in `packages/visual-language`. Prettier sorts utility classes consistently.

Custom CSS remains allowed only when Tailwind cannot express the requirement clearly, such as complex pseudo-elements, authored keyframes, Canvas support, browser-specific fallbacks, or shared global behavior. Repeated utility groups become focused React components before introducing `@apply` or bespoke component classes.

Alternative considered: CSS Modules as the default. Rejected because this project will contain many scene-specific compositions and the selected convention favors visible, reusable utilities over a growing collection of stylesheet rules.

### 10. Validate quality continuously

Vitest will cover temporal mapping, scene validation, source rules, and reduced-motion decisions. Testing Library and axe will cover semantic components. Playwright will cover native scrolling, chapter navigation, keyboard operation, reduced motion, mobile layouts, console errors, and deterministic screenshots. Lighthouse CI and bundle checks will enforce budgets after production build.

Every implementation checkpoint must pass formatting, lint, type checking, applicable focused tests, and build verification before it is considered commit-ready.

Prettier is the formatting authority for supported text files and will use `semi: false`. Playwright is both an automated browser gate and the inspection harness: major visual checkpoints require opening the captured desktop and mobile screenshots and recording human visual findings, not merely asserting that snapshot files exist.

Technical SEO will include server-rendered Schema.org JSON-LD. Exact types, entities, identifiers, authorship, and relationships will be selected only when visible content and real author metadata are available; the implementation must not invent missing properties.

## Risks / Trade-offs

- **ScrollTrigger pinning can behave poorly with mobile browser chrome** -> Use dynamic viewport units, limit pinned distance, and test on real touch devices early.
- **Video playback and seeking vary across browsers** -> Avoid continuous seeking in acceptance scope; use short clips, posters, capability checks, and normal playback.
- **Canvas can consume battery and block the main thread** -> Bound particle count and device pixel ratio, pause outside the viewport, seed deterministically, and profile mobile traces.
- **Remotion and web visuals can drift** -> Share tokens and scene metadata while keeping renderer implementations separate.
- **Generated media can dominate transfer size** -> Enforce per-variant budgets, lazy loading, short clips, and explicit poster fallbacks.
- **Scroll-led visuals can hide content from assistive technology** -> Keep full chronological content in semantic document order and mark decorative renderers accordingly.
- **Temporal compression can imply false precision** -> Show scale names, approximate labels, uncertainty, and supporting sources.
- **Historical review can become a delivery bottleneck** -> Require source records before copy enters a scene and isolate factual review from visual implementation.
- **Two applications increase dependency maintenance** -> Pin compatible versions in one lockfile and prevent Remotion runtime packages from entering the web bundle.
- **Visual ambition can expand scope** -> Keep scene acceptance criteria fixed and record later ideas outside current implementation tasks.

## Migration Plan

1. Initialize Git and the pnpm workspace without modifying the source brief.
2. Scaffold the web and studio applications and add shared packages.
3. Establish tests and quality gates before scene implementation.
4. Add validated content and a fully semantic static narrative.
5. Add temporal-lens behavior, then one enhanced scene at a time.
6. Render and integrate Remotion assets only after posters and fallbacks exist.
7. Validate production output, mobile behavior, reduced motion, accessibility, and performance before release.

Rollback is checkpoint-based. Each slice stays independently functional, and removing an enhancement must reveal the prior semantic experience rather than a blank scene.

## Open Questions

- Final project title, logotype, and editorial typefaces require visual exploration before asset production.
- Authoritative sources and exact scientific wording require a research pass before factual copy approval.
- Media budgets need confirmation against first real Remotion encode and target mobile devices.
- Whether the Big Bang or Earth scene benefits from sound remains outside MVP acceptance until silent interaction succeeds.
