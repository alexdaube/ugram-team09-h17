import * as Backbone from "backbone";
import * as _ from "underscore";

import {UserModel} from "../models/UserModel";

export class UserProfileView extends Backbone.View<UserModel> {
    private template: Function;
    private userProfileModel: UserModel;

    constructor(options?: Backbone.ViewOptions<UserModel>) {
        super(_.extend({
            el: "#content"
        }, options));
        this.template = require("./UserProfileTemplate.ejs") as Function;
        this.userProfileModel = options["model"];
    }

    public render() {
        let that = this;
        this.userProfileModel.fetch({
            success: function() {
                that.$el.html(that.template({userModel: that.userProfileModel}));
            },
            error: function() {

            }
        });
        return this;
    }
}
