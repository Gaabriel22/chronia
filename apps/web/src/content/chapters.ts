export interface ChapterShellContent {
  readonly id: string
  readonly eyebrow: string
  readonly title: string
  readonly introduction: string
}

export const chapterShellContent = [
  {
    id: 'big-bang',
    eyebrow: 'Capítulo 01',
    title: 'O princípio',
    introduction: 'Uma origem sem testemunhas, preservada nas marcas que o universo ainda carrega.',
  },
  {
    id: 'expansao',
    eyebrow: 'Capítulo 02',
    title: 'O espaço se abre',
    introduction:
      'A distância ganha escala. A narrativa começa a medir aquilo que parece impossível.',
  },
  {
    id: 'primeiras-luzes',
    eyebrow: 'Capítulo 03',
    title: 'As primeiras luzes',
    introduction:
      'No escuro profundo, matéria e gravidade preparam os primeiros pontos de referência.',
  },
  {
    id: 'sistema-solar',
    eyebrow: 'Capítulo 04',
    title: 'Uma estrela, muitos mundos',
    introduction: 'A escala muda. Entre poeira e órbitas, nosso endereço começa a tomar forma.',
  },
  {
    id: 'terra',
    eyebrow: 'Capítulo 05',
    title: 'A Terra',
    introduction:
      'A jornada cósmica encontra um planeta — ainda jovem, extremo e em transformação.',
  },
] as const satisfies readonly ChapterShellContent[]
