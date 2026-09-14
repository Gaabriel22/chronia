import { AbsoluteFill, Composition } from 'remotion'

function FoundationFrame() {
  return (
    <AbsoluteFill
      style={{
        alignItems: 'center',
        backgroundColor: '#05060a',
        color: '#f3f0e8',
        display: 'flex',
        fontFamily: 'serif',
        fontSize: 96,
        justifyContent: 'center',
      }}
    >
      Chronia
    </AbsoluteFill>
  )
}

export function RemotionRoot() {
  return (
    <Composition
      component={FoundationFrame}
      durationInFrames={90}
      fps={30}
      height={1080}
      id="FoundationFrame"
      width={1920}
    />
  )
}
