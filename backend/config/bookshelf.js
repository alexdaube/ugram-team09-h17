var knex = require('knex')({
    client: global.configs.dbDialect,
    connection: global.configs.dbConnection
});
module.exports = require('bookshelf')(knex);
