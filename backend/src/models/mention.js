//const bcrypt = require('bcrypt-nodejs');
const bookshelf = require('../../config/bookshelf');

var Mention = bookshelf.Model.extend({
    tableName: 'mentions'
});

module.exports = Mention;