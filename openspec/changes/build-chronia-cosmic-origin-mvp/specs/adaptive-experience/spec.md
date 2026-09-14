## ADDED Requirements

### Requirement: Purpose-built mobile composition

Every MVP scene SHALL define mobile framing, text placement, scroll length, media choice, and rendering density without depending on hover or desktop coordinates.

#### Scenario: Touch viewport

- **WHEN** the experience runs on a supported narrow touch viewport
- **THEN** all content and controls SHALL remain readable, reachable, and operable without horizontal page scrolling

### Requirement: Operating-system reduced-motion support

The experience SHALL detect `prefers-reduced-motion` and default to an alternative narrative that preserves content, chronology, scale context, controls, and navigation.

#### Scenario: Reduced motion enabled before load

- **WHEN** the operating system reports reduced motion before hydration
- **THEN** broad zoom, parallax, rotation, automatic spatial movement, decorative Canvas loops, and automatic cinematic playback SHALL not start

### Requirement: User motion control

The experience SHALL expose a keyboard-operable control that switches between full and reduced motion without requiring an operating-system setting.

#### Scenario: Motion preference changed

- **WHEN** the user changes the motion control
- **THEN** active scenes SHALL cleanly switch mode, retain the current chapter, and preserve the choice for the browser session

### Requirement: Equivalent reduced-motion narrative

Reduced-motion mode SHALL use static or restrained alternatives rather than removing scenes or information.

#### Scenario: Cinematic scene in reduced motion

- **WHEN** reduced-motion mode reaches a Remotion-backed scene
- **THEN** the scene SHALL present its poster, temporal context, narrative text, and chapter progression without requiring playback

### Requirement: Input-independent operation

All navigation and controls SHALL work with keyboard, touch, pointer, and assistive technology through native interactive elements.

#### Scenario: Keyboard-only journey

- **WHEN** a user completes the MVP using only a keyboard
- **THEN** the user SHALL reach every chapter and control with visible focus and without a keyboard trap
