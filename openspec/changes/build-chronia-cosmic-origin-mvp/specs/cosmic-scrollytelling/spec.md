## ADDED Requirements

### Requirement: Native-scroll narrative

The experience SHALL use the document's native scroll container and SHALL not require scroll hijacking or mandatory snapping.

#### Scenario: Platform scrolling

- **WHEN** a user scrolls with wheel, touch, keyboard, scrollbar, or assistive technology
- **THEN** the narrative SHALL advance using normal platform scrolling behavior

### Requirement: Progressive enhancement

Scroll-linked effects SHALL enhance existing semantic sections rather than create or replace factual content after hydration.

#### Scenario: Enhancement failure

- **WHEN** GSAP, ScrollTrigger, Canvas, or media playback fails to initialize
- **THEN** the user SHALL retain readable content, chronological order, and chapter navigation

### Requirement: Local scene animation ownership

Each enhanced scene SHALL own and clean up its animation context, triggers, observers, media effects, and event listeners.

#### Scenario: Scene unmount

- **WHEN** an enhanced scene unmounts or enhancement mode changes
- **THEN** it SHALL stop its animation work and release associated browser resources

### Requirement: Chapter navigation

The experience SHALL provide keyboard-operable links to each MVP chapter and SHALL preserve meaningful URL fragments.

#### Scenario: Direct chapter navigation

- **WHEN** a user activates a chapter link or opens its fragment URL
- **THEN** focus and scroll position SHALL reach the corresponding semantic scene without being obscured by pinned or sticky content

### Requirement: Restrained pinning

Pinned scenes SHALL be limited to focal narrative passages and SHALL preserve access to content before and after the pinned range.

#### Scenario: Exit from pinned scene

- **WHEN** a user continues scrolling past a pinned sequence in either direction
- **THEN** the document SHALL return to normal flow without trapping input or focus
