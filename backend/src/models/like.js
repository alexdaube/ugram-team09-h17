const bookshelf = require('../../config/bookshelf');

var Like = bookshelf.Model.extend({
    tableName: 'likes',

    id: 'id',
    userId: 'userId',
    pictureId: 'pictureId',
});

module.exports = Like;