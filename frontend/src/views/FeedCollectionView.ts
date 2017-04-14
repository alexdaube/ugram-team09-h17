import * as Backbone from "backbone";
import * as _ from "underscore";

import {HeaderRequestGenerator} from "../util/HeaderRequestGenerator";
import {ShowMoreView} from "./ShowMoreView";
import {PostView} from "./PostView";
import {API_BASE_URL} from "../constants";
import {CommentModel} from "../models/CommentModel";
import {LikeModel} from "../models/LikeModel";

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

    public events() {
        return <Backbone.EventsHash> {
            // "click .eggPlantIcon": "addLike",
            // "click .eggPlantIcon2": "deleteLike",
            "submit .addCommentFeed" : "addComment",
        };
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
        });
    }

    private renderPictures() {
        this.collection.each((picture) => {
            const postView = new PostView({el: "#posts-list", model: picture});
            postView.append();
        });
        this.checkForMorePicturesAvailable();
    }

    private checkForMorePicturesAvailable() {
        if (this.collection.length < this.picturesPerPage) {
            $("#show-more-container").hide();
        }
    }

    private addLike(e) {
        const postId = $(e.currentTarget).attr("data-id");
        const like = new LikeModel({pictureId: postId, user: HeaderRequestGenerator.currentUser()});
        like.save({}, {beforeSend: HeaderRequestGenerator.sendAuthorization});
        this.updateLikesCountTemp(true, postId, e);
    }

    private deleteLike(e) {
        const postId = $(e.currentTarget).attr("data-id");
        const like = new LikeModel({pictureId: postId, user: HeaderRequestGenerator.currentUser()});
        const that = this;

        like.destroy({
            beforeSend: HeaderRequestGenerator.setContentTypeToJSON,
            success() {
                that.updateLikesCountTemp(false, postId, e);
            },
            error() {
                // TODO handle error
            },
        });
    }

    private addComment(e) {
        const postId = $(e.currentTarget).attr("data-id");
        const message = $(e.currentTarget).find("input.inputCommentFeed").val();
        if (message.length <= 0) {
            alert("Comment too short");
            return;
        }
        const comment = new CommentModel({comment: message, pictureId: postId, user: HeaderRequestGenerator.currentUser()});
        comment.save({}, {beforeSend: HeaderRequestGenerator.sendAuthorization});
    }

    private updateLikesCountTemp(add, postId, e) {
        const numberLikeString = $("#countLikeText" + postId + " " + "#countLikeTextSpan" + postId).text().split(" ")[0];
        let numberLike = parseInt(numberLikeString, 10);
        if (add) {
            $(e.currentTarget).removeClass("eggPlantIcon");
            $(e.currentTarget).addClass("eggPlantIcon2");
            numberLike++;
        } else {
            $(e.currentTarget).removeClass("eggPlantIcon2");
            $(e.currentTarget).addClass("eggPlantIcon");
            numberLike--;
        }
        if (numberLike > 1) {
            $("#countLikeText" + postId + " " + "#countLikeTextSpan" + postId).text(numberLike + " " + "likes");
        } else {
            $("#countLikeText" + postId + " " + "#countLikeTextSpan" + postId).text(numberLike + " " + "like");
        }
    }
}
