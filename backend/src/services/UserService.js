var UserRepository = require("../infra/database/UserRepository");
var ErrorHandler = require("../common/errors");

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
    // TODO path returns all the /users/:userId/pictures and not only :userId
    var userId = request.path;
    var body = request.body;

    this.persistence.createPicture(userId, body, function (err, response) {
        if (!err && response) {
            returnObject.status(201).json(response);
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