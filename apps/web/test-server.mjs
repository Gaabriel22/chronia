import { createServer } from 'node:http'
import { fileURLToPath } from 'node:url'

import createNextApplication from 'next'

const hostname = '127.0.0.1'
const port = 3000
const directory = fileURLToPath(new URL('.', import.meta.url))
const application = createNextApplication({ dev: true, dir: directory, hostname, port })
const handleRequest = application.getRequestHandler()

await application.prepare()

const server = createServer((request, response) => handleRequest(request, response))

server.listen(port, hostname, () => {
  console.log(`Chronia test server ready at http://${hostname}:${port}`)
  process.send?.({ type: 'ready' })
})

let isShuttingDown = false

async function shutdown() {
  if (isShuttingDown) return
  isShuttingDown = true

  const forceExit = setTimeout(() => process.exit(0), 2_000)
  forceExit.unref()

  await new Promise((resolve) => server.close(resolve))
  await application.close()
  process.exit(0)
}

process.once('SIGINT', shutdown)
process.once('SIGTERM', shutdown)
process.on('message', (message) => {
  if (message?.type === 'shutdown') void shutdown()
})
