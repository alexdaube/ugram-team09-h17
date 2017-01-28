import * as Backbone from "backbone";
import * as _ from "underscore";

import {SettingModel} from "../models/SettingModel";

export class SettingView extends Backbone.View<SettingModel> {
    private template: Function;

    constructor(options?: Backbone.ViewOptions<SettingModel>) {
        super(_.extend({
            el: "#content",
        }, options));
        this.template = require("./SettingTemplate.ejs") as Function;
    }

    public render() {
        this.$el.html(this.template(this.model.toJSON()));
        return this;
    }
}
