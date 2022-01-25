const CryptoJS = require("crypto-js");
const JWT = require("jsonwebtoken");
const httpStatus = require("http-status");
const ApiError = require("../errors/ApiErrors");

class Authentication {

    authenticated(req, res, next) {
        const authHeader = req.headers["authorization"];
        const token = authHeader && authHeader.split(" ")[1] || null;

        if (token === null) {
            return next(new ApiError("Token bulunamadı", httpStatus.UNAUTHORIZED));
        }

        JWT.verify(token, process.env.SECRET_ACCESS_TOKEN_KEY, (error, user) => {
            if (error) return next(new ApiError(error.message, httpStatus.UNAUTHORIZED));
            req.user = user;
            next();
        });
    }
    
    generateAccessToken(email){
        return JWT.sign({ name: email}, process.env.SECRET_ACCESS_TOKEN_KEY, { expiresIn: "1w" });

    }

    generateRefreshToken(email){
        return JWT.sign({ name: email }, process.env.REFRESH_ACCESS_TOKEN_KEY, { expiresIn: "1w" });
    }

    generatepasswordHash (password){
        return CryptoJS.HmacSHA256(password, CryptoJS.HmacSHA1(password, process.env.PASSWORD_HASH).toString()).toString();
    }
}

module.exports = new Authentication();