const bookshelf = require('../../config/bookshelf');

var Like = bookshelf.Model.extend({
    tableName: 'likes',

    //TODO refacto, pcq jpense c pas bon
    id: 'id',
    userId: 'userId',
    postId: 'pictureId',
});

module.exports = Like;