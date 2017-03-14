var Sequelize = require('sequelize')
  , sequelize = new Sequelize('ugram', 'root', 'root', {
      dialect: "mariadb", // or 'sqlite', 'postgres', 'mariadb'
      port:    3306, // or 5432 (for postgres)
    });


module.exports = class DataBase {

    connect(){
        sequelize.authenticate()
        .then(function(err) {
            console.log('Connection has been established successfully.');
        }, function (err) { 
            console.log('Unable to connect to the database:', err);
        });
    }
}