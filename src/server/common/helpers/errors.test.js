import { createServer } from '~/src/server/index.js'
import { statusCodes } from '~/src/server/common/constants/status-codes.js'
import { catchAll } from '~/src/server/common/helpers/errors.js'

describe('#errors Server', () => {
  /** @type {Server} */
  let server

  beforeAll(async () => {
    server = await createServer()
    await server.initialize()
  })

  afterAll(async () => {
    await server.stop({ timeout: 0 })
  })

  test('Should provide expected Not Found page', async () => {
    const { result, statusCode } = await server.inject({
      method: 'GET',
      url: '/non-existent-path'
    })

    expect(result).toEqual(
      expect.stringContaining('Page not found | CDP Node.js Frontend Template')
    )
    expect(statusCode).toBe(statusCodes.notFound)
  })
})

describe('#catchAll', () => {
  const mockErrorLogger = jest.fn()
  const mockRequest = (statusCode) => ({
    response: {
      isBoom: true,
      stack: 'Mock error stack',
      output: {
        statusCode
      }
    },
    logger: { error: mockErrorLogger }
  })
  const mockToolkitView = jest.fn()
  const mockToolkitCode = jest.fn()
  const mockToolkit = {
    view: mockToolkitView.mockReturnThis(),
    code: mockToolkitCode.mockReturnThis()
  }

  test('Should provide expected "Not Found" page', () => {
    // @ts-expect-error - Testing purposes only
    catchAll(mockRequest(statusCodes.notFound), mockToolkit)

    expect(mockErrorLogger).toHaveBeenCalledWith('Mock error stack')
    expect(mockToolkitView).toHaveBeenCalledWith('error/index', {
      pageTitle: 'Page not found',
      heading: statusCodes.notFound,
      message: 'Page not found'
    })
    expect(mockToolkitCode).toHaveBeenCalledWith(statusCodes.notFound)
  })

  test('Should provide expected "Forbidden" page', () => {
    // @ts-expect-error - Testing purposes only
    catchAll(mockRequest(statusCodes.forbidden), mockToolkit)

    expect(mockErrorLogger).toHaveBeenCalledWith('Mock error stack')
    expect(mockToolkitView).toHaveBeenCalledWith('error/index', {
      pageTitle: 'Forbidden',
      heading: statusCodes.forbidden,
      message: 'Forbidden'
    })
    expect(mockToolkitCode).toHaveBeenCalledWith(statusCodes.forbidden)
  })

  test('Should provide expected "Unauthorized" page', () => {
    // @ts-expect-error - Testing purposes only
    catchAll(mockRequest(statusCodes.unauthorized), mockToolkit)

    expect(mockErrorLogger).toHaveBeenCalledWith('Mock error stack')
    expect(mockToolkitView).toHaveBeenCalledWith('error/index', {
      pageTitle: 'Unauthorized',
      heading: statusCodes.unauthorized,
      message: 'Unauthorized'
    })
    expect(mockToolkitCode).toHaveBeenCalledWith(statusCodes.unauthorized)
  })

  test('Should provide expected "Bad Request" page', () => {
    // @ts-expect-error - Testing purposes only
    catchAll(mockRequest(statusCodes.badRequest), mockToolkit)

    expect(mockErrorLogger).toHaveBeenCalledWith('Mock error stack')
    expect(mockToolkitView).toHaveBeenCalledWith('error/index', {
      pageTitle: 'Bad Request',
      heading: statusCodes.badRequest,
      message: 'Bad Request'
    })
    expect(mockToolkitCode).toHaveBeenCalledWith(statusCodes.badRequest)
  })

  test('Should provide expected default page', () => {
    // @ts-expect-error - Testing purposes only
    catchAll(mockRequest(statusCodes.imATeapot), mockToolkit)

    expect(mockErrorLogger).toHaveBeenCalledWith('Mock error stack')
    expect(mockToolkitView).toHaveBeenCalledWith('error/index', {
      pageTitle: 'Something went wrong',
      heading: statusCodes.imATeapot,
      message: 'Something went wrong'
    })
    expect(mockToolkitCode).toHaveBeenCalledWith(statusCodes.imATeapot)
  })
})

/**
 * @import { Server } from '@hapi/hapi'
 */