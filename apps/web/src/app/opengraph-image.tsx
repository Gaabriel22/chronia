import { ImageResponse } from 'next/og'

export const alt = 'Chronia — uma história visual do tempo'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        alignItems: 'flex-start',
        background: '#07070a',
        color: '#f4efe6',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        justifyContent: 'space-between',
        padding: '72px 80px',
        width: '100%',
      }}
    >
      <div style={{ color: '#e8a36a', display: 'flex', fontSize: 24, letterSpacing: 7 }}>
        UMA HISTÓRIA VISUAL DO TEMPO
      </div>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div style={{ fontFamily: 'Georgia', fontSize: 176, letterSpacing: -12, lineHeight: 0.8 }}>
          Chronia
        </div>
        <div style={{ color: '#aaa6a0', display: 'flex', fontSize: 30, marginTop: 48 }}>
          Do primeiro instante à formação da Terra
        </div>
      </div>
    </div>,
    size,
  )
}
