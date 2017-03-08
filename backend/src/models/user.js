//const bcrypt = require('bcrypt-nodejs');
const bookshelf = require('../../config/bookshelf');

var User = bookshelf.Model.extend({
    tableName: 'users'
});

module.exports = User;