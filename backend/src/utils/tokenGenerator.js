const jwt = require('jsonwebtoken');

const generateToken = (id, userName) => {
    const payload = { id, userName };
    const token = jwt.sign(payload, process.env.JWT_SECRET);
    return token;
}

module.exports = { generateToken } ;