const Joi = require("joi");

const create = Joi.object({
	name: Joi.string().min(2).required().error(errors => {
        errors.forEach(err => {
            switch (err.code) {
                case "any.required":
                    err.message = "Marka adı olmak zorunda.!";
                    break;
                case "string.empty":
                    err.message = "Marka Adı boş olamaz";
                    break;
                case "string.min":
                    err.message = `Marka Adı minimum ${err.local.limit} karekter olmalıdır!`;
                    break;
                default:
                    break;
            }
        });
        return errors;
		}),
  status: Joi.optional(),
  sort: Joi.optional(),
  slug: Joi.optional(),
  image_name: Joi.optional(),
  image: Joi.optional(),
  files: Joi.optional(),
  meta_title: Joi.optional(),
  meta_description: Joi.optional(),
  meta_keywords: Joi.optional()
});

const update = Joi.object({
	name: Joi.string().min(2).required().error(errors => {
        errors.forEach(err => {
            switch (err.code) {
                case "any.required":
                    err.message = "Marka adı olmak zorunda.!";
                    break;
                case "string.empty":
                    err.message = "Marka Adı boş olamaz";
                    break;
                case "string.min":
                    err.message = `Marka Adı minimum ${err.local.limit} karekter olmalıdır!`;
                    break;
                default:
                    break;
            }
        });
        return errors;
    }),
    status: Joi.optional(),
    sort: Joi.optional(),
    slug: Joi.optional(),
    image_name: Joi.optional(),
    image: Joi.optional(),
    meta_title: Joi.optional(),
    meta_description: Joi.optional(),
    meta_keywords: Joi.optional()
});

module.exports = {
    create,
    update
}


