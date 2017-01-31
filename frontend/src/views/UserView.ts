import * as Backbone from "backbone";
import * as _ from "underscore";

import {UserModel} from "../models/UserModel";

export class UserView extends Backbone.View<UserModel> {
    private template: Function;

    constructor(options?: Backbone.ViewOptions<UserModel>) {
        super(_.extend({}, options));
        this.template = require("./UserTemplate.ejs") as Function;
    }

    public render() {
        this.$el.html(this.template(this.model.toJSON()));
        return this;
    }
}
