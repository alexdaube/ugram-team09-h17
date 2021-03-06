import * as Backbone from "backbone";
import * as $ from "jquery";
import * as _ from "underscore";

import {UserModel} from "../models/UserModel";
import {HeaderRequestGenerator} from "../util/HeaderRequestGenerator";
import {InputValidator} from "../util/InputValidator";

export class UserSettingsView extends Backbone.View<UserModel> {

    private template: Function;
    private userModel: UserModel;

    constructor(options?: Backbone.ViewOptions<UserModel>) {
        super(_.extend({}, options));
        this.template = require("./UserSettingsTemplate.ejs") as Function;
        this.userModel = options["model"];
    }

    public render() {
        const that = this;
        this.userModel.fetch({
            beforeSend: HeaderRequestGenerator.sendAuthorization,
            success() {
                that.$el.html(that.template({userModel: that.userModel}));
            },
            error() {
                that.$el.html(that.template("No user by that name!"));
            },
        });
        return this;
    }

    public close() {
        this.remove();
        this.unbind();
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
            phoneNumber : $("#pepPhone").val(),
        };

        if (InputValidator.isTooLongText(obj.email) || InputValidator.isNullOrEmpty(obj.email) || !InputValidator.emailAddressIsValid(obj.email)) {
            $("#textErrorSetting").show();
            $("#textErrorSetting").find("p").text("Email address is invalid (e.g. test@test.com)");
            return;
        }

        if (InputValidator.isTooLongText(obj.email) || InputValidator.isNullOrEmpty(obj.firstName) || !InputValidator.normalInputIsValid(obj.firstName)) {
            $("#textErrorSetting").show();
            $("#textErrorSetting").find("p").text("First Name is invalid");
            return;
        }

        if (InputValidator.isTooLongText(obj.email) || InputValidator.isNullOrEmpty(obj.lastName) || !InputValidator.normalInputIsValid(obj.lastName)) {
            $("#textErrorSetting").show();
            $("#textErrorSetting").find("p").text("Last Name is invalid");
            return;
        }

        if (InputValidator.isTooLongText(obj.email) || InputValidator.isNullOrEmpty(obj.phoneNumber) || !InputValidator.phoneIsValid(obj.phoneNumber)) {
            $("#textErrorSetting").show();
            $("#textErrorSetting").find("p").text("Phone number is invalid (e.g. 1234567890)");
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
