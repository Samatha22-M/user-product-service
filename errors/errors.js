module.exports = {
  NotFound: {
    message: "Not Found",
    customCode: "NOT_FOUND",
    statusCode: 404
  },
  Internal: {
    message: "Internal Server Error",
    customCode: "INTERNAL_SERVER_ERROR",
    statusCode: 500
  },
  ValidationError: {
    message: "Validation Error",
    customCode: "VALIDATION_ERROR",
    statusCode: 412
  },
  BadRequest: {
    message: "Bad Request",
    customCode: "BAD_REQUEST",
    statusCode: 400
  },
  InvalidArguments: {
    message: "InvalidArguments",
    customCode: "INVALID_ARGUMENTS",
    statusCode: 400
  },
  AlreadyExists: {
    message: "Already Exists",
    customCode: "ALREADY EXISTS",
    statusCode: 409
  },
}