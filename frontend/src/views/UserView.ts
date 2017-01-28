import * as Backbone from "backbone";
import * as _ from "underscore";
import {ProfileModel} from "../models/ProfileModel";

export class UserView extends Backbone.View<ProfileModel> {
    private template: Function;

    constructor(options?: Backbone.ViewOptions<ProfileModel>) {
        super(_.extend({
            tagname: "div",
        }, options));
        this.template = require("./UserTemplate.ejs") as Function;
    }

    public render() {
        this.$el.html(this.template(this.model.toJSON()));
        return this;
    }
}
