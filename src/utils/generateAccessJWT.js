const jwt = require('jsonwebtoken');

function generateAccessJWT (payload, secret, duration) {
    return jwt.sign(payload, secret, {
        expiresIn: duration
    });
}

module.exports = generateAccessJWT;