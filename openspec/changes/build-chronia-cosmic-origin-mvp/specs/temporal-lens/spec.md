## ADDED Requirements

### Requirement: Canonical temporal representation

The chronology SHALL represent MVP dates as finite integer years before present while preserving separately authored human-readable labels and precision metadata.

#### Scenario: Temporal calculation

- **WHEN** the engine calculates progress between two scene dates
- **THEN** it SHALL use canonical values rather than parsing localized display labels

### Requirement: Piecewise temporal scale

The experience SHALL map real time to narrative progress through named, deterministic, monotonic scale segments with authored scroll weights.

#### Scenario: Cosmic-to-planetary transition

- **WHEN** the narrative approaches Solar System and Earth formation
- **THEN** the temporal lens SHALL visibly change from cosmic scale to planetary scale without reversing chronological progress

#### Scenario: Deterministic mapping

- **WHEN** the same canonical time and scale configuration are evaluated repeatedly
- **THEN** the engine SHALL return the same normalized progress value

### Requirement: Visible scale disclosure

The interface SHALL disclose that temporal spacing changes and SHALL display the active scale, current temporal label, and direction toward the present.

#### Scenario: Scale change announcement

- **WHEN** the active temporal segment changes
- **THEN** sighted users SHALL receive a visible scale transition and assistive-technology users SHALL receive equivalent contextual text without frame-by-frame live announcements

### Requirement: Non-linear scale accessibility

The temporal lens SHALL provide an ordered textual representation that communicates actual dates and sequence without relying on visual distance.

#### Scenario: Non-visual chronology

- **WHEN** a user reads the page through a screen reader or text-only flow
- **THEN** every scene SHALL expose its authored date, relative order, and scale context in document order
