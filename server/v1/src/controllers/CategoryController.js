const httpStatus = require("http-status");
const CategoryService = require("../services/CategoryService");
const ApiError = require("../errors/ApiErrors");

class CategoryController {

    read(req, res) {
        CategoryService.readed()
            .then((response) => {res.status(httpStatus.OK).send(response);})
            .catch((error) => {res.status(httpStatus.BAD_REQUEST).send(error);});
    }

    readOne(req, res){
        CategoryService.readedOne(req.params.id)
            .then((response) => {res.status(httpStatus.OK).send(response)})
            .catch((error) => { res.status(httpStatus.BAD_REQUEST).send(error);});
    }

    create(req, res){
        CategoryService.created(req.body)
            .then(() => {res.status(httpStatus.CREATED).send({success:true, message:'Kayıt Yapıldı'})})
            .catch((error) => {res.status(httpStatus.OK).send(error);});
    }

    update(req, res, next) {
        CategoryService.updated(req.body, req.params.id)
            .then((response) => {
                if(!response[0]){
                    return next(new ApiError("Kayıt bulunamadı", httpStatus.NOT_FOUND));
                }
                res.status(httpStatus.OK).send({ success: true, message: 'Kayıt Güncellendi' });
        })
        .catch((error) => next(new ApiError(error?.message)));
    }

    deleted(req, res){
        CategoryService.deleted(req.params.id)
            .then((response) => {res.status(httpStatus.OK).send({success:true, message:'Kayıt Silindi'})})
            .catch((error) => {res.status(httpStatus.OK).send(error);});
    }
}

module.exports = new CategoryController();