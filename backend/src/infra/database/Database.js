var Sequelize = require('sequelize');
var sequelize = new Sequelize(
    global.configs.sequelizeConfig.db,
    global.configs.sequelizeConfig.user,
    global.configs.sequelizeConfig.password,
    global.configs.sequelizeConfig.config
);

module.exports = class DataBase {
    connect(){
        sequelize.authenticate()
        .then(function(err) {
            console.log('Connection has been established successfully.');
        }, function (err) { 
            console.log('Unable to connect to the database:', err);
        });
    }
};