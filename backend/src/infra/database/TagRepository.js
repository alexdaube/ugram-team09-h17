var ErrorHandler = require("../../common/errors");
const Tag = require("../../models/tag");


var tagRepository = function (config) {
    this.host = config.host;
    this.port = config.port;
};

tagRepository.prototype.getPopularHashtags = function () {
    new Tag().fetchAll()
        .then(function (tags) {
            if (tags) {
                tags.query(function (qb) {
                    qb.select('tag')
                        .groupBy('tag')
                        .orderBy("count(*)", "desc")
                        .count()
                        .limit(10)
                }).fetch()
                    .then(function (newTags) {
                        console.log(newTags.toJSON());
                    })
            }
        });
}

module.exports = tagRepository;

