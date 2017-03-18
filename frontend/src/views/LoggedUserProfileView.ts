import * as Backbone from "backbone";
import * as _ from "underscore";
import * as $ from "jquery";

import {HeaderRequestGenerator} from "../util/HeaderRequestGenerator";
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
            beforeSend: HeaderRequestGenerator.sendAuthorization,
            success() {
                that.$el.html(that.template({userModel: that.userProfileModel}));
                $("#buttonExitUgram").click(() => {
                    $("#popupContent").show();
                });
                $("#closeExitButtonPopup").click(() => {
                    $("#popupContent").hide();
                });
                $("#buttonAddPicture").click(() => {
                    $("#popupContent").show();
                });
                $("#closeButtonPopup").click(() => {
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
        const description: string = $("#description").val();
        const mentions: string[] = description.match(/@\w+/g);
        const tags: string[] = description.match(/#\w+/g);

        const formData: FormData = new FormData();
        formData.append("description", description);
        formData.append("mentions", mentions);
        formData.append("tags", tags);
        formData.append("file", (<any> $("input[type=file]")[0]).files[0]);
        $.ajax({
            // TODO on a laissé jlabonte hard coder dans le code?
            //url: "http://api.ugram.net/users/jlabonte/pictures",
            url: "http://localhost:3000/users/jlabonte/pictures",
            type: "POST",
            data: formData,
            processData: false,
            contentType: false,
            cache: false,
            beforeSend: (xhr) => {
                xhr.setRequestHeader("Authorization", "Bearer 24d6e087-51a0-465a-a19b-ce9570ad3169");
            },
        }).done(() => {
            $("#popupContent").hide();
        }).fail(() => {
            $("#error-text").text("Could not upload picture");
        });
    }
}
