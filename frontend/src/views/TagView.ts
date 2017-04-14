import * as Backbone from "backbone";
import * as _ from "underscore";

import {TagModel} from "../models/TagModel";

export class TagView extends Backbone.View<TagModel> {
    private template: Function;

    constructor(options?: Backbone.ViewOptions<TagModel>) {
        super(_.extend({}, options));
        this.template = require("./TagTemplate.ejs") as Function;
    }

    public append() {
        this.$el.append(this.template({tag: this.model.toJSON()}));
        return this;
    }
}
