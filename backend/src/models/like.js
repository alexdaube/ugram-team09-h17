const bookshelf = require('../../config/bookshelf');

var Like = bookshelf.Model.extend({
    tableName: 'likes',
    idAttribute: 'id',
});

module.exports = Like;