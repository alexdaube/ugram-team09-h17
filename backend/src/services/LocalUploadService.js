var fs = require("fs");
var multer = require('multer');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        var dirPath = 'upload';
        if (!fs.existsSync(dirPath)) {
            var dir = fs.mkdirSync(dirPath);
        }
        cb(null, dirPath + '/');
    },
    filename: function (req, file, cb) {
        var ext = file.originalname.substring(file.originalname.lastIndexOf("."));
        var fileName = "temp" + ext;
        cb(null, fileName);
    }
});

var upload = multer({ storage: storage });

exports.upload = upload;