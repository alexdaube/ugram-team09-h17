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
            "click #optionButton": () => {
                $("#popupCloseContent").show();
            },
            "click #closeExitButtonPopup": () => {
                $("#popupCloseContent").hide();
            },
            "click #closeCancelButtonPopup": () => {
                $("#popupCloseContent").hide();
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
}
