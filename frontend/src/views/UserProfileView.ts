import * as Backbone from "backbone";

import {PictureView} from "./PictureView";
import {ShowMoreView} from "./ShowMoreView";
import {HeaderRequestGenerator} from "../util/HeaderRequestGenerator";
import {InputValidator} from "../util/InputValidator";

export class UserProfileView extends Backbone.View<any> {
    private template: Function;
    private picturesPerPage: number = 3;
    private nextPageToFetch: number = 1;

    constructor(options?: any) {
        super(options);
        this.template = require("./UserProfileTemplate.ejs") as Function;
    }

    public events() {
        return <Backbone.EventsHash> {
            "click #addPictureButton": () => {
                $("#popupContent").show();
            },
            "click #closeButtonPopup": () => {
                $("#popupContent").hide();
            },
            "click #optionButton": () => {
                $("#popupCloseContent").show();
            },
            "click #closeExitButtonPopup": () => {
                $("#popupCloseContent").hide();
            },
            "click #closeCancelButtonPopup": () => {
                $("#popupCloseContent").hide();
            },
            "click #postPictureButton": () => {
                this.postPicture();
            },
        };
    }

    public render() {
        this.model.fetch({
            success: () => {
                this.$el.html(this.template({user: this.model}));

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
            const pictureView = new PictureView({el: "#profile-pictures-list", model: picture});
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

        if (InputValidator.containsScriptInjection(description)) {
            alert("Forbidden description");
            return;
        }

        const formData: FormData = new FormData();
        formData.append("description", description);
        formData.append("mentions", mentions);
        formData.append("tags", tags);
        formData.append("file", (<any> $("input[type=file]")[0]).files[0]);
        $.ajax({
            url: "http://api.ugram.net/users/" + HeaderRequestGenerator.userId + "/pictures",
            type: "POST",
            data: formData,
            processData: false,
            contentType: false,
            cache: false,
            beforeSend: HeaderRequestGenerator.sendAuthorization,
        }).done(() => {
            $("#popupContent").hide();
        }).fail(() => {
            $("#error-text").text("Could not upload picture");
        });
    }
}
