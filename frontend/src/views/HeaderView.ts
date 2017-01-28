import * as Backbone from "backbone";
import * as _ from "underscore";

import {HeaderModel} from "../models/HeaderModel";

export class HeaderView extends Backbone.View<HeaderModel> {
    private template: Function;

    constructor(options?: Backbone.ViewOptions<HeaderModel>) {
        super(_.extend({
            el: "#header",
        }, options));
        this.template = require("./HeaderTemplate.ejs") as Function;
    }

    public render() {
        this.$el.html(this.template(this.model.toJSON()));
        return this;
    }
}
