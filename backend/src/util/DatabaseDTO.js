// var databaseDTO = function(){

// }

// databaseDTO.prototype.getUserJSON = function(user){
//     var userJSON = {
//         email: user.email,
//         firstName: user.firstName,
//         id: user.userName,
//         lastName: user.lastName,
//         phoneNumber: user.phoneNumber,
//         pictureUrl: user.pictureUrl,
//         registrationDate: user.registrationDate
//     }
//     return userJSON;
// }

// exports.databaseDTO = databaseDTO;

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
                phoneNumber: userJSON.phoneNumber,
                pictureUrl: userJSON.pictureUrl,
                registrationDate: userJSON.registrationDate
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
                    phoneNumber: user.phoneNumber,
                    pictureUrl: user.pictureUrl,
                    registrationDate: user.registrationDate
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
                createdDate: pictureJSON.createdDate,
                description: pictureJSON.description,
                mentions: that.getMentionJSON(pictureJSON.mentions),
                tags: that.getTagJSON(pictureJSON.tags),
                url: pictureJSON.url,
                userId: pictureJSON.userId
            };
            return formattedPictureJSON;
        }
        else {
            var picturesJSONArray = [];
            pictureJSON.forEach(function (picture) {
                var formattedPictureJSON = {
                    id: picture.id,
                    createdDate: picture.createdDate,
                    description: picture.description,
                    mentions: that.getMentionJSON(picture.mentions),
                    tags: that.getTagJSON(picture.tags),
                    url: picture.url,
                    userId: picture.userId
                };
                picturesJSONArray.push(formattedPictureJSON);
            });
            return picturesJSONArray;
        }
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
};