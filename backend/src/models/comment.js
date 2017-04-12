const bookshelf = require('../../config/bookshelf');
const User = require("./user");

var Comment = bookshelf.Model.extend({
    tableName: 'comments',
    idAttribute: 'id'
});

module.exports = Comment;