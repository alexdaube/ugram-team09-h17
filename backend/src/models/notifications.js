const bookshelf = require('../../config/bookshelf');

var Notification = bookshelf.Model.extend({
    tableName: 'notifications',
    idAttribute: 'id',
});

module.exports = Notification;