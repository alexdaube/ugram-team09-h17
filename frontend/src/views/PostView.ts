import * as Backbone from "backbone";
import * as _ from "underscore";

import {PictureModel} from "../models/PictureModel";

export class PostView extends Backbone.View<PictureModel> {
    private template: Function;

    constructor(options?: Backbone.ViewOptions<PictureModel>) {
        super(_.extend({el: "#content"}, options));
        this.template = require("./PostTemplate.ejs") as Function;
    }

    public render() {
        this.$el.html(this.template(this.model.toJSON()));
        return this;
    }
}
