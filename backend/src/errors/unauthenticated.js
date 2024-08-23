const statusCodes = require('../utils/constants');
const CustomAPIError = require('./customApi');


class UnauthenticatedError extends CustomAPIError {
    constructor(message) {
      super(message);
      this.statusCode = statusCodes.UNAUTHORIZED;
    }
  }
  
  module.exports = UnauthenticatedError;