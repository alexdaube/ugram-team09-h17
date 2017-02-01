import * as Backbone from "backbone";
import * as _ from "underscore";

import {FeedCollectionForView} from "../collections/FeedCollectionForView";
import {PostView} from "./PostView";

export class FeedCollectionView extends Backbone.View<FeedCollectionForView> {

    private template: Function;

    constructor(options?: Backbone.ViewOptions<FeedCollectionForView>) {
        super(_.extend({el: "#content"}, options));
        this.template = require("./UserCollectionTemplate.ejs") as Function;
    }

    public render() {
        this.$el.html(this.template());
        const userCollection = this.model.getCollection();
        userCollection.fetch({
            success(response) {
                $("#postsList").html("");
                response.models.forEach((pictureModel) => {
                    const postView = new PostView({model: pictureModel});
                    $("#postsList").append(postView.$el);
                    postView.render();
                });
            },
        });

        return this;
    }
}
