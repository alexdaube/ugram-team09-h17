var fs = require("fs");
var aws = require("aws-sdk");


var S3UploadService = function () {

};

S3UploadService.prototype.uploadPicture = function (localPictureName, newPictureId, callback) {


    var files = fs.readdirSync(global.configs.localUploadFolder);
    var fileName;// = files[0];

    for(var file in files){
        if(files[file].includes(localPictureName)) {
            fileName = files[file];
        }
    }

    if(typeof fileName === 'undefined'){
        return callback(null);
    }
    var extention = fileName.split(".").pop();
    var newFileName = newPictureId + "." + extention;

    aws.config.update(global.configs.s3Auth);
    var s3 = new aws.S3();

    fs.readFile(global.configs.localUploadFolder + fileName, function (err, data) {

        var params = {
            Bucket: global.configs.s3Bucket.bucketName,
            Key: global.configs.s3Bucket.imageFolderPath + newFileName,
            Body: data
        };

        s3.putObject(params, function (perr, pres) {
            if (perr) {
                return callback(null);
            } else {
                console.log("Successfully uploaded picture");
            }
        });
    });

    fs.unlink(global.configs.localUploadFolder + fileName);
    return callback(newFileName);
};


module.exports = S3UploadService;