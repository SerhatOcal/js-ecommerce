const { DataTypes} = require("sequelize");
const  sequelize  = require("../loaders/database");
const logger = require("../scripts/logger/Users");

const UserSchema = sequelize.define("User", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING(25),
  },
  last_name: {
    type: DataTypes.STRING(25),
  },
  password: {
    type: DataTypes.STRING(100),
  },
  email: {
    type: DataTypes.STRING(25),
    unique: {
      msg: 'E-Posta adresi daha önce kayıt edilmiş.!'
    }
  },
  phone_number: {
    type: DataTypes.INTEGER(15),
  },
  tck_number: {
    type: DataTypes.INTEGER(15),
  },
  gender: {
    type: DataTypes.STRING(5),
  },
  date_of_birth: {
    type: DataTypes.DATE,
  },
  status: {
    type: DataTypes.BOOLEAN,
    defaultValue: 1,
  },
});

UserSchema.sync();

//sorgu öncesi
/*BrandSchema.addHook("beforeCreate", (instance) => {
  console.log("Sorgu Öncesi", instance);
});*/

//Sorgu sonrası
UserSchema.addHook("afterCreate", (instance) => {
  logger.log({
    level : "info",
    message : instance
  });
});

module.exports = UserSchema;
