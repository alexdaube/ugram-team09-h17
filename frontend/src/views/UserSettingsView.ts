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
            "click .inputSizeSetting input": "hideSaveFeedBack",
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
            $("#textErrorSetting").show();
            $("#textErrorSetting").find("p").text("Email address is invalid");
            return;
        }
        if (!InputValidator.nameIsValid(obj.firstName)) {
            $("#textErrorSetting").show();
            $("#textErrorSetting").find("p").text("First Name is invalid");
            return;
        }
        if (!InputValidator.nameIsValid(obj.lastName)) {
            $("#textErrorSetting").show();
            $("#textErrorSetting").find("p").text("Last Name is invalid");
            return;
        }
        if (obj.phoneNumber.toString() === "NaN") {
            $("#textErrorSetting").show();
            $("#textErrorSetting").find("p").text("Phone number is empty");
            return;
        }

        this.userModel.save(obj, {
            beforeSend: HeaderRequestGenerator.setContentTypeToJSON,
            success() {
                $("#textSaveSetting").show();
                $("#textErrorSetting").hide();
            },
            error() {
                $("#textSaveSetting").hide();
                $("#textErrorSetting").show();
            },
        });
    }

    private hideSaveFeedBack() {
        $("#textSaveSetting").hide();
        $("#textErrorSetting").hide();
    }
}
