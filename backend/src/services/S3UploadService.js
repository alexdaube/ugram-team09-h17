var fs = require("fs");
var aws = require("aws-sdk");
var s3Auth = require('./../../config/s3Auth');


var S3UploadService = function () {

}

S3UploadService.prototype.uploadPicture = function (newPictureId, callback) {


    var files = fs.readdirSync("./upload");

    var fileName = files[0];

    // if(typeof fileName === 'undefined'){
    //     return callback(null);
    // }
    var extention = fileName.split(".").pop();
    var newFileName = newPictureId + "." + extention;

    aws.config.update(s3Auth.keys);
    var s3 = new aws.S3();

    fs.readFile(".upload/" + fileName, function (err, data) {

        var params = {
            Bucket: "glo-3102-team09",
            Key: 'img/uploadedImg/' + newFileName,
            Body: data
        };

        s3.putObject(params, function (perr, pres) {
            if (perr) {
                console.log("Error uploading data: ", perr);
            } else {
                console.log("Successfully uploaded data to myBucket/myKey");
            }
        });
    })

    for( var file in files){
        fs.unlink("upload/" + files[file]);
    }
    return callback(newFileName);
}


module.exports = S3UploadService;