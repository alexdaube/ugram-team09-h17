const bookshelf = require('../../config/bookshelf');
const Picture = require("./picture");
const Notification = require("./notifications");

var User = bookshelf.Model.extend({
    tableName: 'users',
    idAttribute: 'userName',
    pictures: function(){
        return this.hasMany(Picture);
    },
    notifications: function(){
        return this.hasMany(Notification);
    }
});

module.exports = User;