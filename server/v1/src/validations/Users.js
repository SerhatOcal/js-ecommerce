const Joi = require("joi");

const login = Joi.object({

    password: Joi.string().required().error(errors => {
        errors.forEach(err => {
            switch (err.code) {
                case "any.required":
                    err.message = "Şifre parametresi eksik";
                    break;
                case "string.empty":
                    err.message = "Şifre boş olamaz";
                    break;
                default:
                    break;
            }
        });
        return errors;
    }),

    email: Joi.string().email().required().error(errors => {
        errors.forEach(err => {
            switch (err.code) {
                case "any.required":
                    err.message = "E-Posta parametresi eksik";
                    break;
                case "string.empty":
                    err.message = "E-Posta adresi boş olamaz";
                    break;
                case "string.email":
                    err.message = "Geçerli bir E-Posta adresi giriniz.!";
                    break;
                default:
                    break;
            }
        });
        return errors;
    })
});

const create = Joi.object({

    name: Joi.string().min(3).required().error(errors => {
        errors.forEach(err => {
            switch (err.code) {
                case "any.required":
                    err.message = "Adı parametresi eksik";
                    break;
                case "string.empty":
                    err.message = "Adı değeri boş olamaz";
                    break;
                case "string.min":
                    err.message = `Adı minimum ${err.local.limit} karekter olmalıdır`;
                    break;
                default:
                    break;
            }
        });
        return errors;
    }),

    last_name: Joi.string().min(3).required().error(errors => {
        errors.forEach(err => {
            switch (err.code) {
                case "any.required":
                    err.message = "Soyad parametresi eksik";
                    break;
                case "string.empty":
                    err.message = "Soyad değeri boş olamaz";
                    break;
                case "string.min":
                    err.message = `Soyad minimum ${err.local.limit} karekter olmalıdır`;
                    break;
                default:
                    break;
            }
        });
        return errors;
    }),

    password: Joi.string().min(6).required().error(errors => {
        errors.forEach(err => {
            switch (err.code) {
                case "any.required":
                    err.message = "Şifre parametresi eksik";
                    break;
                case "string.empty":
                    err.message = "Şifre boş olamaz.!";
                    break;
                case "string.min":
                    err.message = `Şifre minimum ${err.local.limit} karekter olmalıdır!`;
                    break;
                default:
                    break;
            }
        });
        return errors;
    }),

    email: Joi.string().email().required().error(errors => {
        errors.forEach(err => {
            switch (err.code) {
                case "any.required":
                    err.message = "E-Posta parametresi eksik";
                    break;
                case "string.empty":
                    err.message = "E-Posta adresi boş olamaz";
                    break;
                case "string.email":
                    err.message = "Geçerli bir E-Posta adresi giriniz";
                    break;
                default:
                    break;
            }
        });
        return errors;
    }),

    phone_number: Joi.number().min(15).error(errors => {
        errors.forEach(err => {
            switch (err.code) {
                case "string.number":
                    err.message = "Telefon numarası sadece sayılardan oluşmalıdır.!";
                    break;
                case "string.min":
                    err.message = `Telefon numrası ${err.local.limit} karekter olmalıdır!`;
                    break;
                default:
                    break;
            }
        });
        return errors;
    }),

    tck_number: Joi.number().min(11).error(errors => {
        errors.forEach(err => {
            switch (err.code) {
                case "string.number":
                    err.message = "TCK numarası sadece sayılardan oluşmalıdır.!";
                    break;
                case "string.min":
                    err.message = `TCK numrası ${err.local.limit} karekter olmalıdır!`;
                    break;
                default:
                    break;
            }
        });
        return errors;
    }),
    gender: Joi.string().max(5),
    date_of_birth: Joi.date(),
    status: Joi.boolean(),
});

const update = Joi.object({

    name: Joi.string().min(3).error(errors => {
        errors.forEach(err => {
            switch (err.code) {
                case "string.empty":
                    err.message = "Adı değeri boş olamaz";
                    break;
                case "string.min":
                    err.message = `Adı minimum ${err.local.limit} karekter olmalıdır`;
                    break;
                default:
                    break;
            }
        });
        return errors;
    }),

    last_name: Joi.string().min(3).error(errors => {
        errors.forEach(err => {
            switch (err.code) {
                case "string.empty":
                    err.message = "Soyad değeri boş olamaz";
                    break;
                case "string.min":
                    err.message = `Soyad minimum ${err.local.limit} karekter olmalıdır`;
                    break;
                default:
                    break;
            }
        });
        return errors;
    }),

    password: Joi.string().min(6).error(errors => {
        errors.forEach(err => {
            switch (err.code) {
                case "string.empty":
                    err.message = "Şifre boş olamaz.!";
                    break;
                case "string.min":
                    err.message = `Şifre minimum ${err.local.limit} karekter olmalıdır!`;
                    break;
                default:
                    break;
            }
        });
        return errors;
    }),

    email: Joi.string().email().error(errors => {
        errors.forEach(err => {
            switch (err.code) {
                case "string.empty":
                    err.message = "E-Posta adresi boş olamaz";
                    break;
                case "string.email":
                    err.message = "Geçerli bir E-Posta adresi giriniz";
                    break;
                default:
                    break;
            }
        });
        return errors;
    }),

    phone_number: Joi.number().min(15).error(errors => {
        errors.forEach(err => {
            switch (err.code) {
                case "string.number":
                    err.message = "Telefon numarası sadece sayılardan oluşmalıdır.!";
                    break;
                case "string.min":
                    err.message = `Telefon numrası ${err.local.limit} karekter olmalıdır!`;
                    break;
                default:
                    break;
            }
        });
        return errors;
    }),

    tck_number: Joi.number().min(11).error(errors => {
        errors.forEach(err => {
            switch (err.code) {
                case "string.number":
                    err.message = "TCK numarası sadece sayılardan oluşmalıdır.!";
                    break;
                case "string.min":
                    err.message = `TCK numrası ${err.local.limit} karekter olmalıdır!`;
                    break;
                default:
                    break;
            }
        });
        return errors;
    }),
    gender: Joi.string().max(5),
    date_of_birth: Joi.date(),
    status: Joi.boolean(),
});

const resetPassword = Joi.object({

    email: Joi.string().email().required().error(errors => {
        errors.forEach(err => {
            switch (err.code) {
                case "any.required":
                    err.message = "E-Posta parametresi eksik";
                    break;
                case "string.empty":
                    err.message = "E-Posta adresi boş olamaz";
                    break;
                case "string.email":
                    err.message = "Geçerli bir E-Posta adresi giriniz";
                    break;
                default:
                    break;
            }
        });
        return errors;
    }),
});

const changePassword = Joi.object({

    password: Joi.string().min(6).required().error(errors => {
        errors.forEach(err => {
            switch (err.code) {
                case "any.required":
                    err.message = "Şifre parametresi eksik";
                    break;
                case "string.empty":
                    err.message = "Şifre boş olamaz.!";
                    break;
                case "string.min":
                    err.message = `Şifre minimum ${err.local.limit} karekter olmalıdır!`;
                    break;
                default:
                    break;
            }
        });
        return errors;
    }),
});

module.exports = {
    login,
    create,
    update,
    resetPassword,
    changePassword
}