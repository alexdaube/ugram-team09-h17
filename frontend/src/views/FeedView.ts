import * as Backbone from "backbone";
import * as _ from "underscore";

import {FeedModel} from "../models/FeedModel";

export class FeedView extends Backbone.View<FeedModel> {
    private template: Function;

    constructor(options?: Backbone.ViewOptions<FeedModel>) {
        super(_.extend({el: "#content"}, options));
        this.template = require("./FeedTemplate.ejs") as Function;
    }

    public render() {
        this.$el.html(this.template(this.model.toJSON()));
        return this;
    }
}
