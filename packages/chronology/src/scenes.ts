import { sources } from './sources'
import type { SceneRecord } from './types'
import { createChronology } from './validate-scenes'

export const chroniaScenes = createChronology([
  {
    id: 'preludio',
    order: 1,
    eyebrow: 'Uma história visual do tempo',
    title: 'Chronia',
    narrative:
      'Do universo jovem à formação da Terra. Uma travessia pelas mudanças de escala que tornaram nosso endereço cósmico possível.',
    temporal: {
      startYearsBeforePresent: 13_800_000_000,
      endYearsBeforePresent: 13_800_000_000,
      displayLabel: 'há cerca de 13,8 bilhões de anos',
      precision: 'approximate',
    },
    scaleSegment: 'cosmic',
    renderer: 'editorial',
    scrollWeight: 0.65,
    uncertainty: {
      kind: 'approximate',
      note: 'A idade do universo é apresentada em valor arredondado.',
    },
    sources: [sources.nasaUniverseOverview],
    accessibility: {
      summary: 'Introdução da jornada entre o universo jovem e a formação da Terra.',
      visualDescription: 'Título Chronia sobre um campo escuro com um pequeno ponto de luz.',
    },
  },
  {
    id: 'big-bang',
    order: 2,
    eyebrow: 'Capítulo 01',
    title: 'O princípio',
    narrative:
      'Há cerca de 13,8 bilhões de anos, o universo observável estava extremamente quente e denso. Sua expansão iniciou a história que ainda conseguimos medir.',
    temporal: {
      startYearsBeforePresent: 13_800_000_000,
      endYearsBeforePresent: 13_800_000_000,
      displayLabel: 'há cerca de 13,8 bilhões de anos',
      precision: 'approximate',
    },
    scaleSegment: 'cosmic',
    renderer: 'remotion',
    scrollWeight: 1.25,
    uncertainty: {
      kind: 'approximate',
      note: 'A idade é arredondada; a física anterior à inflação permanece desconhecida.',
    },
    sources: [sources.nasaUniverseOverview],
    accessibility: {
      summary: 'O universo observável começa quente e denso e passa a se expandir.',
      visualDescription: 'Uma concentração luminosa se expande, esfria e perde intensidade.',
    },
  },
  {
    id: 'expansao',
    order: 3,
    eyebrow: 'Capítulo 02',
    title: 'O espaço se abre',
    narrative:
      'A expansão resfriou o cosmos. Cerca de 380 mil anos após o Big Bang, átomos puderam se formar e a luz passou a viajar livremente: hoje ela chega como fundo cósmico de micro-ondas.',
    temporal: {
      startYearsBeforePresent: 13_800_000_000,
      endYearsBeforePresent: 13_799_620_000,
      displayLabel: 'dos primeiros instantes a cerca de 380 mil anos depois',
      precision: 'approximate',
    },
    scaleSegment: 'cosmic',
    renderer: 'svg',
    scrollWeight: 1.2,
    uncertainty: {
      kind: 'approximate',
      note: 'A recombinação ocorreu durante uma época, não em um instante único.',
    },
    sources: [sources.nasaUniverseOverview],
    accessibility: {
      summary: 'O universo se expande e esfria até se tornar transparente à luz.',
      visualDescription: 'Camadas afastam-se enquanto uma névoa densa dá lugar a ondas de luz.',
    },
  },
  {
    id: 'primeiras-luzes',
    order: 4,
    eyebrow: 'Capítulo 03',
    title: 'As primeiras luzes',
    narrative:
      'Possivelmente a partir de 100 milhões de anos após o Big Bang, nuvens de hidrogênio e hélio colapsaram sob a gravidade. Antes de 400 milhões de anos, estrelas e galáxias jovens já iluminavam o cosmos.',
    temporal: {
      startYearsBeforePresent: 13_700_000_000,
      endYearsBeforePresent: 13_400_000_000,
      displayLabel: 'entre cerca de 100 e 400 milhões de anos após o Big Bang',
      precision: 'range',
    },
    scaleSegment: 'cosmic',
    renderer: 'canvas',
    scrollWeight: 1.35,
    uncertainty: {
      kind: 'range',
      note: 'As primeiras estrelas ainda não foram observadas diretamente; o intervalo reflete modelos e observações de galáxias jovens.',
    },
    sources: [sources.nasaFirstStars, sources.esaCosmicStructure],
    accessibility: {
      summary: 'A gravidade reúne gás primordial e surgem as primeiras estrelas e galáxias.',
      visualDescription: 'Pontos de luz aparecem em regiões densas e formam pequenos agrupamentos.',
    },
  },
  {
    id: 'sistema-solar',
    order: 5,
    eyebrow: 'Capítulo 04',
    title: 'Uma estrela, muitos mundos',
    narrative:
      'Há cerca de 4,6 bilhões de anos, uma nuvem molecular colapsou e se achatou em um disco. O centro tornou-se o Sol; ao redor, matéria acumulou-se em planetas, luas e corpos menores.',
    temporal: {
      startYearsBeforePresent: 4_600_000_000,
      endYearsBeforePresent: 4_570_000_000,
      displayLabel: 'há cerca de 4,6 bilhões de anos',
      precision: 'approximate',
    },
    scaleSegment: 'planetary',
    renderer: 'layered-css',
    scrollWeight: 1.15,
    uncertainty: {
      kind: 'approximate',
      note: 'A formação foi um processo de milhões de anos; o rótulo resume seu início.',
    },
    sources: [sources.nasaSolarSystemFormation],
    accessibility: {
      summary: 'Uma nuvem de gás e poeira forma o Sol e um disco de futuros mundos.',
      visualDescription: 'Um disco de matéria gira ao redor de uma jovem estrela central.',
    },
  },
  {
    id: 'terra',
    order: 6,
    eyebrow: 'Capítulo 05',
    title: 'A Terra',
    narrative:
      'Há cerca de 4,54 bilhões de anos, matéria do disco ao redor do jovem Sol reuniu-se no planeta Terra. Esta etapa termina antes da origem da vida, ainda fora do recorte atual.',
    temporal: {
      startYearsBeforePresent: 4_540_000_000,
      endYearsBeforePresent: 4_500_000_000,
      displayLabel: 'há cerca de 4,54 bilhões de anos',
      precision: 'approximate',
    },
    scaleSegment: 'planetary',
    renderer: 'remotion',
    scrollWeight: 1.2,
    uncertainty: {
      kind: 'approximate',
      note: 'A estimativa isotópica de 4,54 bilhões de anos tem incerteza inferior a 1%.',
    },
    sources: [sources.usgsEarthAge],
    accessibility: {
      summary: 'A acreção de matéria forma a Terra jovem; a narrativa termina antes da vida.',
      visualDescription: 'Fragmentos rochosos se unem em um planeta quente envolto por detritos.',
    },
  },
] as const satisfies readonly SceneRecord[])

export const chroniaChapters = chroniaScenes.slice(1)
export const chroniaPrelude = chroniaScenes[0]
