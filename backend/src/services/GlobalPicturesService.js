var GlobalPicturesRepository = require("../infra/database/GlobalPicturesRepository");

var globalPicturesService = function(config){
    this.persistence = new GlobalPicturesRepository(config);
};

globalPicturesService.prototype.setPersistence = function(persistence){
    this.persistence = persistence;
}

