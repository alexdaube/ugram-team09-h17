import * as Backbone from "backbone";
import * as _ from "underscore";
import * as $ from "jquery";

import {HeaderRequestGenerator} from "../util/HeaderRequestGenerator";
import {UserModel} from "../models/UserModel";

export class UserProfileSettingsView extends Backbone.View<UserModel> {
    private template: Function;
    private userModel: UserModel;

    constructor(options?: Backbone.ViewOptions<UserModel>) {
        super(_.extend({
            el: "#content",
        }, options));
        this.template = require("./UserProfileSettingsTemplate.ejs") as Function;
        this.userModel = options["model"];
    }

    public render() {
        const that = this;
        this.userModel.fetch({
            success() {
                that.$el.html(that.template({userModel: that.userModel}));
            },
            error() {
                // TODO Handle error
            },
        });
        return this;
    }

    public events() {
        return <Backbone.EventsHash> {
            "click #saveProfile": "saveUserInfos",
        };
    }

    private saveUserInfos(ev) {
        ev.preventDefault();
        const that = this;

        const obj = {
            email :  $("#pepEmail").val(),
            firstName : $("#pepFirstName").val(),
            lastName : $("#pepLastName").val(),
            phoneNumber : $("#pepPhone").val(),
        };

        this.userModel.save(obj, {
            beforeSend: HeaderRequestGenerator.setContentTypeToJSON,
            success() {
                alert("The user profile was successfully updated");
                that.render();
            },
            error() {
                // TODO Handle error
            },
        });
    }
}
