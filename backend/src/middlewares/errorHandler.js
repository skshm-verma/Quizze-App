const statusCodes = require('../utils/constants');
const { CustomAPIError } = require('../errors/error');

const errorHandler = (err, req, res, next) => {
  // console.error('Error: ', err); // Log the error for debugging purposes

  if (err instanceof CustomAPIError) {
    return res.status(err.statusCode).json({ msg: err.message })
  }

  let customError = {
    statusCode: err.statusCode || statusCodes.INTERNAL_SERVER_ERROR,
    message: err || 'Something went wrong try again later'
  }

  if (err.code && err.code === 11000) {
    customError.message = `Duplicate value entered`
    customError.statusCode = 400
  }


  return res.status(customError.statusCode).json({ msg: customError.message })
}

module.exports = errorHandler;