import * as Backbone from "backbone";
import * as $ from "jquery";
import * as _ from "underscore";

import {UserModel} from "../models/UserModel";
import {HeaderRequestGenerator} from "../util/HeaderRequestGenerator";
import {InputFormatter} from "../util/InputFormatter";
import {InputValidator} from "../util/InputValidator";

export class UserSettingsView extends Backbone.View<UserModel> {

    private template: Function;
    private userModel: UserModel;

    constructor(options?: Backbone.ViewOptions<UserModel>) {
        super(_.extend({el: "#content"}, options));
        this.template = require("./UserSettingsTemplate.ejs") as Function;
        this.userModel = options["model"];
    }

    public render() {
        const that = this;
        this.userModel.fetch({
            success() {
                that.$el.html(that.template({userModel: that.userModel}));
                $(document).ready(() => {
                    // TODO show and hide #textSaveSetting and #textErrorSetting (popup)
                });
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
            phoneNumber : InputFormatter.normalizePhoneNumber($("#pepPhone").val()),
        };

        if (!InputValidator.emailAddressIsValid(obj.email)) {
            alert("Email address is invalid");
            return;
        }
        if (!InputValidator.nameIsValid(obj.firstName)) {
            alert("First Name is invalid");
            return;
        }
        if (!InputValidator.nameIsValid(obj.lastName)) {
            alert("Last Name is invalid");
            return;
        }

        this.userModel.save(obj, {
            beforeSend: HeaderRequestGenerator.setContentTypeToJSON,
            success() {
                alert("The user profile was successfully updated");
                that.render();
            },
            error() {
                alert("An error occured while updating the user");
            },
        });
    }
}
