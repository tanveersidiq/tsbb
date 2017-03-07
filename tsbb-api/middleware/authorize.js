var jwt = require("jsonwebtoken");
var authorize = function (req, res, next) {

    var token = req.body.token || req.query.token || req.headers['authorization'];

    if (token) {

        jwt.verify(token, process.env.JWT_SECRET, function (err, decoded) {
            if (err) {
                return res.status(403).json({
                    success: false,
                    message: 'Failed to authenticate token.'
                });
            } else {
                req.userId = decoded.id;
                next();
            }
        });

    } else {

        return res.status(403).send({
            success: false,
            message: 'No token provided.'
        });

    }
};

module.exports = authorize;