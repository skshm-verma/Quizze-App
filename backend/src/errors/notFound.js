const statusCodes = require('../utils/constants');
const CustomAPIError = require('./customApi');


class NotFoundError extends CustomAPIError {
  constructor(message) {
    super(message);
    this.statusCode = statusCodes.NOT_FOUND;
  }
}

module.exports = NotFoundError;