const bookshelf = require('../../config/bookshelf');

var Comment = bookshelf.Model.extend({
    tableName: 'comments',
    idAttribute: 'id'
});

module.exports = Comment;