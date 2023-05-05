import { appConfig } from '~/src/config'
import { createServer } from '~/src/app/server'
import { createLogger } from '~/src/common/helpers/logger'

const logger = createLogger()

process.on('unhandledRejection', (error) => {
  logger.info('Unhandled rejection', error)
  process.exit(1)
})

async function startServer() {
  const server = await createServer()
  await server.start()

  logger.info('Server started successfully')
  logger.info(
    `Access your frontend on http://localhost:${appConfig.get(
      'port'
    )}${appConfig.get('appPathPrefix')}`
  )
}

startServer().catch((error) => {
  logger.info('Server failed to start :(')
  logger.error(error)
})