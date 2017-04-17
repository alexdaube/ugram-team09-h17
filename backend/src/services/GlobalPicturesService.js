var GlobalPicturesRepository = require("../infra/database/GlobalPicturesRepository");

var globalPicturesService = function(config){
    this.persistence = new GlobalPicturesRepository(config);
};

globalPicturesService.prototype.setPersistence = function(persistence){
    this.persistence = persistence;
};

globalPicturesService.prototype.getAllPicturesForTag = function(request, returnObject) {
    var page = request.query.page;
    var perPage = request.query.perPage;
    var tag = request.query.tag;

    this.persistence.getForTag(page, perPage, tag, function(err, response){
        if (!err && response) {
            returnObject.status(200).json(response);
        }
        else {
            console.warn(err, response);
            returnObject.status(err.statusCode).send(err.message);
        }
    });
};



globalPicturesService.prototype.getAllPictures = function(request, returnObject) {
    var page = request.query.page;
    var perPage = request.query.perPage;

    this.persistence.get(page, perPage, function(err, response){
        if (!err && response) {
            returnObject.status(200).json(response);
        }
        else {
            console.warn(err, response);
            returnObject.status(err.statusCode).send(err.message);
        }
    });
};

globalPicturesService.prototype.getPictureLikes = function(request, returnObject) {
    var path = request.path;
    var urlParts = path.split('/');
    var pictureId = urlParts[2];

    this.persistence.getPictureLikes(pictureId, function(err, response) {
        if (!err && response) {
            returnObject.status(200).json(response);
        }
        else {
            console.warn(err, response);
            returnObject.status(err.statusCode).send(err.message);
        }
    });
};

globalPicturesService.prototype.addPictureLikes = function (request, returnObject) {
    var urlPath = request.path;
    var urlParts = urlPath.split('/');
    var pictureId = urlParts[2];
    var userId = request.user.attributes.userName;
    this.persistence.addPictureLike(pictureId, userId, function (err, response) {
        if (!err && response) {
            returnObject.status(201).json(response);
        }
        else {
            console.warn(err, response);
            returnObject.status(err.statusCode).send(err.message);
        }
    });
};

globalPicturesService.prototype.getPictureComments = function(request, returnObject) {
    var path = request.path;
    var urlParts = path.split('/');
    var pictureId = urlParts[2];

    this.persistence.getPictureComments(pictureId, function(err, response) {
        if (!err && response) {
            returnObject.status(200).json(response);
        }
        else {
            console.warn(err, response);
            returnObject.status(err.statusCode).send(err.message);
        }
    });
};

globalPicturesService.prototype.deleteLike = function (request, returnObject) {
    var path = request.path;
    var urlParts = path.split('/');
    var pictureId = urlParts[2];
    var userId = request.user.attributes.userName;

    this.persistence.deleteLike(pictureId, userId, function(err, response) {
        if (!err && response) {
            returnObject.status(204).send();
        } else {
            console.warn(err, response);
            returnObject.status(err.statusCode).send(err,message);
        }
    });    
};

globalPicturesService.prototype.addPictureComments = function (request, returnObject) {
    var urlPath = request.path;
    var urlParts = urlPath.split('/');
    var pictureId = urlParts[2];
    var userId = request.user.attributes.userName;
    var comment = request.body.comment;
    this.persistence.addPictureComment(pictureId, userId, comment, function (err, response) {
        if (!err && response) {
            returnObject.status(201).json(response);
        }
        else {
            console.warn(err, response);
            returnObject.status(err.statusCode).send(err.message);
        }
    });
};

module.exports = globalPicturesService;
