var UserRepository = require("../infra/database/UserRepository");
var S3UploadService = require("./S3UploadService");
var ErrorHandler = require("../common/errors");
var path = require('path');


var userService = function (config) {
    this.persistence = new UserRepository(config);
    this.S3ImageUploader = new S3UploadService();

};

userService.prototype.setPersistance = function (persistence) {
    this.persistence = persistence;
};

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
    });
};

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
    });
};

userService.prototype.updateUser = function (request, returnObject) {
    var path = request.path;
    var urlParts = path.split('/');
    var userId = urlParts[2];
    var body = request.body;

    if (userId != request.user.attributes.userName) {
        returnObject.status(403).json("Editing on forbidden user account for current authentication");
        return;
    }

    this.persistence.update(userId, body, function (err, response) {
        if (!err && response) {
            returnObject.status(201).json(response);
        }
        else {
            console.warn(err, response);
            returnObject.status(err.statusCode).send(err.message);
        }
    });
};

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
    });
};

userService.prototype.getUserNotifications = function (request, returnObject) {
    var userName = request.user.attributes.userName;

    this.persistence.getUserNotifications(userName, function (err, response) {
        if (!err && response) {
            returnObject.status(200).json(response);
        }
        else {
            console.warn(err, response);
            returnObject.status(err.statusCode).send(err.message);
        }
    });
};

userService.prototype.createUserPicture = function (request, returnObject) {

    var urlPath = request.path;
    var urlParts = urlPath.split('/');
    var userId = urlParts[2];
    var body = request.body;
    var that = this;

    if (userId != request.user.attributes.userName) {
        returnObject.status(403).json("Editing on forbidden user account for current authentication");
        return;
    }
    if (typeof request.file === 'undefined') {
        
        returnObject.status(400).json("Unauthorized file format");
        return;
    }
    var localPictureName = request.file.filename;

    this.persistence.createPicture(userId, body, function (err, response) {

        if (!err && response) {
            var newPictureId = response.toJSON().id;
            that.S3ImageUploader.uploadPicture(localPictureName, newPictureId, function (fileName) {
                that.persistence.updatePictureUrl(fileName, function (err) {
                    if (!err) {
                        returnObject.status(201).send({ id: newPictureId });
                    }
                    else {
                        returnObject.status(500).send("Internal server error");
                    }
                });
            });
        }
        else {
            console.warn(err, response);
            returnObject.status(err.statusCode).send(err.message);
        }
    });
};

userService.prototype.deleteUserPicture = function (request, returnObject) {
    var path = request.path;
    var urlParts = path.split('/');
    var userId = urlParts[2];
    var pictureId = urlParts[4];

    if (userId != request.user.attributes.userName) {
        returnObject.status(403).json("Editing on forbidden user account for current authentication");
        return;
    }

    this.persistence.deletePicture(userId, pictureId, function (err, response) {
        if (!err && response) {
            returnObject.status(204).send();
        }
        else {
            console.warn(err, response);
            returnObject.status(err.statusCode).send(err.message);
        }
    });
};

userService.prototype.deleteUser = function (request, returnObject) {
    var path = request.path;
    var urlParts = path.split('/');
    var userId = urlParts[2];    

    if (userId != request.user.attributes.userName) {
        returnObject.status(403).json("Editing on forbidden user account for current authentication");
        return;
    }
    this.persistence.deleteUser(userId, function(err,response) {
        if(!err && response) {
            returnObject.status(204).send();
        } else {
            console.warn(err, response);
            returnObject.status(err.statusCode).send(err,message);
        }
    });    
};

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
    });
};

userService.prototype.updateUserPicture = function (request, returnObject) {
    var path = request.path;
    var urlParts = path.split('/');
    var userId = urlParts[2];
    var pictureId = urlParts[4];
    var body = request.body;

    if (userId != request.user.attributes.userName) {
        returnObject.status(403).json("Editing on forbidden user account for current authentication");
        return;
    }

    this.persistence.updateUserPicture(userId, pictureId, body, function (err, response) {
        if (!err && response) {
            returnObject.status(201).json(response);
        }
        else {
            console.warn(err, response);
            returnObject.status(err.statusCode).send(err.message);
        }
    });
};

module.exports = userService;