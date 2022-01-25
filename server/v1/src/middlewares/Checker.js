const ApiError = require("../errors/ApiErrors");
const httpStatus = require("http-status");

class Checker {

    IdChecker = (req, res, next) => {
        /*  if (isNaN(Number(req.params.id))) { */
        if (!req?.params?.id?.match(/^[1-9]/)) {
            return next(new ApiError("ID bilgisi geçersiz", httpStatus.BAD_REQUEST));
        }
        next();
    }
}

module.exports = new Checker();