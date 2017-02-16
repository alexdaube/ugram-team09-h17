import * as Backbone from "backbone";
import * as _ from "underscore";

import {LoginModel} from "../models/LoginModel";

export class RegisterView extends Backbone.View<LoginModel> {
    private template: Function;

    constructor(options?: Backbone.ViewOptions<LoginModel>) {
        super(_.extend({el: "#content"}, options));
        this.template = require("./RegisterTemplate.ejs") as Function;
    }

    public render() {
        this.$el.html(this.template(this.model.toJSON()));
        return this;
    }
}
