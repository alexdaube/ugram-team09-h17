var ErrorHandler = require("../../common/errors");
const Picture = require("../../models/picture");
const Like = require("../../models/like");
var DatabaseDTO = require("../../util/DatabaseDTO");


var globalPicturesRepository = function (config) {
    this.host = config.host;
    this.port = config.port;
    this.databaseDTO = new DatabaseDTO();
};

globalPicturesRepository.prototype.get = function (page, perPage, callback) {
    var that = this;
    var numberOfPictureInTotal;
    var numberOfPages;
    if (typeof perPage === 'undefined') { perPage = 20; }

    new Picture().fetchAll({ withRelated: ["tags", "mentions"] }).then(function (pictures) {
        if (pictures) {
            numberOfPictureInTotal = pictures.length;
            numberOfPages = Math.ceil(numberOfPictureInTotal / perPage);
            pictures.query(function (qb) {
                qb.limit(perPage)
                  .offset(page * perPage)
                  .orderBy("createdDate", "DESC");
            }).fetch()
                .then(function (newCollection) {
                    var newCollectionJSON = {
                        items: that.databaseDTO.getPictureJSON(newCollection),
                        totalPages: numberOfPages,
                        totalEntries: numberOfPictureInTotal
                    };
                    return callback(null, newCollectionJSON);
                });
        }
        else {
            return callback(null, {});
        }

    }).catch(function (err) {
        console.log(err);
        handleError(400, null, callback);
    });
};

globalPicturesRepository.prototype.getPictureLikes = function (pictureId, callback) {
    console.log("test11");
    var that = this;
    var numberOfLikesInTotal;

    new Like().fetchAll().then(function (likes) {
        if (likes) {
            numberOfLikesInTotal = likes.length;
            
            likes.query(function (qb) {
                qb.where({pictureId: pictureId});
            }).fetch()
                .then(function (newCollection) {
                    numberOfLikesInTotal = newCollection.length;                        
                    var newCollectionJSON = {
                        items: that.databaseDTO.getLikeJSON(newCollection),                                
                        totalEntries: numberOfLikesInTotal
                    };
                    return callback(null, newCollectionJSON);
                });
        }
        else {
            return callback(null, {});
        }
    }).catch(function (err) {
        handleError(400, null, callback);
    });
};

var handleError = function (statusCode, body, callback) {
    var error = ErrorHandler.handleReturnCall(statusCode);
    return callback(error, JSON.parse(body));
};

module.exports = globalPicturesRepository;
