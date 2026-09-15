import type { SourceRecord } from './types'

export const sources = {
  nasaUniverseOverview: {
    id: 'nasa-universe-overview',
    title: 'Overview: The Universe’s History',
    publisher: 'NASA Science',
    url: 'https://science.nasa.gov/universe/overview/',
    accessedAt: '2026-09-15',
    kind: 'institutional',
  },
  nasaFirstStars: {
    id: 'nasa-first-stars',
    title: 'What Were the First Stars Like?',
    publisher: 'NASA Science',
    url: 'https://science.nasa.gov/mission/webb/science-overview/science-explainers/what-were-the-first-stars-like/',
    accessedAt: '2026-09-15',
    kind: 'institutional',
  },
  esaCosmicStructure: {
    id: 'esa-cosmic-structure',
    title: 'History of cosmic structure formation',
    publisher: 'European Space Agency',
    url: 'https://www.esa.int/Science_Exploration/Space_Science/Planck/History_of_cosmic_structure_formation',
    accessedAt: '2026-09-15',
    kind: 'institutional',
  },
  nasaSolarSystemFormation: {
    id: 'nasa-solar-system-formation',
    title: 'How did our Solar System form?',
    publisher: 'NASA Science',
    url: 'https://science.nasa.gov/astrobiology/learning-resources/alp/how-did-our-solar-system-form/',
    accessedAt: '2026-09-15',
    kind: 'institutional',
  },
  usgsEarthAge: {
    id: 'usgs-earth-age',
    title: 'Geologic Time: Age of the Earth',
    publisher: 'U.S. Geological Survey',
    url: 'https://pubs.usgs.gov/gip/geotime/age.html',
    accessedAt: '2026-09-15',
    kind: 'institutional',
  },
} as const satisfies Record<string, SourceRecord>
