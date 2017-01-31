import * as Backbone from "backbone";
import * as _ from "underscore";
import {RecentlyPostedPictureCollection} from "../collections/RecentlyPostedPictureCollection";

export class RecentlyPostedPicturesView extends Backbone.View<any> {
    private template: Function;
    private recentlyPostedPictures: RecentlyPostedPictureCollection;
    private picturesPerPage: number = 8;
    private nextPageToFetch: number = 1;

    constructor(options?: any) {
        super(_.extend({
            el: "#content",
        }, options));
        this.recentlyPostedPictures = options["recentlyPostedPictures"];
        this.template = require("./RecentlyPostedPicturesTemplate.ejs") as Function;
    }

    public render() {
        const html = this.template({pictures: this.recentlyPostedPictures.models});
        this.$el.html(html);
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
