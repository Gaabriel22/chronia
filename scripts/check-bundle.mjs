import { existsSync, readFileSync } from 'node:fs'

const buildManifestPath = 'apps/web/.next/build-manifest.json'

if (!existsSync(buildManifestPath)) {
  throw new Error('Build manifest missing. Run pnpm build before bundle:check.')
}

const manifest = readFileSync(buildManifestPath, 'utf8')
const forbiddenDependencies = ['three', '@react-three/fiber', 'lenis', 'remotion']
const leakedDependency = forbiddenDependencies.find((dependency) => manifest.includes(dependency))

if (leakedDependency) {
  throw new Error(`Forbidden initial web dependency detected: ${leakedDependency}`)
}

console.log('Web build manifest contains no forbidden runtime dependencies.')
