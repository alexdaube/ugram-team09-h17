var knex = require('knex')({
    client: 'mariasql',
    connection: {
        host     : '127.0.0.1',
        user     : 'root',
        password : 'root',
        db : 'ugram',
        charset  : 'utf8'
    }
});
module.exports = require('bookshelf')(knex);
