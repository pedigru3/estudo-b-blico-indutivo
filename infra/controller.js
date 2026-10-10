import {
  ConflictError,
  ForbiddenError,
  InternalServerError,
  MethodNotAllowedError,
  NotFoundError,
  ServiceError,
  UnauthorizedError,
  ValidationError,
} from "infra/errors.js"

function onErrorHandler(error, request, response) {
  if (
    error instanceof ValidationError ||
    error instanceof NotFoundError ||
    error instanceof ConflictError ||
    error instanceof ForbiddenError ||
    error instanceof ServiceError
  ) {
    return response.status(error.statusCode).json(error)
  }

  if (error instanceof UnauthorizedError) {
    return response.status(error.statusCode).json(error)
  }

  const publicErrorObject = new InternalServerError({
    cause: error,
  })

  console.error(error)

  response.status(publicErrorObject.statusCode).json(publicErrorObject)
}

function onNoMatchHanler(request, response) {
  const publicErrorObject = new MethodNotAllowedError()

  response.status(publicErrorObject.statusCode).json(publicErrorObject)
}

const controller = {
  errorHandlers: {
    onError: onErrorHandler,
    onNoMatch: onNoMatchHanler,
  },
}

export default controller
