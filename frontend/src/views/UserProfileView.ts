import * as Backbone from "backbone";
import * as _ from "underscore";

import {UserModel} from "../models/UserModel";
import {PictureView} from "./PictureView";
import {ShowMoreView} from "./ShowMoreView";

export class UserProfileView extends Backbone.View<any> {
    private template: Function;
    private picturesPerPage: number = 9;
    private nextPageToFetch: number = 1;

    constructor(options?: any) {
        super(options);
        this.template = require("./UserCollectionTemplate.ejs") as Function;
    }

    public events() {
        return <Backbone.EventsHash> {
            "click #addPictureButton": () => {this.showOnClick("#popupContent"); },
            "click #closeButtonPopup": () => {this.hideOnClick("#popupContent"); },
            "click #optionButton": () => {this.showOnClick("#popupCloseContent"); },
            "click #closeExitButtonPopup": () => {this.hideOnClick("#popupCloseContent"); },
            "click #closeCancelButtonPopup": () => {this.hideOnClick("#popupCloseContent"); },
            "click #postPictureButton": () => {this.postPicture(); },
        };
    }

    public showOnClick(element) {
        $(element).show();
    }

    public hideOnClick(element) {
        $(element).hide();
    }

    public render() {
        this.model.fetch({
            success: () => {
                this.$el.html(this.template({ user: this.model}));

                const showMoreView = new ShowMoreView({
                    el: "#show-more-container",
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
                this.renderPictures();
            },
            error: () => {
                $("#profile-pictures-list").append("<h3>You have no pictures yet!</h3>");
                $("#show-more-container").hide();
            },
        });
    }

    private renderPictures() {
        this.collection.each((picture) => {
            const pictureView = new PictureView({el: "#profile-pictures-list" , model: picture});
            pictureView.append();
        });
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
