import * as Backbone from "backbone";
import * as _ from "underscore";

import {LoginModel} from "../models/LoginModel";

export class LoginView extends Backbone.View<LoginModel> {
    private template: Function;

    constructor(options?: Backbone.View<LoginModel>) {
        super(_.extend({el: "#content"}, options));
        this.template = require("./LoginTemplate.ejs") as Function;
    }

    public render() {
        this.$el.html(this.template(this.model.toJSON()));
        return this;
    }
}