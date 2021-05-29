const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function (req, res, next) {
    // get the token from the header// header a token response theke
    // niye dawa sejonno request a dekhasse

    const token = req.header('x-auth-token');// userid and expiriDate
    // niye server j token ta baniyeche seta

    // check if not token
    if (!token) {
        return res.status(401).json({ msg: "No token, authorization denied " });
    }
    // verify token

    try {
        const decoded = jwt.verify(token, config.get('jwtSecret'));
        //the main thing
        req.user = decoded.user; //to get the userId; it is actually a userId ;  it will be used in the routes
        next();
    } catch (err) {
        res.status(401).json({ msg: 'Token is not valid' });
    }
}