const JWT = require('jsonwebtoken');

let auth = (req,res,next) => {
    const token = req.header('auth-token');
    if(!token){
        return res.status(401).json({message: 'No token, authorization denied'});
    } try{
        const decoded = JWT.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch(e){
        return res.status(401).json({message: 'Token is not valid'});
    }
}

module.exports = auth;