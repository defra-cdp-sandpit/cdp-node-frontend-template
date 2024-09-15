import { statusCodes } from '~/src/server/common/constants/status-codes.js'
import { startServer } from '~/src/server/common/helpers/start-server.js'

describe('#serveStaticFiles', () => {
  let server

  describe('When secure context is disabled', () => {
    beforeEach(async () => {
      server = await startServer()
    })

    afterEach(async () => {
      await server.stop({ timeout: 0 })
    })

    test('Should serve favicon as expected', async () => {
      const { statusCode } = await server.inject({
        method: 'GET',
        url: '/favicon.ico'
      })

      expect(statusCode).toBe(statusCodes.noContent)
    })

    test('Should serve assets as expected', async () => {
      const { statusCode } = await server.inject({
        method: 'GET',
        url: '/public/assets/images/govuk-crest.png'
      })

      expect(statusCode).toBe(statusCodes.ok)
    })
  })
})