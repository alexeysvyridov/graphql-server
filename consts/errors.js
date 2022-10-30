const ErrorNames = {
  USER_ALREADY_EXISTS: 'USER_ALREADY_EXISTS',
  SERVER_ERROR: 'SERVER_ERROR',
  VALIDATION_ERROR: 'VALIDATION_ERROR',
  LOGIN_ERROR: 'LOGIN_ERROR',
  USER_IS_NOT_EXISTS: 'USER_IS_NOT_EXISTS',
};

const ErrorTypes = {
  USER_ALREADY_EXISTS: {
    message: 'User is already exists.',
    statusCode: 403
  },
  USER_IS_NOT_EXISTS: {
    message: 'User is not exists.',
    statusCode: 403
  },
  SERVER_ERROR: {
    message: 'Server error.',
    statusCode: 500
  },
  VALIDATION_ERROR: {
    message: 'Validation Error',
    statusCode: 400
  },
  LOGIN_ERROR: {
    message: 'email or password is invalid',
    statusCode: 400
  }
}
const getErrorCode = (errorName) => {
  return ErrorTypes[errorName]
}
module.exports = {
  getErrorCode,
  ErrorNames
};