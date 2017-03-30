const bookshelf = require('../../config/bookshelf');

var Tag = bookshelf.Model.extend({
    tableName: 'tags',
});



module.exports = Tag;