//const bcrypt = require('bcrypt-nodejs');
const bookshelf = require('../../config/bookshelf');
const Picture = require("./picture");

var User = bookshelf.Model.extend({
    tableName: 'users',
    idAttribute: 'userName',
    pictures: function(){
        return this.hasMany(Picture);
    }
});

module.exports = User;