const bookshelf = require('../../config/bookshelf');
const Picture = require("./picture");
const Notification = require("./notifications");

var User = bookshelf.Model.extend({
    tableName: 'users',
    idAttribute: 'userName',
    pictures: function(){
        return this.hasMany(Picture);
    },
    pictures: function(){
        return this.hasMany(Notification, "owner_id");
    }
});

module.exports = User;