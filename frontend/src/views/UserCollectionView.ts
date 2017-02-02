import * as Backbone from "backbone";
import * as _ from "underscore";

import {ShowMoreView} from "./ShowMoreView";
import {UserView} from "./UserView";

export class UserCollectionView extends Backbone.View<any> {
    private template: Function;
    private usersPerPage: number = 15;
    private nextPageToFetch: number = 1;

    constructor(options?: Backbone.ViewOptions<any>) {
        super(_.extend({el: "#content"}, options));
        this.template = require("./UserCollectionTemplate.ejs") as Function;
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

    private showPictures() {
        this.collection.fetch({
            data: {
                page: this.nextPageToFetch,
                perPage: this.usersPerPage,
            },
            success: () => {
                this.nextPageToFetch += 1;
                this.renderPictures();
            },
        });
    }

    private renderPictures() {
        this.collection.each((user) => {
            const userView = new UserView({el: "#usersList" , model: user});
            userView.append();
        });
        this.checkForMorePicturesAvailable();
    }

    private checkForMorePicturesAvailable() {
        if (this.collection.length < this.usersPerPage) {
            $("#show-more-container").hide();
        }
    }
}
