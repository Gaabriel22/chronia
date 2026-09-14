## ADDED Requirements

### Requirement: Workspace separation

The repository SHALL use one locked workspace containing an independently buildable Next.js web application, an independently runnable Remotion studio application, a shared chronology package, and a shared visual-language package.

#### Scenario: Workspace installation

- **WHEN** a contributor installs dependencies from the repository root
- **THEN** one lockfile SHALL resolve compatible dependencies for every workspace package

#### Scenario: Independent application build

- **WHEN** a contributor builds either application through its workspace command
- **THEN** that application SHALL build without requiring the other application to run

### Requirement: Server-first web foundation

The web application SHALL render narrative content with Next.js App Router Server Components by default and SHALL limit Client Components to browser-dependent interaction and rendering.

#### Scenario: JavaScript unavailable

- **WHEN** the page loads with client JavaScript disabled
- **THEN** the complete ordered narrative, dates, citations, chapter navigation, and media alternatives SHALL remain available

#### Scenario: Client boundary data

- **WHEN** a Server Component provides scene data to a Client Component
- **THEN** the provided data SHALL contain only serializable values

### Requirement: Shared visual foundation

The project SHALL use Tailwind CSS v4 as the default styling system and SHALL define shared color, typography, spacing, layering, breakpoint, and motion tokens through CSS-first theme configuration without adopting a general component library for the MVP.

#### Scenario: Token consumption

- **WHEN** web and Remotion implementations use the same named visual token
- **THEN** both SHALL derive that value from the shared visual-language package

#### Scenario: Styling implementation

- **WHEN** a layout, responsive, typography, spacing, state, or ordinary visual requirement is implemented
- **THEN** it SHALL use static Tailwind utilities unless Tailwind cannot express the requirement clearly

#### Scenario: Custom CSS exception

- **WHEN** custom CSS is added
- **THEN** the code review SHALL identify the browser, animation, pseudo-element, Canvas, global, or readability limitation that prevents a clear Tailwind implementation

### Requirement: Root quality commands

The repository SHALL expose root commands for formatting, format checking, linting, type checking, unit testing, end-to-end testing, production building, bundle checking, and Lighthouse validation.

#### Scenario: Clean checkout validation

- **WHEN** the documented validation sequence runs from a clean checkout
- **THEN** every quality command SHALL complete without undocumented manual setup

### Requirement: Semicolon-free Prettier convention

Prettier SHALL be the formatting authority for supported project files, SHALL be configured with `semi: false` at the workspace root, and SHALL sort Tailwind utility classes through the compatible official plugin.

#### Scenario: Format enforcement

- **WHEN** a supported source file contains semicolons that Prettier considers optional
- **THEN** the format command SHALL remove them and the format-check command SHALL reject the unformatted form
