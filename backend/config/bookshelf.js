var knex = require('knex')({
    client: 'mysql',
    connection: global.configs.dbConnection
});
module.exports = require('bookshelf')(knex);
