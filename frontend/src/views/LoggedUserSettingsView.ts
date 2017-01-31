import * as Backbone from "backbone";
import * as $ from "jquery";
import * as _ from "underscore";

import {UserModel} from "../models/UserModel";
import {HeaderRequestGenerator} from "../util/HeaderRequestGenerator";

export class LoggedUserSettingsView extends Backbone.View<UserModel> {

    private template: Function;
    private userModel: UserModel;

    constructor(options?: Backbone.ViewOptions<UserModel>) {
        super(_.extend({
            el: "#content",
        }, options));
        this.template = require("./LoggedUserSettingsTemplate.ejs") as Function;
        this.userModel = options["model"];
    }

    public render() {
        const that = this;
        this.userModel.fetch({
            success() {
                that.$el.html(that.template({userModel: that.userModel}));
                $(document).ready(function() {
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
            phoneNumber : $("#pepPhone").val(),
        };

        this.userModel.save(obj, {
            beforeSend: HeaderRequestGenerator.setContentTypeToJSON,
            success() {
                alert("The user profile was successfully updated");
                    // TODO Valider les champs contre le hacking
                    // Voir https://www.owasp.org/index.php/Input_Validation_Cheat_Sheet#Preventing_XSS_and_Content_Security_Policy
                that.render();
            },
            error() {
                // TODO Handle error
            },
        });
    }
}