const Sequelize = require('sequelize');

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
  host: process.env.DB_HOST,
  dialect: process.env.DB,
  logging: false
});

async function connectDB(){
  await sequelize.authenticate()
    .then(() => console.log("Database bağlantısı kuruldu..."))
    .catch((error) => console.log("Database bağlantı hatası :", error));
}
connectDB();
module.exports = sequelize;
