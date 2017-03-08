var ErrorHandler = require("../../common/errors")
var Request = require("./DatabaseMock");
const User = require('../../models/user');


var userRepository = function (config) {
    this.host = config.repository.host;
    this.port = config.repository.port;
}

userRepository.prototype.getAll = function (page, perPage, callback) {

    // TODO modify with bd call as soon as the bd is ready
    // var request = new Request();
    // request.getAllUsers(page, perPage, function (statusCode, body) {
    //     verifyError(statusCode, body, callback);
    // })

    new User().fetchAll().then(function (users) {
            return callback(null, users.toJSON());
        }).catch(function (err) {
            var error = ErrorHandler.handleReturnCall(403);
        });
}

userRepository.prototype.get = function (userId, callback) {
    // TODO modify with bd call as soon as the bd is ready
    var request = new Request();
    request.getUser(userId, function (statusCode, body) {
        verifyError(statusCode, body, callback);
    })
}

userRepository.prototype.update = function (userId, body, callback) {
    // TODO modify with bd call as soon as the bd is ready
    var request = new Request();
    request.updateUser(userId, body, function (statusCode, body) {
        verifyError(statusCode, body, callback);
    })
}

userRepository.prototype.getUserPictures = function (userId, page, perPage, callback) {
    // TODO modify with bd call as soon as the bd is ready
    var request = new Request();
    request.getAllUsers(function (statusCode, body) {
        verifyError(statusCode, body, callback);
    })
}

userRepository.prototype.createPicture = function (userId, body, callback) {
    // TODO modify with bd call as soon as the bd is ready
    var request = new Request();
    request.getAllUsers(function (statusCode, body) {
        verifyError(statusCode, body, callback);
    })
}

userRepository.prototype.deletePicture = function (userId, pictureId, callback) {
    // TODO modify with bd call as soon as the bd is ready
    var request = new Request();
    request.getAllUsers(function (statusCode, body) {
        verifyError(statusCode, body, callback);
    })
}

userRepository.prototype.getUserPicture = function (userId, pictureId, callback) {
    // TODO modify with bd call as soon as the bd is ready
    var request = new Request();
    request.getAllUsers(function (statusCode, body) {
        verifyError(statusCode, body, callback);
    })
}

userRepository.prototype.updateUserPicture = function (userId, pictureId, body, callback) {
    // TODO modify with bd call as soon as the bd is ready
    var request = new Request();
    request.getAllUsers(function (statusCode, body) {
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

module.exports = userRepository;