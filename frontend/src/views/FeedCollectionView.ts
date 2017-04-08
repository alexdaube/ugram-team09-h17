import * as Backbone from "backbone";
import * as _ from "underscore";

import {HeaderRequestGenerator} from "../util/HeaderRequestGenerator";
import {LikeCollection} from "../collections/LikeCollection";
import {ShowMoreView} from "./ShowMoreView";
import {PostView} from "./PostView";
import {API_BASE_URL} from "../constants";

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
            "click .eggPlantIcon2": "deleteLike"
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

    private addLike(e) {
        const id = $(e.currentTarget).attr("data-id");
        const that = this;
        $.ajax({
                url: `${API_BASE_URL}pictures/${id}/likes/${HeaderRequestGenerator.currentUser()}`,
                type: "POST",
                beforeSend: HeaderRequestGenerator.sendAuthorization,
                success() {
                    that.updateLikesCountTemp(true,id,e);
                },
                error() {
                    alert("not success");
                }
            });
    }


    private deleteLike(e){
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
                    alert("not success");
                }
            });
    }

    private updateLikesCountTemp(add, id, e){
        var numberOfLikes = $("#countLikeText" +id+ " " + "#countLikeTextSpan" +id).text();
        var numberOfLikesParts = numberOfLikes.split(' ');
        var number = +numberOfLikesParts[0];        

        if(add == true) {
            $(e.currentTarget).removeClass('eggPlantIcon');
            $(e.currentTarget).addClass('eggPlantIcon2');
            number = number + 1;
        } else {
            $(e.currentTarget).removeClass('eggPlantIcon2');
            $(e.currentTarget).addClass('eggPlantIcon');
            number = number - 1;
        }                
        
        if (number > 1) {
            $("#countLikeText" + id + " " + "#countLikeTextSpan" + id).text(number+ " likes");
        } else {
            $("#countLikeText" + id + " " + "#countLikeTextSpan" + id).text(number + " like");
        }
    }
}
