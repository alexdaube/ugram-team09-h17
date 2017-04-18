const bookshelf = require('../../config/bookshelf');
const Tag = require("./tag");
const Mention = require("./mention");
const Comment = require("./comment");
const Like = require("./like");
const Notification = require("./notifications");

var Picture = bookshelf.Model.extend({
    tableName: 'pictures',

    tags: function () {
        return this.hasMany(Tag);
    },
    mentions: function(){
        return this.hasMany(Mention);
    },
    comments: function(){
        return this.hasMany(Comment);
    },
    likes: function(){
        return this.hasMany(Like);
    },
    notifications: function(){
        return this.hasMany(Notification);
    },
});

module.exports = Picture;