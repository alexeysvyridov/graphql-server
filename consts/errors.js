const ErrorNames = {
  USER_ALREADY_EXISTS: 'USER_ALREADY_EXISTS',
  SERVER_ERROR: 'SERVER_ERROR'
};

const ErrorTypes = {
  USER_ALREADY_EXISTS: {
    message: 'User is already exists.',
    statusCode: 403
  },
  SERVER_ERROR: {
    message: 'Server error.',
    statusCode: 500
  }
}
const getErrorCode = (errorName) => {
  return ErrorTypes[errorName]
}
module.exports = {
  getErrorCode,
  ErrorNames
};