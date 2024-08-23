const statusCodes = require('../utils/constants');

const notFound = (req, res) => res.status(statusCodes.NOT_FOUND).send('Route does not exist')

module.exports = notFound
