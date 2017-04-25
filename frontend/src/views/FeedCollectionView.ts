import * as Backbone from "backbone";
import * as _ from "underscore";

import {HeaderRequestGenerator} from "../util/HeaderRequestGenerator";
import {ShowMoreView} from "./ShowMoreView";
import {PostView} from "./PostView";
import {API_BASE_URL} from "../constants";
import {CommentModel} from "../models/CommentModel";

export class FeedCollectionView extends Backbone.View<any> {
    private template: Function;
    private picturesPerPage: number = 8;
    private nextPageToFetch: number = 0;

    constructor(options?: any) {
        super(_.extend({}, options));
        this.template = require("./FeedCollectionTemplate.ejs") as Function;
    }

    public render() {
        const html = this.template();
        this.$el.html(html);
        this.showPictures();
        const showMoreView = new ShowMoreView({
            el: "#show-more-container",
            showMoreCallback: this.showPictures.bind(this),
        });
        showMoreView.render();
        return this;
    }

    public close() {
        this.remove();
        this.unbind();
    }

    private showPictures() {
        this.collection.fetch({
            beforeSend: HeaderRequestGenerator.sendAuthorization,
            data: {
                page: this.nextPageToFetch,
                perPage: this.picturesPerPage,
            },
            success: () => {
                this.nextPageToFetch += 1;
                this.renderPictures();
            },
            error: () => {
                this.renderEmpty();
            },
        });
    }

    private renderPictures() {
        if (this.collection.length === 0) {
            return this.renderEmpty();
        }
        this.collection.each((picture) => {
            const postView = new PostView({el: "#posts-list", model: picture});
            postView.append();
        });
        this.checkForMorePicturesAvailable();
    }

    private renderEmpty() {
        $("#posts-list").append(`<div class="noPicturesInFeed"><p>There are no pictures available. )-:</p></div>`);
    }

    private checkForMorePicturesAvailable() {
        if (this.collection.length < this.picturesPerPage) {
            $("#show-more-container").hide();
        }
    }
}
