//const bcrypt = require('bcrypt-nodejs');
const bookshelf = require('../../config/bookshelf');
const Tag = require("./tag");
const Mention = require("./mention");

var Picture = bookshelf.Model.extend({
    tableName: 'pictures',

    tags: function(){
        return this.hasMany(Tag);
    },

    mentions: function(){
        return this.hasMany(Mention);
    }

});

module.exports = Picture;