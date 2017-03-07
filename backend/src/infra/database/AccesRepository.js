//var Request = require('request');
var ErrorHandler = require("../../common/errors")

var Request = require("./DatabaseMock");


var accesRepository = function(config){
    this.host = config.repository.host;
    this.port = config.repository.port;
}


accesRepository.prototype.get = function(token, callback){

    // request.get(this.host + this.port + '/users/' + nameOfUser, function(err, response, body) {
    //     verifyError(err, response, body, callback);
    // });

    var request = new Request();
    request.isUserSignedIn(token, function(response, err) {
        verifyError(response, err, callback);
    })
}

var verifyError = function(response, err, callback) {
  var error = ErrorHandler.handleReturnCall(err, response);
  if (error) {
    return callback(error, null);
  }
  return callback(error, response);
};

module.exports = accesRepository;