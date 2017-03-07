var AccesRepository = require("../infra/database/AccesRepository");

var accesService = function(config){
    this.persistence = new AccesRepository(config);
};

accesService.prototype.setPersistence = function(persistence){
    this.persistence = persistence;
}

accesService.prototype.isUserSignedIn = function(request, callback){

    var token = request.headers.bearer;

    this.persistence.get(token, function(err, response){
        if(!err && response){
            //returnObject.status(200).send("Welcome to Ugram API");
            return callback(true, null);
        }
        else {
            //returnObject.status(err.statusCode).send(err.errorMessage);
            return callback(false, err);
        }
    });
}

module.exports = accesService;