var TaskRepository = require("../infra/database/TagRepository");

var taskService = function (config) {
    this.persistence = new TaskRepository(config);
};

taskService.prototype.getPopularHashtags = function (request, returnObject) {

    this.persistence.getPopularHashtags(function (err, response) {
        if (!err && response) {
            returnObject.status(200).json(response);
        }
        else {
            returnObject.status(err).send(response);
        }
    });
};


module.exports = taskService;