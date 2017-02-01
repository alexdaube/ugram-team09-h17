import * as Backbone from "backbone";
import * as _ from "underscore";

import {FeedCollectionForView} from "../collections/FeedCollectionForView";
import {FeedCollection} from "../collections/FeedCollection";
import {PostView} from "./PostView";

export class FeedCollectionView extends Backbone.View<FeedCollectionForView> {

    private template: Function;
    private recentlyPostedPictures: FeedCollection;
    private picturesPerPage: number = 8;
    private nextPageToFetch: number = 1;

    constructor(options?: Backbone.ViewOptions<FeedCollectionForView>) {
        super(_.extend({el: "#content"}, options));
        this.recentlyPostedPictures = options["recentlyPostedPictures"];
        this.template = require("./FeedCollectionTemplate.ejs") as Function;
    }

    public render() {
        this.$el.html(this.template());
        const feedCollection = this.model.getCollection();
        feedCollection.fetch({
            success(response) {
                $("#postsList").html("");
                response.models.forEach((pictureModel) => {
                    const postView = new PostView({model: pictureModel});
                    $("#postsList").append(postView.$el);
                    postView.render();
                });
            },
        });
        this.showMorePictures();
        return this;
    }

    public events() {
        return <Backbone.EventsHash> {
            "click .moreTextProfile": "showMorePictures",
        };
    }

    private showMorePictures() {
        this.recentlyPostedPictures.fetch({
            data: {
                page: this.nextPageToFetch,
                perPage: this.picturesPerPage,
            },
            success: () => {
                this.nextPageToFetch += 1;
                this.renderPictures();
            },
        });
    }

    private renderPictures() {
        let picturesHtml: string = "";
        this.recentlyPostedPictures.each((picture) => {
            picturesHtml += `<div class="recentImg"><a><img id="recentlyPostedPicture_${picture.id}" \
                src="${picture.url}" /></a></div>`;
        });
        $("#most-recent-posted-pictures").append(picturesHtml);
        this.checkForMorePicturesAvailable();
    }

    private checkForMorePicturesAvailable() {
        if (this.recentlyPostedPictures.length < this.picturesPerPage) {
            $(".addMoreProfile").hide();
        }
    }
}
