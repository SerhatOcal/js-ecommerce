const { DataTypes} = require("sequelize");
const SequelizeSlugify = require("sequelize-slugify");
const sequelize  = require("../loaders/database");
const logger = require("../scripts/logger/Brands");

const BrandSchema = sequelize.define("Brand", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING(25),
    unique: {
        msg: 'Bu Marka daha önce kayıt edilmiş.!'
    }
  },
  slug: {
    type: DataTypes.STRING(25),
    unique: {
        msg: 'Bu Slug daha önce kayıt edilmiş.!'
    }
  },
  status: {
    type: DataTypes.BOOLEAN,
    defaultValue: 1,
  },
  sort: {
    type: DataTypes.INTEGER(11),
    defaultValue: 999
  },
  image_name: {
    type: DataTypes.STRING(55),
  },
  meta_title: {
    type: DataTypes.STRING(255),
  },
  meta_description: {
    type: DataTypes.STRING(255),
  },
  meta_keywords: {
    type: DataTypes.STRING(255),
  },
});

SequelizeSlugify.slugifyModel(BrandSchema, {
    source: ['name']
});

BrandSchema.sync();

/*BrandSchema.addHook("beforeCreate", (instance) => {
  console.log("Öncesi", instance);
});*/

BrandSchema.addHook("afterCreate", (instance) => {
  logger.log({
    level : "info",
    message : instance
  });
});

module.exports = BrandSchema;
