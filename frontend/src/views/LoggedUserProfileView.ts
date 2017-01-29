import * as Backbone from "backbone";
import * as _ from "underscore";

import {UserModel} from "../models/UserModel";

export class LoggedUserProfileView extends Backbone.View<UserModel> {
    private template: Function;
    private userProfileModel: UserModel;

    constructor(options?: Backbone.ViewOptions<UserModel>) {
        super(_.extend({
            el: "#content",
        }, options));
        this.template = require("./LoggedUserProfileTemplate.ejs") as Function;
        this.userProfileModel = options["model"];
    }

    public render() {
        const that = this;
        this.userProfileModel.fetch({
            success() {
                that.$el.html(that.template({userModel: that.userProfileModel}));
            },
            error() {
                // TODO handle error
            },
        });
        return this;
    }
}
