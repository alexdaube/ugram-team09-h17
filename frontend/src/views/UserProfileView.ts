import * as Backbone from "backbone";
import * as _ from "underscore";

import {UserModel} from "../models/UserModel";
import {UserView} from "./UserView";
import {ShowMoreView} from "./ShowMoreView";

export class UserProfileView extends Backbone.View<UserModel> {
    private template: Function;
    private picturesPerPage: number = 10;
    private nextPageToFetch: number = 1;

    constructor(options?: Backbone.ViewOptions<UserModel>) {
        super(_.extend({
            el: "#content",
        }, options));
        this.template = require("./UserProfileTemplate.ejs") as Function;
    }

    public render() {
        this.model.fetch({
            success: () => {
                this.$el.html(this.template({ user: this.model}));

                $("#addPictureButton").click(() => {
                    $("#popupContent").show();
                });
                $("#closeButtonPopup").click(() => {
                    $("#popupContent").hide();
                });
                $("#optionButton").click(() => {
                    $("#popupCloseContent").show();
                });
                $("#closeExitButtonPopup").click(() => {
                    $("#popupCloseContent").hide();
                });
                $("#closeCancelButtonPopup").click(() => {
                    $("#popupCloseContent").hide();
                });
                $("#postPictureButton").click(this.postPicture);

                const showMoreView = new ShowMoreView({
                    element: "#show-more-container",
                    showMoreCallback: this.showPictures.bind(this),
                });
                showMoreView.render();
                this.showPictures();
            },
            error: () => {
                this.$el.html(this.template("No user by that name!"));
            },
        });
        return this;
    }

    private showPictures() {
        this.collection.fetch({
            data: {
                page: this.nextPageToFetch,
                perPage: this.picturesPerPage,
            },
            success: () => {
                this.nextPageToFetch += 1;
                this.appendPictures();
            },
            error: () => {
                $("#profile-pictures-list").append("<h3>You have no pictures yet!</h3>");
                $("#show-more-container").hide();
            },
        });
    }

    private appendPictures() {
        let picturesHtml = "";
        this.collection.each((picture) => {
            const postView = new UserView({el: "#profile-pictures-list" , model: picture});
            postView.append();
            picturesHtml += `<a class="showImgProfile"><div class="displayImgProfile"><div class="divImgProfile">
                <img id="profilePicture_${picture.id}" src="${picture["imageUrl"]}" /></div></div></a>`;
        });
        $("#profile-pictures-list").append(picturesHtml);
        this.checkForMorePicturesAvailable();
    }

    private checkForMorePicturesAvailable() {
        if (this.collection.length < this.picturesPerPage) {
            $("#show-more-container").hide();
        }
    }

    private postPicture() {
        const description: string = $("#description").val();
        const mentions: string[] = description.match(/@\w+/g);
        const tags: string[] = description.match(/#\w+/g);

        const formData: FormData = new FormData();
        formData.append("description", description);
        formData.append("mentions", mentions);
        formData.append("tags", tags);
        formData.append("file", (<any> $("input[type=file]")[0]).files[0]);
        $.ajax({
            url: "http://api.ugram.net/users/jlabonte/pictures",
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
