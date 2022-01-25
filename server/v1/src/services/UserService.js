const BaseService = require('./BaseService');
const Model = require('../models/Users');

class UserService extends BaseService {

    constructor(){
        super(Model);
    }
    
    logined(data){
        return Model.findOne({ where: { email: data.email, password: data.password } });
    }

    chancePassworded(email){
        return Model.findOne({ where: { email: email } });
    }

    resetPassworded(data, password){
        return Model.update({ password: password, }, { where: { email: data }, })
            .then(() => { return Model.findOne({ where: { email: data } }) })
            .catch((error) => { return { error: error.message } });
    }

}

module.exports = new UserService();