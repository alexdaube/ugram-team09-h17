import * as Backbone from "backbone";
import * as _ from "underscore";

import {HeaderRequestGenerator} from "../util/HeaderRequestGenerator";
import {LikeCollection} from "../collections/LikeCollection";
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

    public events() {
        return <Backbone.EventsHash> {
            "click .eggPlantIcon": "addLike",
            "click .eggPlantIcon2": "deleteLike",
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
            const likeCollection = new LikeCollection({url: `${API_BASE_URL}pictures/${picture.attributes.id}/likes`});
            const postView = new PostView({el: "#posts-list", model: picture, collection: likeCollection});
            postView.append();
        });
        this.checkForMorePicturesAvailable();
    }

    private checkForMorePicturesAvailable() {
        if (this.collection.length < this.picturesPerPage) {
            $("#show-more-container").hide();
        }
    }

    private addComment(e) {
        const commentBox = $(e.currentTarget).find("input.inputCommentFeed");
        const postId = commentBox.attr("data-id");
        const message = commentBox.val();
        if (message.length <= 0) {
            alert("Comment too short");
            return;
        }
        const comment = new CommentModel({ comment: message, pictureId: postId, user: HeaderRequestGenerator.currentUser()});
        comment.save({},{beforeSend: HeaderRequestGenerator.sendAuthorization});
    }

    private addLike(e) {
        const id = $(e.currentTarget).attr("data-id");
        const that = this;
        $.ajax({
            url: `${API_BASE_URL}pictures/${id}/likes/${HeaderRequestGenerator.currentUser()}`,
            type: "POST",
            beforeSend: HeaderRequestGenerator.sendAuthorization,
            success() {
                that.updateLikesCountTemp(true, id, e);
            },
            error() {
                // TODO handle error not alert
                alert("not success");
            },
        });
    }

    private deleteLike(e) {
        const id = $(e.currentTarget).attr("data-id");
        const that = this;
        $.ajax({
            url: `${API_BASE_URL}pictures/${id}/likes/${HeaderRequestGenerator.currentUser()}`,
            type: "DELETE",
            beforeSend: HeaderRequestGenerator.sendAuthorization,
            success() {
                that.updateLikesCountTemp(false, id, e);
            },
            error() {
                // TODO handle error not alert
                alert("not success");
            },
        });
    }

    private updateLikesCountTemp(add, id, e) {
        const numberLikeString = $("#countLikeText" + id + " " + "#countLikeTextSpan" + id).text().split(" ")[0];
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
            $("#countLikeText" + id + " " + "#countLikeTextSpan" + id).text(numberLike + " " + "likes");
        } else {
            $("#countLikeText" + id + " " + "#countLikeTextSpan" + id).text(numberLike + " " + "like");
        }
    }
}
