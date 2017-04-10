const bookshelf = require('../../config/bookshelf');
const Tag = require("./tag");
const Mention = require("./mention");
const Comment = require("./comment");

var Picture = bookshelf.Model.extend({
    tableName: 'pictures',

    tags: function(){
        return this.hasMany(Tag);
    },    
    mentions: function(){
        return this.hasMany(Mention);
    },
    comments: function(){
        return this.hasMany(Comment);
    }
});

module.exports = Picture;