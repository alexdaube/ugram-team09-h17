var ErrorHandler = require("../../common/errors");
const Tag = require("../../models/tag");
var DatabaseDTO = require("../../util/DatabaseDTO");


var tagRepository = function (config) {
    this.host = config.host;
    this.port = config.port;

    this.databaseDTO = new DatabaseDTO();
};

tagRepository.prototype.getPopularHashtags = function (callback) {
    var that = this;
    new Tag()
        .fetchAll()
        .then(function (tags) {
            if (tags) {
                tags.query(function (qb) {
                    qb.select('tag')
                        .groupBy('tag')
                        .orderBy("count(*)", "desc")
                        .count()
                        .limit(10);
                }).fetch()
                    .then(function (newTags) {
                        return callback(null, that.databaseDTO.getTagJSON(newTags.toJSON()));
                    });
            }
            else {
                return callback(404, "No tags found");
            }
        });
};

module.exports = tagRepository;

