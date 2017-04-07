const bookshelf = require('../../config/bookshelf');

var Like = bookshelf.Model.extend({
    tableName: 'likes',

    //TODO refacto, pcq jpense c pas bon
    userId: 'userId',
    postId: 'postId'
});

module.exports = Like;