const express = require("express");
const fileUpload = require("express-fileupload");
const path = require("path");
const helmet = require("helmet");
const config = require("./config");
const loaders = require("./loaders");
const events = require("./scripts/events");
const errorHandler = require("./middlewares/errorHendler");
const { BrandRoutes, UserRoutes, CategoryRoutes } = require("./routes");

config();
loaders();
events();

const app = express();

app.use(express.json());
app.use(helmet());
app.use("/uploads", express.static(path.join(__dirname, "./", "uploads")));
app.use(fileUpload({createParentPath: true,}));

app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With, origin');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
    next();
});


app.listen(process.env.APP_PORT, () => {
    console.log("Sunucu Başlatıldı...");
    app.use("/users", UserRoutes);
    app.use("/brands", BrandRoutes);
    app.use("/categories", CategoryRoutes);
    
    app.use((req, res, next) => {
        const error = new Error("Sayfa Bulunamadı");
        error.status = 404;
        next(error);
    });
    app.use(errorHandler);
});