## ADDED Requirements

### Requirement: Core Web Vitals budgets

The production experience SHALL target LCP at or below 2.5 seconds, INP at or below 200 milliseconds, and CLS at or below 0.1 at the 75th percentile, with representative mobile lab checks used before field data exists.

#### Scenario: Release performance validation

- **WHEN** the release candidate runs through the documented Lighthouse CI profile for three runs
- **THEN** the median run SHALL meet the configured performance thresholds and no run SHALL exceed the CLS budget

### Requirement: Lighthouse category gates

The production build SHALL achieve at least 95 for Lighthouse Performance and 100 for Accessibility, Best Practices, and SEO under the documented mobile profile.

#### Scenario: Lighthouse regression

- **WHEN** a category score falls below its configured threshold
- **THEN** the quality command SHALL fail and report the affected category

### Requirement: WCAG 2.2 AA baseline

The experience SHALL meet applicable WCAG 2.2 Level AA requirements, including semantic structure, text alternatives, contrast, keyboard access, focus visibility, focus not obscured, target size, pause controls, and reduced motion.

#### Scenario: Automated accessibility scan

- **WHEN** each representative viewport and motion mode is scanned with axe
- **THEN** no serious or critical accessibility violation SHALL remain

#### Scenario: Manual accessibility review

- **WHEN** the release checklist is completed
- **THEN** keyboard, NVDA, 200 percent zoom, Windows high contrast, touch targets, and reduced-motion journeys SHALL have recorded results

### Requirement: Technical SEO

The web application SHALL provide server-rendered indexable content, valid metadata, canonical URL configuration, Open Graph media, robots directives, sitemap, language declaration, and Schema.org JSON-LD appropriate to the final visible content and real authorship data.

#### Scenario: Metadata inspection

- **WHEN** a crawler requests the production page without executing JavaScript
- **THEN** it SHALL receive the title, description, canonical metadata, structured data, and complete core narrative

#### Scenario: Schema.org accuracy

- **WHEN** Schema.org entities and properties are selected during SEO implementation
- **THEN** they SHALL match visible content and verified project data without fabricated authorship, organization, dates, ratings, or relationships

### Requirement: Automated behavioral coverage

The project SHALL test temporal calculations and validation with unit tests and SHALL test navigation, native scrolling, enhancement fallback, keyboard use, mobile composition, reduced motion, media fallback, and console errors with browser tests.

#### Scenario: Pull request verification

- **WHEN** the complete test command runs for a release candidate
- **THEN** all required unit, integration, accessibility, end-to-end, and production-build checks SHALL pass

### Requirement: Visual verification

The project SHALL capture deterministic Playwright screenshots for approved desktop, mobile, reduced-motion, and representative scene states and SHALL require human visual inspection for major visual changes.

#### Scenario: Visual checkpoint

- **WHEN** a scene implementation reaches a commit checkpoint
- **THEN** its start, focal, and end states SHALL be available for comparison without relying on animation timing by eye

#### Scenario: Human screenshot inspection

- **WHEN** Playwright captures a major visual checkpoint
- **THEN** the implementing agent SHALL open the desktop and mobile results, inspect composition and defects, and record the inspection outcome before declaring the checkpoint complete

### Requirement: Runtime and bundle observability

The project SHALL report client bundle composition, media weights, console errors, layout shifts, and long animation tasks through repeatable development or CI checks.

#### Scenario: Dependency regression

- **WHEN** a client dependency unexpectedly enters the initial route bundle or exceeds its budget
- **THEN** the bundle check SHALL fail with enough detail to identify the dependency or chunk
