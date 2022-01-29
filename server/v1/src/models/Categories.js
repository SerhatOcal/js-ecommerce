const { DataTypes } = require("sequelize");
const SequelizeSlugify = require("sequelize-slugify");
const sequelize = require("../loaders/database");
const logger = require("../scripts/logger/Categories");

const CategorySchema = sequelize.define("categories", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    parent_id: {
        type: DataTypes.INTEGER,
    },
    name: {
        type: DataTypes.STRING(25),
        unique: {
            msg: 'Bu Kategori daha önce kayıt edilmiş.!'
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
    top_description: {
        type: DataTypes.TEXT,
    },
    sub_description: {
        type: DataTypes.TEXT,
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

SequelizeSlugify.slugifyModel(CategorySchema, {
    source: ['name']
});

CategorySchema.sync();

/*BrandSchema.addHook("beforeCreate", (instance) => {
  console.log("Öncesi", instance);
});*/

CategorySchema.addHook("afterCreate", (instance) => {
    logger.log({
        level: "info",
        message: instance
    });
});

module.exports = CategorySchema;
