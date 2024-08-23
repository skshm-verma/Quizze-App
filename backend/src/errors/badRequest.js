const statusCodes = require('../utils/constants');
const CustomAPIError = require('./customApi');


class BadRequestError extends CustomAPIError {
  constructor(message) {
    super(message);
    this.statusCode = statusCodes.BAD_REQUEST;
  }
}

module.exports = BadRequestError;