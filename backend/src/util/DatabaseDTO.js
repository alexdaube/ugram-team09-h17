module.exports = class DatabaseDTO {

    getUserJSON(user) {
        var userJSON = user.toJSON();
        var userLength = userJSON.length;

        if (typeof userLength === 'undefined') {
            var formattedUserJSON = {
                email: userJSON.email,
                firstName: userJSON.firstName,
                id: userJSON.userName,
                lastName: userJSON.lastName,
                phoneNumber: parseInt(userJSON.phoneNumber),
                pictureUrl: userJSON.pictureUrl,
                registrationDate: parseInt(userJSON.registrationDate)
            };
            return formattedUserJSON;
        }
        else {
            var userJSONArray = [];
            userJSON.forEach(function (user) {
                var formattedUserJSON = {
                    email: user.email,
                    firstName: user.firstName,
                    id: user.userName,
                    lastName: user.lastName,
                    phoneNumber: parseInt(user.phoneNumber),
                    pictureUrl: user.pictureUrl,
                    registrationDate: parseInt(user.registrationDate)
                };
                userJSONArray.push(formattedUserJSON);
            });
            return userJSONArray;
        }
    }

    getPictureJSON(picture) {
        var pictureJSON = picture.toJSON();
        var pictureLength = pictureJSON.length;
        var that = this;

        if (typeof pictureLength === 'undefined') {
            var formattedPictureJSON = {
                id: pictureJSON.id,
                createdDate: Date.parse(pictureJSON.createdDate),
                description: pictureJSON.description,
                mentions: that.getMentionJSON(pictureJSON.mentions),
                tags: that.getTagJSON(pictureJSON.tags),
                url: pictureJSON.url,
                //user_userName: pictureJSON.user_userName
                userId: pictureJSON.userId,
                comments:  that.getCommentListJSON(pictureJSON.comments)
            };
            return formattedPictureJSON;
        }
        else {
            var picturesJSONArray = [];
            pictureJSON.forEach(function (picture) {
                var formattedPictureJSON = {
                    id: picture.id,
                    createdDate: Date.parse(picture.createdDate),
                    description: picture.description,
                    mentions: that.getMentionJSON(picture.mentions),
                    tags: that.getTagJSON(picture.tags),
                    url: picture.url,
                    //user_userName: picture.user_userName
                    userId: picture.userId,
                    comments:  that.getCommentListJSON(picture.comments)
                };
                picturesJSONArray.push(formattedPictureJSON);
            });
            return picturesJSONArray;
        }
    }

getpopularUsersJSON(users) {
        
        var usersArray = [];
        if(typeof users === 'undefined'){
            return usersArray;
        }

        users.forEach(function (user) {
            usersArray.push({id: user.userId, likes: user["count(*)"]});
        });
        return usersArray;
    }

    getTagJSON(tags) {
        
        var tagsArray = [];
        if(typeof tags === 'undefined'){
            return tagsArray;
        }

        tags.forEach(function (tag) {
            tagsArray.push(tag.tag);
        });
        return tagsArray;
    }

    getTagsWithCountJSON(tags) {
        var tagsArray = [];
        if(typeof tags === 'undefined'){
            return tagsArray;
        }

        tags.forEach(function (tag) {
            tagsArray.push({tag: tag.tag, count: tag["count(*)"]});
        });
        return tagsArray;
    }

    getMentionJSON(mentions) {

        var mentionsArray = [];
        if(typeof mentions === 'undefined'){
            return mentionsArray;
        }
        mentions.forEach(function (mention) {
            mentionsArray.push(mention.mention);
        });
        return mentionsArray;
    }

    getCommentJSON(comment) {
        var commentJson = {
            user: comment.user_id,
            comment: comment.comment,
        };
        return commentJson;
    }

    getCommentListJSON(comments) {
        var commentsArray = [];
        if(typeof comments === 'undefined'){
            return commentsArray;
        }

        comments.forEach(function (comment) {
            var commentJson =  {
                user: comment.user_id,
                comment: comment.comment,
            };
            commentsArray.push(commentJson);
        });
        return commentsArray;
    }

    getLikeJSON(like) {
        var likeJSON = like.toJSON();
        var likeLength = likeJSON.length;
        var that = this;

        if (typeof likeLength === 'undefined') {
            var formattedLikeJSON = {
                id: likeJSON.id,                
                userId: likeJSON.userId,
                pictureId: likeJSON.pictureId
            };
            return formattedLikeJSON;
        }
        else {
            var likesJSONArray = [];
            likeJSON.forEach(function (like) {
                var formattedLikeJSON = {
                    id: like.id,                
                    userId: like.userId,
                    pictureId: like.pictureId
                };
                likesJSONArray.push(formattedLikeJSON);
            });
            return likesJSONArray;
        }
    }
};