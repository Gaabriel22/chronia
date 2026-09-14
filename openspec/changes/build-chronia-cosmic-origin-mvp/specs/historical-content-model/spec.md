## ADDED Requirements

### Requirement: Declarative scene records

Every chronological scene SHALL be declared outside presentation components with stable identity, order, temporal range, authored display label, scale segment, renderer kind, scroll weight, source records, uncertainty metadata, and accessibility content.

#### Scenario: Adding a scene

- **WHEN** a contributor adds a valid scene record and its selected renderer
- **THEN** the chronology SHALL include the scene without requiring changes to the core scroll engine

### Requirement: Build-time scene validation

The project SHALL validate scene records before production build and SHALL reject duplicate identifiers, invalid temporal ranges, unsupported renderer kinds, missing sources, or missing accessibility content.

#### Scenario: Invalid scene record

- **WHEN** a scene contains an end earlier than its start or omits its sources
- **THEN** validation SHALL fail with the scene identifier and violated rule

### Requirement: Source-backed factual content

Every factual date, event, relationship, map, or scientific claim presented as fact SHALL reference at least one reliable source, with primary or authoritative institutional sources preferred where available.

#### Scenario: Factual copy review

- **WHEN** factual scene copy is accepted for release
- **THEN** its source title, publisher or author, canonical URL or publication identifier, and access or publication date SHALL be recorded

### Requirement: Historical and scientific uncertainty

The content model SHALL distinguish established claims, approximate values, ranges, interpretations, and disputed claims, and presentation SHALL not imply greater certainty than the source material supports.

#### Scenario: Approximate cosmic date

- **WHEN** a scene uses an approximate scientific date
- **THEN** the visible label and accessible description SHALL communicate approximation

#### Scenario: Conflicting sources

- **WHEN** reliable sources disagree materially
- **THEN** the scene SHALL record the disagreement or remain excluded until editorial treatment is approved
