import * as Backbone from "backbone";
import * as _ from "underscore";
import * as $ from "jquery";

import {UserModel} from "../models/UserModel";
import {HeaderRequestGenerator} from "../util/HeaderRequestGenerator";

export class UserProfileSettingsView extends Backbone.View<UserModel> {
    private template: Function;
    private userModel: UserModel;

    constructor(options?: Backbone.ViewOptions<UserModel>) {
        super(_.extend({
            el: "#content"
        }, options));
        this.template = require("./UserProfileSettingsTemplate.ejs") as Function;
        this.userModel = options["model"];
    }

    public render() {
        let that = this;
        this.userModel.fetch({
            success: function() {
                that.$el.html(that.template({userModel: that.userModel}));
            },
            error: function() {

            }
        });
        return this;
    }

    private events(){
        return <Backbone.EventsHash> {
            "click #saveProfile": "saveUserInfos"
        }
    }

    private saveUserInfos(ev) {
        ev.preventDefault();
        let that = this;

        let obj = {
            email :  $("#pepEmail").val(),
            firstName : $("#pepFirstName").val(),
            lastName : $("#pepLastName").val(),
            phoneNumber : $("#pepPhone").val()
        };

        this.userModel.save(obj, {
            beforeSend: HeaderRequestGenerator.setContentTypeToJSON,
            success: function() {
                alert("The user profile was successfully updated");
                that.render();
            },
            error: function() {

            }
        });
    }
}
