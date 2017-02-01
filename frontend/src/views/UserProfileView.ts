import * as Backbone from "backbone";
import * as _ from "underscore";

import {UserModel} from "../models/UserModel";
import {ShowMoreView} from "./ShowMoreView";

export class UserProfileView extends Backbone.View<UserModel> {
    private template: Function;
    private picturesPerPage: number = 2;
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
            //const postView = new PostView({el: "#posts-list" , model: picture});
            //postView.append();
            picturesHtml += `<a class="showImgProfile"><div class="displayImgProfile"><div class="divImgProfile"><img id="profilePicture_${picture.id}" src="${picture["imageUrl"]}" /></div></div></a>`;
        });
        $("#profile-pictures-list").append(picturesHtml);
        this.checkForMorePicturesAvailable();
    }

    private checkForMorePicturesAvailable() {
        if (this.collection.length < this.picturesPerPage) {
            $("#show-more-container").hide();
        }
    }
}
