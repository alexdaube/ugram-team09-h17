var Request = require('request');
var ErrorHandler = require("../../common/errors")

var Request = require("./DatabaseMock");


var globalPicturesRepository = function(config){
    this.host = config.repository.host;
    this.port = config.repository.port;
}

globalPicturesRepository.prototype.get = function(token, callback){

    // request.get(this.host + this.port + '/users/' + nameOfUser, function(err, response, body) {
    //     verifyError(err, response, body, callback);
    // });

    var request = new Request();
    request.isUserSignedIn(token, function(err, response) {
        verifyError(err, response, callback);
    })
}

var verifyError = function(err, response, callback) {
  var error = ErrorHandler.handleReturnCall(err, response);
  if (error) {
    return callback(error, null);
  }
  return callback(error, response);
};

module.exports = globalPicturesRepository;