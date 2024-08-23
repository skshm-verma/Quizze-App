const jwt = require('jsonwebtoken');
const statusCodes = require('../utils/constants');

const verifyToken = (req, res ,next) => {
    try{
        const token = req.header('Authorization').split(' ')[1];
        if(!token) return res.status(statusCodes.UNAUTHORIZED).json({message:'Token Not Found'});
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = decoded.id;
        req.userName = decoded.userName;
        next();
    }catch(error){
       return res.status(statusCodes.UNAUTHORIZED).json({message: 'Token Not Found'});
    }
}

module.exports = verifyToken