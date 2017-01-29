import * as Backbone from "backbone";
import * as _ from "underscore";
import {RecentlyPostedPictureCollection} from "../collections/RecentlyPostedPictureCollection";

export class RecentlyPostedPicturesView extends Backbone.View<any> {
    private template: Function;
    private recentlyPostedPictures: RecentlyPostedPictureCollection;
    private numberToShow : number = 6;

    constructor(options?: any) {
        super(_.extend({
            el: "#content",
        }, options));
        this.recentlyPostedPictures = options["recentlyPostedPictures"];
        this.template = require("./RecentlyPostedPicturesTemplate.ejs") as Function;
        this.recentlyPostedPictures.fetch({
            success: () => {
                this.render();
            }
        });
    }

    events() {
        return <Backbone.EventsHash> {
            "click .moreTextProfile": "showMore",
        };
    }

    showMore() {
        debugger;
        this.numberToShow = this.recentlyPostedPictures.length >= this.numberToShow + 6 ? this.numberToShow + 6 : this.recentlyPostedPictures.length;
        this.render();
    }

    render() {
        let html = this.template({
            pictures: this.recentlyPostedPictures.models,
            numberToShow: this.numberToShow
        });
        this.$el.html(html);
        return this;
    }
}