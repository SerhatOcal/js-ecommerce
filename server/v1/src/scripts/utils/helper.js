const path = require("path");

const imageUpload = (image, folderName) => {

    if (image.mimetype != "image/png" && image.mimetype != "image/jpg" && image.mimetype != "image/JPG" && image.mimetype != "image/jpeg"){
        console.log("Lütfen geçerli bir resim yükleyiniz, Yükleyebileceğiniz resim formatları (jpg,png) olmalıdır..!");
    }

    const extension  = path.extname(image.name);
    const fileName   = `${new Date().getTime()}${extension}`;
    const pathName   = "../../uploads/images/" + folderName;
    const folderPath = path.resolve(__dirname, pathName, fileName);

    image.mv(folderPath, function(err){
        if (err){
            return err; 
        } else {
            return fileName;
        }
        });
    return fileName;
}

module.exports = {
    imageUpload,
}
