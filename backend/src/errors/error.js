const CustomAPIError = require('./customApi');
const BadRequestError = require('./badRequest');
const UnauthenticatedError = require('./unauthenticated');
const NotFoundError= require('./notFound');

module.exports = {
    CustomAPIError,
    UnauthenticatedError,
    BadRequestError,
    NotFoundError
}