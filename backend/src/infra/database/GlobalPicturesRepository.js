//var Request = require('request');
var ErrorHandler = require("../../common/errors");
var Request = require("./DatabaseMock");


var globalPicturesRepository = function (config) {
    this.host = config.repository.host;
    this.port = config.repository.port;
}

globalPicturesRepository.prototype.get = function (page, perPage, callback) {

    // TODO modify with bd call as soon as the bd is ready
    //page équivaut au numéro de la page fetché et non au nombre de page fetché
    var request = new Request();
    request.getAllPictures(page, perPage, function (statusCode, body) {
        verifyError(statusCode, body, callback);
    })
}

var verifyError = function (statusCode, body, callback) {
    var error = ErrorHandler.handleReturnCall(statusCode);
    if (error) {
        return callback(error, null);
    }
    if (typeof body === 'object') {
        return callback(error, body);
    }
    return callback(error, JSON.parse(body));
};

module.exports = globalPicturesRepository;