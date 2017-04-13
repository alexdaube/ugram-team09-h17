var TaskRepository = require("../infra/database/TagRepository");

var taskService = function (config) {
    this.persistence = new TaskRepository(config);
};

taskService.prototype.getPopularHashtags = function (request, responseObject) {

    this.persistence.getPopularHashtags(function (err, response) {
        if (!err && response) {
            returnObject.status(200).json(response);
        }
        else {
            returnObject.status(err.statusCode).send(err.message);
        }
    });
};


module.exports = taskService;