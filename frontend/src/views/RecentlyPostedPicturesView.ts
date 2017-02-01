import * as Backbone from "backbone";
import * as _ from "underscore";

import {ShowMoreView} from "./ShowMoreView";
import {PostView} from "./PostView";

export class RecentlyPostedPicturesView extends Backbone.View<any> {
    private template: Function;
    private picturesPerPage: number = 4;
    private nextPageToFetch: number = 1;

    constructor(options?: any) {
        super(_.extend({}, options));
        this.template = require("./RecentlyPostedPicturesTemplate.ejs") as Function;
    }

    public render() {
        const html = this.template();
        this.$el.html(html);
        this.showMorePictures();
        const showMoreView = new ShowMoreView({
            element: "#show-more-container",
            showMoreCallback: this.showMorePictures.bind(this),
        });
        showMoreView.render();
        return this;
    }

    private showMorePictures() {
        this.collection.fetch({
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
        this.collection.each((picture) => {
            const postView = new PostView({el: "#posts-list" , model: picture});
            postView.append();
        });
        this.checkForMorePicturesAvailable();
    }

    private checkForMorePicturesAvailable() {
        if (this.collection.length < this.picturesPerPage) {
            $(".addMoreProfile").hide();
        }
    }
}
