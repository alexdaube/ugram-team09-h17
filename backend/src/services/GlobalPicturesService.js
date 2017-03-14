var GlobalPicturesRepository = require("../infra/database/GlobalPicturesRepository");

var globalPicturesService = function(config){
    this.persistence = new GlobalPicturesRepository(config);
};

globalPicturesService.prototype.setPersistence = function(persistence){
    this.persistence = persistence;
}

globalPicturesService.prototype.getAllPictures = function(request, returnObject){
    var page = request.query.page;
    var perPage = request.query.perPage;

    this.persistence.get(page, perPage, function(err, response){
        if(!err && response){
            returnObject.status(200).json(response);
        }
        else {
            console.warn(err, response);
            returnObject.status(err.statusCode).send(err.message);
        }
    })
}

module.exports = globalPicturesService;

