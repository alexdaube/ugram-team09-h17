var knex = require('knex')({
    client: global.configs.bookshelf.dbDialect,
    connection: global.configs.bookshelf.dbConnection
});
module.exports = require('bookshelf')(knex);
