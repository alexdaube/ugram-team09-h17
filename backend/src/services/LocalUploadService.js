var fs = require("fs");
var multer = require('multer');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        var dirPath = global.configs.localUploadFolder;
        cb(null, dirPath + '/');
    },
    filename: function (req, file, cb) {
        var ext = file.originalname.substring(file.originalname.lastIndexOf("."));
        var imageGuid = guid();
        var fileName = "temp_" + imageGuid + ext;
        cb(null, fileName);
    }
});

var upload = multer({
    storage: storage,
    fileFilter: function (req, file, cb) {
        if (file.mimetype !== 'image/png' &&
            file.mimetype !== 'image/jpeg' &&
            file.mimetype !== 'image/gif') {
            req.fileValidationError = 'goes wrong on the mimetype';
            return cb(null, false, new Error('goes wrong on the mimetype'));
        }
        cb(null, true);
    }
});

function guid() {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
        s4() + '-' + s4() + s4() + s4();
}

exports.upload = upload;