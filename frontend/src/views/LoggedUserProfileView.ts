import * as Backbone from "backbone";
import * as _ from "underscore";
import * as $ from "jquery";

import {UserModel} from "../models/UserModel";
import {EditPictureModel} from "../models/EditPictureModel";

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
                $("#buttonAddPicture").click(() => {
                    const d = $("#popupAddContent");
                    if (d.hasClass("popupVisibleAdd")) {
                        d.removeClass("popupVisibleAdd");
                    } else {
                        d.addClass("popupVisibleAdd");
                    }
                });

                $("#closeAddButtonPopup").click(() => {
                    const d = $("#popupAddContent");
                    if (d.hasClass("popupVisibleAdd")) {
                        d.removeClass("popupVisibleAdd");
                    } else {
                        d.addClass("popupVisibleAdd");
                    }
                });

                $("#buttonExitUgram").click(() => {
                    const d = $("#popupCloseContent");
                    if (d.hasClass("popupVisibleExit")) {
                        d.removeClass("popupVisibleExit");
                    } else {
                        d.addClass("popupVisibleExit");
                    }
                });

                $("#closeExitButtonPopup").click(() => {
                    const d = $("#popupCloseContent");
                    if (d.hasClass("popupVisibleExit")) {
                        d.removeClass("popupVisibleExit");
                    } else {
                        d.addClass("popupVisibleExit");
                    }
                });

                $("#closeCancelButtonPopup").click(() => {
                    const d = $("#popupCloseContent");
                    if (d.hasClass("popupVisibleExit")) {
                        d.removeClass("popupVisibleExit");
                    } else {
                        d.addClass("popupVisibleExit");
                    }
                });

                that.$el.html(that.template({userModel: that.userProfileModel}));
                $("#addPictureButton").click(function () {
                    $("#popupContent").show();
                });
                $("#closeButtonPopup").click(function () {
                    $("#popupContent").hide();
                });
                $("#postPictureButton").click(that.postPicture);
            },
            error() {
                // TODO handle error
            },
        });
        return this;
    }

    public postPicture() {
        let description : string = $("#description").val();
        let mentions : string[] = description.match(/@\w+/g);
        let tags : string[] = description.match(/#\w+/g);

        let formData : FormData = new FormData();
        formData.append('description', description);
        formData.append('mentions', mentions);
        formData.append('tags', tags);
        formData.append('file', (<any>$('input[type=file]')[0]).files[0]);
        $.ajax({
            url: "http://api.ugram.net/users/jlabonte/pictures",
            type: "POST",
            data: formData,
            processData: false,
            contentType: false,
            cache: false,
            beforeSend: function(xhr) {
                xhr.setRequestHeader('Authorization', 'Bearer 24d6e087-51a0-465a-a19b-ce9570ad3169')
            }
        }).done(function () {
            $("#popupContent").hide();
        }).fail(function () {
            $("#error-text").text("Could not upload picture");
        });
    }
}
