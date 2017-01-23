import {FeedModel} from '../models/FeedModel';

export class FeedView extends Backbone.View<FeedModel> {
    template: Function;

    constructor(options?: Backbone.ViewOptions<FeedModel>) {
        super(_.extend({
            el: '#app'
        }, options));
        this.template = require('./FeedTemplate.ejs') as Function;
    }

    render() {
        this.$el.html(this.template(this.model.toJSON()));
        return this;
    }
}