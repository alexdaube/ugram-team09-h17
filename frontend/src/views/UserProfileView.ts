import * as Backbone from "backbone";
import * as _ from "underscore";

import {UserModel} from "../models/UserModel";

export class UserProfileView extends Backbone.View<UserModel> {
    private template: Function;
    private userModel: UserModel;

    constructor(options?: Backbone.ViewOptions<UserModel>) {
        super(_.extend({
            el: "#content",
        }, options));
        this.template = require("./UserProfileTemplate.ejs") as Function;
        this.userModel = options["model"];
    }

    public render() {
        const that = this;
        this.userModel.fetch({
            success() {
                that.$el.html(that.template({userModel: that.userModel}));
            },
            error() {
                // TODO handle error
            },
        });
        return this;
    }
}
