import * as Backbone from "backbone";
import * as _ from "underscore";

import {FooterModel} from "../models/FooterModel";

export class FooterView extends Backbone.View<FooterModel> {
    private template: Function;

    constructor(options?: Backbone.ViewOptions<FooterModel>) {
        super(_.extend({
            el: "#footer",
        }, options));
        this.template = require("./FooterTemplate.ejs") as Function;
    }

    public render() {
        this.$el.html(this.template(this.model.toJSON()));
        return this;
    }
}
