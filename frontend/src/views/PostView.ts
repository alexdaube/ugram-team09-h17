import * as Backbone from "backbone";
import * as _ from "underscore";

import {PictureModel} from "../models/PictureModel";
import {HeaderRequestGenerator} from "../util/HeaderRequestGenerator";
import {InputValidator} from "../util/InputValidator";
import {CommentModel} from "../models/CommentModel";
import {LikeModel} from "../models/LikeModel";

export class PostView extends Backbone.View<any> {
    private template: Function;

    constructor(options?: Backbone.ViewOptions<any>) {
        super(_.extend({}, options));
        this.template = require("./PostTemplate.ejs") as Function;
    }

    public render() {
        this.model.fetch({
            beforeSend: HeaderRequestGenerator.sendAuthorization,
            success: () => {
                this.$el.html(this.template({ post: this.model, isSingleFeed: true }));
                this.$el.first().addClass("contentFeed");
            },
            error: () => {
                this.$el.html("There was an error");
            },
        });
        return this;
    }

    public events() {

        return <Backbone.EventsHash> {
            "click #optionButtonEdit": () => { $("#popupEditContent").show(); },
            "click #closeExitButtonPopup": () => { $("#popupEditContent").hide(); },
            "click #deleteButtonPopup": "delete",
            "click #editButtonPopup": "edit",
            "click #saveButtonPopup": "saveModif",
            "click .eggPlantIcon": "addLike",
            // "click .eggPlantIcon2": "deleteLike",
            "submit .addCommentFeed" : "addComment",
        };
    }

    public append() {
        this.$el.append(this.template({post: this.model, isSingleFeed: false}));
        return this;
    }

    private addLike(e) {
        console.log("testttt");
        const likeText = $(e.currentTarget).find("span.eggPlantIcon.likeTextFeed2");
        console.log(likeText);
        const postId = likeText.attr("data-id");
        console.log(postId);
        const like = new LikeModel({pictureId: postId, user: HeaderRequestGenerator.currentUser()});
        like.save({}, {beforeSend: HeaderRequestGenerator.sendAuthorization});
    }

    private addComment(e) {
        const commentBox = $(e.currentTarget).find("input.inputCommentFeed");
        const postId = commentBox.attr("data-id");
        const message = commentBox.val();
        if (message.length <= 0) {
            alert("Comment too short");
            return;
        }
        const comment = new CommentModel({comment: message, pictureId: postId, user: HeaderRequestGenerator.currentUser()});
        comment.save({}, {beforeSend: HeaderRequestGenerator.sendAuthorization});
    }

    // private renderLikes() {
    //     // console.log(this.collection);

    //     if (this.collection.length > 1) {
    //         $("#countLikeText" + this.model.id + " " + "#countLikeTextSpan" + this.model.id).text(this.collection.length.toString() + " likes");
    //     } else {
    //         $("#countLikeText" + this.model.id + " " + "#countLikeTextSpan" + this.model.id).text(this.collection.length.toString() + " like");
    //     }
    //     this.addEggplantIconClass(this.collection);
    // }

    private edit() {
        $("#buttonSave").show();
        $("#editInput").show();
    }

    // private addEggplantIconClass(myCollection) {
    //     $("#eggplanticonspan" + this.model.id).addClass("eggPlantIcon");
    //     myCollection.each( (like) => {
    //         if (like.attributes.userId === HeaderRequestGenerator.currentUser()) {
    //             $("#eggplanticonspan" + this.model.id).removeClass("eggPlantIcon");
    //             $("#eggplanticonspan" + this.model.id).addClass("eggPlantIcon2");
    //         }
    //     });
    // }

    private delete() {
        $("#popupEditContent").hide();
        const view = this;
        this.model.destroy({
            beforeSend: HeaderRequestGenerator.setContentTypeToJSON,
            success() {
                window.location.href = "#profile";
            },
            error() {
                // TODO Handle error
            },
        });
    }

    private saveModif() {
        const description: string = $("#description").val();
        const mentions: string[] = description.match(/@\w+/g);
        const tags: string[] = description.match(/#\w+/g);

        if (InputValidator.containsScriptInjection(description)) {
            $("#textErrorSetting").show();
            $("#textErrorSetting").find("p").text("Script are not authorized");
            return;
        }

        const obj = {
            description,
            mentions,
            tags,
        };

        const that = this;
        this.model.save(obj, {
            beforeSend: HeaderRequestGenerator.setContentTypeToJSON,
            success() {
                that.render();
            },
            error() {
                alert("Un erreur s'est produit lors de la sauvegarde");
            },
        });
        $("#popupEditContent").hide();
        $("#buttonSave").hide();
        $("#editInput").hide();
    }
}
