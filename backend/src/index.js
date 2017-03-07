const express = require('express');
const bodyParser = require('body-parser');
const config = require('getconfig');
const cors = require('cors');
const errors = require('./common/errors');
const Database = require("./infra/database/Database");

const basicApiRouter = require("./routers/basic-api-router");
const globalPicturesApiRouter = require("./routers/global-pictures-api-router");
const userApi = require("./routers/users-api-router");

const app = express();
const corsOptions = {
    origin: '*',
    methods: [
        'GET',
        'PUT',
        'POST',
        'PATCH',
        'DELETE',
        'UPDATE'
    ],
    credentials: true
};

// const winston = require('winston');
// const winstonCloudWatch = require('winston-cloudwatch');

// winston.add(winstonCloudWatch, {
//     logGroupName: 'glo3012',
//     logStreamName: 'sample'
// });

//app.set('views', __dirname + '/views');
//app.set('view engine', 'ejs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
//app.use(express.static(__dirname + '/public'));

//app.use(errors.handleReturnCall);

app.use("/", basicApiRouter);
app.use("/pictures", globalPicturesApiRouter);
app.use("/users", userApi);


const port = process.env.PORT || config.server.port;
app.listen(port);


var db = new Database();
db.connect();


//logger.info('App started on port ${port}');
console.log(`App started on port ${port}`)
