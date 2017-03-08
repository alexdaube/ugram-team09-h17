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

userService.prototype.getUser = function(request, returnObject){
    var userId = request.path;
   
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

userService.prototype.updateUser = function(request, returnObject){
    var userId = request.path;
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
    var userId = request.path;
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

userService.prototype.createUserPicture = function(request, returnObject){
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

userService.prototype.deleteUserPicture = function(request, returnObject){
    // TODO path returns all the /users/:userId/pictures and not only :userId
    var userId = request.path;
    var pictureId = request.path;
    
   this.persistence.deletePicture(userId, pictureId, function (err, response) {
       if (!err && response) {
            returnObject.status(201).json(response);
        }
        else {
            console.warn(err, response);
            returnObject.status(err.statusCode).send(err.message);
        }
   })
}

userService.prototype.getUserPicture = function (request, returnObject) {
 // TODO path returns all the /users/:userId/pictures and not only :userId
    var userId = request.path;
    var pictureId = request.path;

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

userService.prototype.updateUserPicture = function(request, returnObject){
    var userId = request.path;
    var pictureId = request.path;
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