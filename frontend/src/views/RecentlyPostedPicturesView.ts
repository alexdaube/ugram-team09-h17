import * as Backbone from "backbone";
import * as _ from "underscore";
import {RecentlyPostedPictureCollection} from "../collections/RecentlyPostedPictureCollection";

export class RecentlyPostedPicturesView extends Backbone.View<any> {
    private template: Function;
    private recentlyPostedPictures: RecentlyPostedPictureCollection;
    private picturesPerPage: number = 6;
    private numberOfPicturesShown: number = 0;
    private nextPageToFetch: number = 1;
    private totalEntries: number;
    private totalPages: number;
    // http://api.ugram.net/pictures?page=1&perPage=10

    constructor(options?: any) {
        super(_.extend({
            el: "#content",
        }, options));
        this.recentlyPostedPictures = options["recentlyPostedPictures"];
        this.template = require("./RecentlyPostedPicturesTemplate.ejs") as Function;
        this.recentlyPostedPictures.fetch({
            data: {
                page: this.nextPageToFetch,
                perPage: this.picturesPerPage
            },
            success: (collection, data) => {
                this.totalEntries = data.totalEntries;
                this.totalPages = data.totalPages;
                this.nextPageToFetch += 1;
                this.render();
                this.renderPictures();
            }
        });
    }

    render() {
        let html = this.template({pictures: this.recentlyPostedPictures.models});
        this.$el.html(html);
        return this;
    }

    events() {
        return <Backbone.EventsHash> {
            "click .moreTextProfile": "showMorePictures",
        };
    }

    showMorePictures() {
        this.recentlyPostedPictures.fetch({
            data: {
                page: this.nextPageToFetch,
                perPage: this.picturesPerPage
            },
            success: () => {
                this.nextPageToFetch += 1;
                this.renderPictures();
            }
        });
    }

    private renderPictures() {
        let picturesHtml : string = '';
        this.recentlyPostedPictures.each((picture) => {
            picturesHtml += `<div class="recent-img"><a><img id="recentlyPostedPicture_${picture.id}" src="${picture.url}" /></a></div>`;
        });
        $('#most-recent-posted-pictures').append(picturesHtml);
        this.numberOfPicturesShown += this.recentlyPostedPictures.length;
        if (this.numberOfPicturesShown === this.totalEntries || this.recentlyPostedPictures.length < this.picturesPerPage) {
            $('.addMoreProfile').hide();
        }
    }
}
