import { spawn } from 'node:child_process'
import { createRequire } from 'node:module'
import { fileURLToPath } from 'node:url'

const require = createRequire(import.meta.url)
const playwrightCli = require.resolve('@playwright/test/cli')
const serverEntry = fileURLToPath(new URL('../apps/web/test-server.mjs', import.meta.url))

const server = spawn(process.execPath, [serverEntry], {
  stdio: ['ignore', 'inherit', 'inherit', 'ipc'],
  windowsHide: true,
})

function waitForServer() {
  return new Promise((resolve, reject) => {
    server.once('error', reject)
    server.once('exit', (code) => reject(new Error(`Test server exited early with code ${code}`)))
    server.on('message', (message) => {
      if (message?.type === 'ready') resolve()
    })
  })
}

function runPlaywright() {
  return new Promise((resolve, reject) => {
    const testProcess = spawn(process.execPath, [playwrightCli, 'test', ...process.argv.slice(2)], {
      env: { ...process.env, CHRONIA_EXTERNAL_WEB_SERVER: '1' },
      stdio: 'inherit',
      windowsHide: true,
    })

    testProcess.once('error', reject)
    testProcess.once('exit', (code) => resolve(code ?? 1))
  })
}

function stopServer() {
  return new Promise((resolve) => {
    const forceExit = setTimeout(() => {
      server.kill()
      resolve()
    }, 5_000)

    server.once('exit', () => {
      clearTimeout(forceExit)
      resolve()
    })
    server.send({ type: 'shutdown' })
  })
}

let exitCode = 1

try {
  await waitForServer()
  exitCode = await runPlaywright()
} finally {
  await stopServer()
}

process.exitCode = exitCode
