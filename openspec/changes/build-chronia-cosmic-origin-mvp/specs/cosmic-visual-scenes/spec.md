## ADDED Requirements

### Requirement: MVP narrative scope

The released narrative SHALL contain an editorial prelude and scenes for the Big Bang, early expansion, first stars and galaxies, Solar System formation, and Earth formation, and SHALL stop before the origin of life.

#### Scenario: End of MVP

- **WHEN** a user reaches the final chapter
- **THEN** the experience SHALL identify Earth's formation as the current endpoint and SHALL not imply later history is already implemented

### Requirement: Purpose-selected renderers

Each MVP scene SHALL use the least complex renderer that satisfies its visual and narrative requirement: DOM/CSS or SVG for editorial and diagrammatic content, bounded Canvas 2D for dense particles, and rendered media for deterministic cinematic passages.

#### Scenario: Renderer review

- **WHEN** a new visual dependency or renderer is proposed
- **THEN** its scene-specific value, bundle cost, mobile cost, fallback, and disposal strategy SHALL be documented before adoption

### Requirement: No production WebGL dependency

The MVP web application SHALL not ship Three.js, React Three Fiber, or another WebGL engine unless a separately approved spike demonstrates a requirement that existing renderers cannot meet within quality budgets.

#### Scenario: Current production build

- **WHEN** the MVP production bundle is inspected
- **THEN** it SHALL contain no Three.js, React Three Fiber, or equivalent WebGL runtime

### Requirement: Deterministic Canvas scene

The stars and galaxies scene SHALL use deterministic inputs, bounded particle density, capped device pixel ratio, and viewport-aware suspension.

#### Scenario: Canvas outside viewport

- **WHEN** the Canvas scene is not visible or the document is hidden
- **THEN** its continuous rendering loop SHALL pause

#### Scenario: Canvas unavailable

- **WHEN** Canvas initialization is unavailable or disabled
- **THEN** the scene SHALL show a meaningful static visual and the same semantic content

### Requirement: Visual silence and hierarchy

The narrative SHALL include intentionally quiet states between major transitions and SHALL not keep every visible element in continuous motion.

#### Scenario: Between focal transitions

- **WHEN** a user enters a reading-focused interval
- **THEN** decorative movement SHALL stop or become visually subordinate to the text
