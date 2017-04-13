var ErrorHandler = require("../../common/errors");
const Picture = require("../../models/picture");
const Like = require("../../models/like");
const Comment = require("../../models/comment");
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

    new Picture().fetchAll({ withRelated: ["tags", "mentions", "comments", "likes"] }).then(function (pictures) {
        if (pictures) {
            numberOfPictureInTotal = pictures.length;
            numberOfPages = Math.ceil(numberOfPictureInTotal / perPage);
            pictures.query(function (qb) {
                qb.limit(perPage)
                  .offset(page * perPage)
                  .orderBy("createdDate", "DESC");
            }).fetch({ withRelated: ["tags", "mentions", "comments", "likes"] })
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

// globalPicturesRepository.prototype.getPictureLikes = function (pictureId, callback) {
//     var that = this;
//     var numberOfLikesInTotal;

//     new Like().fetchAll().then(function (likes) {
//         if (likes) {
//             numberOfLikesInTotal = likes.length;

//             likes.query(function (qb) {
//                 qb.where({pictureId: pictureId});
//             }).fetch()
//                 .then(function (newCollection) {
//                     numberOfLikesInTotal = newCollection.length;
//                     var newCollectionJSON = {
//                         items: that.databaseDTO.getLikeJSON(newCollection),
//                         totalEntries: numberOfLikesInTotal
//                     };
//                     return callback(null, newCollectionJSON);
//                 });
//         }
//         else {
//             return callback(null, {});
//         }
//     }).catch(function (err) {
//         handleError(400, null, callback);
//     });
// };

globalPicturesRepository.prototype.getPictureLikes = function (pictureId, callback) {
    var that = this;

    new Like().where('pictureId', pictureId).fetch().then(function (likes) {
        if (likes) {
            callback(null, that.databaseDTO.getLikeListJSON(likes));
        }
        else {
            return callback(null, {});
        }
    }).catch(function (err) {
        handleError(400, null, callback);
    });
};

globalPicturesRepository.prototype.getPictureComments = function (pictureId, callback) {
    var that = this;

    new Comment().where('pictureId', pictureId).fetch().then(function (comments) {
        if (comments) {
            callback(null, that.databaseDTO.getCommentListJSON(comments));
        }
        else {
            return callback(null, {});
        }
    }).catch(function (err) {
        handleError(400, null, callback);
    });
};

globalPicturesRepository.prototype.addPictureComment = function (pictureId, userId, comment, callback) {
    var that = this;
    new Comment({
        picture_id:pictureId,
        user_id:userId,
        comment:comment
    })
        .save()
        .then(function(newComment) {
            var commentJson = that.databaseDTO.getCommentJSON(newComment);
            return callback(null, commentJson);
        });
};

// globalPicturesRepository.prototype.addLike = function (pictureId, userId, callback) {
//     var that = this;
//     new Like({
//         pictureId:pictureId,
//         userId:userId
//     })
//     .save()
//     .then(function(like) {
//         var newLikeJSON = that.databaseDTO.getLikeJSON(like);
//         return callback(null, newLikeJSON);
//     });
// };

// globalPicturesRepository.prototype.deleteLike = function (pictureId, userId, callback) {
//     new Like().where({pictureId: pictureId, userId: userId})
//     .fetch().then(function(like){
//         if(like){
//             like.destroy().then(function(){
//                 return callback(null, "No content");
//             });
//         } else {
//             return callback({ statusCode: 400, message: "No such like"}, null);
//         }
//     }).catch(function (err) {
//         console.log(err);
//         handleError(400, null, callback);
//     });
// };

var handleError = function (statusCode, body, callback) {
    var error = ErrorHandler.handleReturnCall(statusCode);
    return callback(error, JSON.parse(body));
};

module.exports = globalPicturesRepository;
