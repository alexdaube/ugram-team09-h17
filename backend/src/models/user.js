//const bcrypt = require('bcrypt-nodejs');
const bookshelf = require('../../config/bookshelf');

var User = bookshelf.Model.extend({
    tableName: 'users',
    idAttribute: 'userName'
});

module.exports = User;