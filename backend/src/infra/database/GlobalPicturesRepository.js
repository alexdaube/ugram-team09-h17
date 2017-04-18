var ErrorHandler = require("../../common/errors");
const Picture = require("../../models/picture");
const Like = require("../../models/like");
const Notification = require("../../models/notifications");
const Comment = require("../../models/comment");
var DatabaseDTO = require("../../util/DatabaseDTO");


var globalPicturesRepository = function (config) {
    this.host = config.host;
    this.port = config.port;
    this.databaseDTO = new DatabaseDTO();
};

globalPicturesRepository.prototype.getForTag = function (page, perPage, tag, callback) {
    var that = this;
    var numberOfPictureInTotal;
    var numberOfPages;
    if (typeof perPage === 'undefined') { perPage = 20; }

    new Picture().fetchAll({ withRelated: ["tags", "mentions", "comments", "likes"] }).then(function (pictures) {
        if(pictures) {
            var picturesWithTag = pictures.toJSON().filter(function(picture) {
                return picture.tags.some(function(pictureTag) {
                    return pictureTag.tag === tag;
                });
            });

            if(picturesWithTag.length === 0) {
                return callback(null, {});
            }

            picturesWithTag.sort(function(a, b) {
                return Number(b.likes.length) - Number(a.likes.length);
            });

            numberOfPictureInTotal = pictures.length;
            numberOfPages = Math.ceil(numberOfPictureInTotal / perPage);
            var picturesWithTagInNextPage = [];
            var offset = page * perPage;
            var maxIndex = offset + perPage;
            for (offset; offset < maxIndex; offset++) {
                if(offset === picturesWithTag.length) {
                    break;
                }
                picturesWithTagInNextPage.push(picturesWithTag[offset]);
            }

            var newCollectionJSON = {
                items: that.databaseDTO.getPicturesFromArray(picturesWithTagInNextPage),
                totalPages: numberOfPages,
                totalEntries: numberOfPictureInTotal
            };

            return callback(null, newCollectionJSON);
        }
        else {
            return callback(null, {});
        }
    }).catch(function (err) {
        console.log(err);
        handleError(400, null, callback);
    });
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

globalPicturesRepository.prototype.addPictureLike = function (pictureId, userId, callback) {
    var that = this;

    new Like({
        picture_id:pictureId,
        user_id:userId,
    }).save().then(function(newLike) {
        new Notification({
            picture_id:pictureId,
            user_id:userId,
            type:0
        }).save();
        var likeJson = that.databaseDTO.getLikeJSON(newLike.attributes);
        return callback(null, likeJson);
    });
};

globalPicturesRepository.prototype.deleteLike = function (likeId, callback) {
    new Like().where('id', likeId).fetch().then(function(like){
        if (like) {
            like.destroy().then(function() {
                return callback(null, "No content");
            });
        } else {
            return callback({statusCode: 400, message: "No such like"}, null);
        }
    }).catch(function (err) {
        console.log(err);
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
    }).save().then(function(newComment) {
        new Notification({
            picture_id:pictureId,
            user_id:userId,
            type:1
        }).save();
        var commentJson = that.databaseDTO.getCommentJSON(newComment.attributes);
        console.log(commentJson);
        return callback(null, commentJson);
    });
};

var handleError = function (statusCode, body, callback) {
    var error = ErrorHandler.handleReturnCall(statusCode);
    return callback(error, JSON.parse(body));
};

module.exports = globalPicturesRepository;
