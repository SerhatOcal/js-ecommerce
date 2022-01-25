const httpStatus = require("http-status");
const { imageUpload } = require("../scripts/utils/helper");
const BrandService = require("../services/BrandService");
const ApiError = require("../errors/ApiErrors");

class BrandController {

    read(req, res) {
        BrandService.readed()
            .then((response) => {res.status(httpStatus.OK).send(response);})
            .catch((error) => {res.status(httpStatus.BAD_REQUEST).send(error);});
    }

    listOne(req, res){

        if (!req.params?.id) {
            return res.status(httpStatus.BAD_REQUEST).send({ message: "ID bilgisi eksik"});
        }

        BrandService.listOne(req.params.id)
        .then((response) => {res.status(httpStatus.OK).send({ response });})
        .catch((error) => {res.status(httpStatus.INTERNAL_SERVER_ERROR).send(error);});
    }

    async create(req, res){

        if(req?.files?.image) req.body.image_name = await imageUpload(req?.files?.image, "brands");
        BrandService.created(req.body)
            .then((response) => {res.status(httpStatus.CREATED).send({success:true, message:'Kayıt Yapıldı'});})
            .catch((error) => {res.status(httpStatus.OK).send(error);});
    }

    update(req, res, next) {
        if (!req.params?.id) {
            return res.status(httpStatus.BAD_REQUEST).send({ message: "ID bilgisi eksik", });
        }
        req.body.image_name = imageUpload(req?.files?.image, "brands");
        BrandService.updated(req.body, req.params.id)
            .then((response) => {
                if(!response[0]){
                    return next(new ApiError("Kayıt bulunamadı", httpStatus.NOT_FOUND));
                }
                res.status(httpStatus.OK).send(response[0]);
        })
        .catch((error) => next(new ApiError(error?.message)));
    }

    deleted(req, res){
        BrandService.deleted(req.params.id)
            .then((response) => {res.status(httpStatus.OK).send({success:true, message:'Kayıt Silindi'})})
            .catch((error) => {res.status(httpStatus.OK).send(error);});
    }
}

module.exports = new BrandController();