BaseModel = null;

class BaseService {
    constructor(Model){
        this.BaseModel = Model;
    }

    readed(where){
        return this.BaseModel?.findAll(where || {})
    }

    readedOne(id) {
        return this.BaseModel?.findOne({ where: { id: id } })
    }

    created(data){
        return new this.BaseModel(data).save();
    }

    updated(data, id){
        return this.BaseModel?.update(data, { where: { id: id } });
    }
    
    deleted(id){
        return this.BaseModel?.destroy({ where: { id: id } });
    }
}

module.exports = BaseService;
