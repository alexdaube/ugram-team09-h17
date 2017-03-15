var knex = require('knex')({
    client: 'mariasql',
    connection: global.configs.dbConnection
});
module.exports = require('bookshelf')(knex);
