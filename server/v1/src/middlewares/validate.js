const httpStatus = require("http-status");
const ApiError = require("../errors/ApiErrors");

const validate = (schema) => (req, res, next) => {

	const {value, error} = schema.validate(req.body);

	if (error){
		const errorMessage = error.details?.map(detail => detail.message).join(", ");
        next(new ApiError(errorMessage, httpStatus.OK));
		return;
	}

	Object.assign(req, value);
	return next();
}

module.exports = validate;
