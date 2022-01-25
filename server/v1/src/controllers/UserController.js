const httpStatus = require("http-status");
const uuid = require("uuid");
const eventEmitter = require("../scripts/events/eventEmitter");
const UserService = require("../services/UserService")
const Authentication = require("../middlewares/Authentication");

class UserController {

    read(req, res){
        UserService.readed()
            .then((response) => {res.status(httpStatus.OK).send(response); })
            .catch((error) => { res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ error: { message: error.message } }) });
    }

    create(req, res){
        req.body.password = Authentication.generatepasswordHash(req.body.password);
        UserService.created(req.body)
            .then((response) => {
                if (!response.error) return res.status(httpStatus.CREATED).send({ message: 'Kayıt Yapıldı' });
                res.status(httpStatus.OK).send({ error: { message: response.error } });
            })
            .catch((error) => { res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ error: { message: error.message } }) });
    }

    update(req, res){
        UserService.updated(req.body, req.params?.id)
            .then((response) => {
                if (response[0] == 1) return res.status(httpStatus.OK).send({ message: 'Güncelleme Yapıldı' });
                res.status(httpStatus.OK).send({ error: { message: 'Hata oluştu' } });
            })
            .catch((error) => { res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ error: { message: error.message } }) });
    }

    deleted(req, res){
        UserService.deleted(req.params?.id)
            .then((response) => {
                if (response == 1) return res.status(httpStatus.OK).send({ message: 'Silme İşlemi Yapıldı' });
                res.status(httpStatus.OK).send({ error: { message: 'Hata oluştu' } }); 
            })
            .catch((error) => { res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ error: { message: error.message } }) });
    }

    login(req, res) {
        req.body.password = Authentication.generatepasswordHash(req.body.password);
        UserService.logined(req.body)
            .then((user) => {

                if (!user) return res.status(httpStatus.NOT_FOUND).send({ error: { message: 'Kullanıcı bulunamadı.' } });

                let access_token = Authentication.generateAccessToken(req.body.email);
                let refresh_token = Authentication.generateRefreshToken(req.body.email);

                user = {
                    tokens: {
                        access_token: access_token,
                        refresh_token: refresh_token,
                    }
                }
                res.status(httpStatus.OK).send(user);
            })
            .catch((error) => { res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ error: { message: error.message } }) });
    }

    async changePassword(req, res){
        req.body.password = Authentication.generatepasswordHash(req.body.password);
        await UserService.chancePassworded(req.user.name)
        .then((response) => {
            if (!response.id > 0) return res.status(httpStatus.NOT_FOUND).send({ error: { message: 'Kullanıcı bulunamadı' } });
            UserService.updated(req.body, response.id)
                .then((response) => {res.status(httpStatus.OK).send({ message : 'Şifre değiştirildi'}) })
                .catch((error) => { res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ error: { message: error.message } }) });
        })
        .catch((error) => { res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ error: { message: error.message } }) });
    }

    resetPassword(req, res){
        const new_password = UserController.newPassword();
        UserService.resetPassworded(req.body.email, Authentication.generatepasswordHash(new_password))
            .then((response) => {
                if (!response) return res.status(httpStatus.NOT_FOUND).send({ error: {message : "Böyle bir kullanıcı bulunmamaktadır" }});
                eventEmitter.emit("send_email", {
                    to: response.email,
                    subject: "Şifre Sıfırlama",
                    html: `Talebiniz üzerine şifre sıfırlama işleminiz gerçekleşmiştir. <br /> Giriş yaptıktan sonra şifrenizi değiştirmeyi unutmayınız. <br /> Yeni Şifreniz : <b>${new_password}</b>`
                });
                res.status(httpStatus.OK).send({ message: 'Sistemde kayıtlı e-posta adresine bilgiler gönderilmiştir.' });
            })
            .catch((error) => { res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ error: { message: error.message } }) });
    }

    static newPassword(){
        return uuid.v4()?.split("-")[0] || `user-${new Date().getTime()}`;
    }
}


module.exports = new UserController();
