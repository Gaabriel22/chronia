export const visualTokens = {
  color: {
    ink: '#07070a',
    surface: '#101116',
    mist: '#aaa6a0',
    starlight: '#f4efe6',
    ember: '#e8a36a',
    aurora: '#9cc8bb',
  },
  font: {
    display: "'Cormorant Garamond', Georgia, serif",
    reading: "'Manrope', 'Segoe UI', sans-serif",
  },
  space: {
    page: 'clamp(1.25rem, 4vw, 4rem)',
    section: 'clamp(5rem, 14vw, 12rem)',
  },
  layer: {
    content: 10,
    navigation: 40,
    overlay: 60,
  },
  breakpoint: {
    narrow: 480,
    wide: 1440,
  },
  motion: {
    duration: {
      fast: 180,
      base: 420,
      slow: 900,
    },
    easing: {
      enter: 'cubic-bezier(0.16, 1, 0.3, 1)',
      exit: 'cubic-bezier(0.7, 0, 0.84, 0)',
    },
  },
} as const

export const colors = visualTokens.color

export type VisualTokens = typeof visualTokens
