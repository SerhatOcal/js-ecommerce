const BaseService = require('./BaseService');
const Model = require('../models/Brands');

class BrandService extends BaseService {
    constructor(){
        super(Model);
    }
}

module.exports = new BrandService();