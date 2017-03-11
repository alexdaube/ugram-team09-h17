var UserRepository = require("../infra/database/UserRepository");
var ErrorHandler = require("../common/errors");

var path = require('path');
var formidable = require('formidable');
var fs = require('fs');

var userService = function (config) {
    this.persistence = new UserRepository(config);
};

userService.prototype.setPersistance = function (persistence) {
    this.persistence = persistence;
}

userService.prototype.getAllUsers = function (request, returnObject) {
    var page = request.query.page;
    var perPage = request.query.perPage;

    this.persistence.getAll(page, perPage, function (err, response) {
        if (!err && response) {
            returnObject.status(200).json(response);
        }
        else {
            console.warn(err, response);
            returnObject.status(err.statusCode).send(err.message);
        }
    })
}

userService.prototype.getUser = function (request, returnObject) {
    var path = request.path;
    var urlParts = path.split('/');
    var userId = urlParts[2];

    this.persistence.get(userId, function (err, response) {
        if (!err && response) {
            returnObject.status(200).json(response);
        }
        else {
            console.warn(err, response);
            returnObject.status(err.statusCode).send(err.message);
        }
    })
}

userService.prototype.updateUser = function (request, returnObject) {
    var path = request.path;
    var urlParts = path.split('/');
    var userId = urlParts[2];
    var body = request.body;

    this.persistence.update(userId, body, function (err, response) {
        if (!err && response) {
            returnObject.status(201).json(response);
        }
        else {
            console.warn(err, response);
            returnObject.status(err.statusCode).send(err.message);
        }
    })
}

userService.prototype.getUserPictures = function (request, returnObject) {
    var path = request.path;
    var urlParts = path.split('/');
    var userId = urlParts[2];
    var page = request.query.page;
    var perPage = request.query.perPage;

    this.persistence.getUserPictures(userId, page, perPage, function (err, response) {
        if (!err && response) {
            returnObject.status(200).json(response);
        }
        else {
            console.warn(err, response);
            returnObject.status(err.statusCode).send(err.message);
        }
    })
}

userService.prototype.createUserPicture = function (request, returnObject) {

    console.log(request);
    var path = request.path;
    var urlParts = path.split('/');
    var userId = urlParts[2];
    var body = request.body;

    // HOLY MOLY ==> path.extname(req.files.file.name) <== extname :O:O

    this.persistence.createPicture(userId, body, function (err, response) {
        if (!err && response) {

            var tempPath = request.files.file.path;
            var targetName = response.toJSON().id;
            var extensionName = path.extname(req.files.file.name).toLowerCase();
            var fullTargetName = targetName + extensionName;
            var targetPath = path.resolve('../../upload/' + fullTargetName);

            var form = new formidable.IncomingForm();

            // specify that we want to allow the user to upload multiple files in a single request
            form.multiples = true;

            // store all uploads in the /uploads directory
            form.uploadDir = path.join('../../upload/');

            // every time a file has been uploaded successfully,
            // rename it to it's orignal name
            form.on('file', function (field, file) {
                fs.rename(tempPath, targetName);
            });

            // log any errors that occur
            form.on('error', function (err) {
                console.log('An error has occured: \n' + err);
            });

            // once all the files have been uploaded, send a response to the client
            form.on('end', function () {
                //console.log(response.toJSON().id)
                returnObject.status(201).json(response.toJSON().id);
            });

            // parse the incoming request containing the form data
            form.parse(req);
            // var tempPath = request.files.file.path;
            // var targetName = response.toJSON().id;
            // var extensionName = path.extname(req.files.file.name).toLowerCase();
            // var fullTargetName = targetName + extensionName;
            // var targetPath = path.resolve('../../upload/' + fullTargetName);


            // fs.rename(tempPath, targetPath, function (err) {
            //     if (err) throw err;
            //     console.log("Upload completed!");
            // });

            // //console.log(response.toJSON().id)
            // returnObject.status(201).json(response.toJSON().id);
        }
        else {
            console.warn(err, response);
            returnObject.status(err.statusCode).send(err.message);
        }
    })
}

userService.prototype.deleteUserPicture = function (request, returnObject) {
    var path = request.path;
    var urlParts = path.split('/');
    var userId = urlParts[2];
    var pictureId = urlParts[4];

    this.persistence.deletePicture(userId, pictureId, function (err, response) {
        if (!err && response) {
            returnObject.status(204).send();
        }
        else {
            console.warn(err, response);
            returnObject.status(err.statusCode).send(err.message);
        }
    })
}

userService.prototype.getUserPicture = function (request, returnObject) {
    var path = request.path;
    var urlParts = path.split('/');
    var userId = urlParts[2];
    var pictureId = urlParts[4];

    this.persistence.getUserPicture(userId, pictureId, function (err, response) {
        if (!err && response) {
            returnObject.status(200).json(response);
        }
        else {
            console.warn(err, response);
            returnObject.status(err.statusCode).send(err.message);
        }
    })
}

userService.prototype.updateUserPicture = function (request, returnObject) {
    var path = request.path;
    var urlParts = path.split('/');
    var userId = urlParts[2];
    var pictureId = urlParts[4];
    var body = request.body;

    this.persistence.updateUserPicture(userId, pictureId, body, function (err, response) {
        if (!err && response) {
            returnObject.status(201).json(response);
        }
        else {
            console.warn(err, response);
            returnObject.status(err.statusCode).send(err.message);
        }
    })
}

module.exports = userService;