const BaseService = require('./BaseService');
const Model = require('../models/Categories');

class CategoryService extends BaseService {
    constructor(){
        super(Model);
    }
}

module.exports = new CategoryService();