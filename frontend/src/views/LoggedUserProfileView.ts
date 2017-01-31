import * as Backbone from "backbone";
import * as _ from "underscore";
import * as $ from "jquery";

import {UserModel} from "../models/UserModel";

export class LoggedUserProfileView extends Backbone.View<UserModel> {

    private template: Function;
    private userProfileModel: UserModel;

    constructor(options?: Backbone.ViewOptions<UserModel>) {
        super(_.extend({el: "#content"}, options));
        this.template = require("./LoggedUserProfileTemplate.ejs") as Function;
        this.userProfileModel = options["model"];
    }

    public render() {
        const that = this;
        this.userProfileModel.fetch({
            success() {
                $("#buttonAddPicture").click(function() {
                    const d = $("#popupAddContent");
                    if (d.hasClass("popupVisibleAdd")) {
                        d.removeClass("popupVisibleAdd");
                    } else {
                        d.addClass("popupVisibleAdd");
                    }
                });

                $("#closeAddButtonPopup").click(function() {
                    const d = $("#popupAddContent");
                    if (d.hasClass("popupVisibleAdd")) {
                        d.removeClass("popupVisibleAdd");
                    } else {
                        d.addClass("popupVisibleAdd");
                    }
                });

                $("#buttonExitUgram").click(function() {
                    const d = $("#popupCloseContent");
                    if (d.hasClass("popupVisibleExit")) {
                        d.removeClass("popupVisibleExit");
                    } else {
                        d.addClass("popupVisibleExit");
                    }
                });

                $("#closeExitButtonPopup").click(function() {
                    const d = $("#popupCloseContent");
                    if (d.hasClass("popupVisibleExit")) {
                        d.removeClass("popupVisibleExit");
                    } else {
                        d.addClass("popupVisibleExit");
                    }
                });

                $("#closeCancelButtonPopup").click(function() {
                    const d = $("#popupCloseContent");
                    if (d.hasClass("popupVisibleExit")) {
                        d.removeClass("popupVisibleExit");
                    } else {
                        d.addClass("popupVisibleExit");
                    }
                });

                that.$el.html(that.template({userModel: that.userProfileModel}));
            },
            error() {
                // TODO handle error
            },
        });
        return this;
    }
}
