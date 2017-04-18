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
                const didUserLiked = this.addEggplantIconClass(this.model.likes);
                this.$el.html(this.template({post: this.model, isSingleFeed: true, userLiked: didUserLiked}));
                this.$el.first().addClass("contentFeed");
            },
            error: () => {
                this.$el.html("There was an error");
            },
        });
        return this;
    }

    public close() {
        this.remove();
        this.unbind();
    }

    public events() {
        return <Backbone.EventsHash> {
            "click #optionButtonEdit": () => { $("#popupEditContent").show(); },
            "click #closeExitButtonPopup": () => { $("#popupEditContent").hide(); },
            "click #deleteButtonPopup": "delete",
            "click #editButtonPopup": "edit",
            "click #saveButtonPopup": "saveModif",
            "click .eggPlantIcon": "addLikePV",
            "click .eggPlantIcon2": "deleteLikePV",
            "submit .addCommentFeed" : "addComment",
        };
    }

    public append() {
        const didUserLiked = this.addEggplantIconClass(this.model.likes);
        this.$el.append(this.template({post: this.model, isSingleFeed: false, userLiked: didUserLiked}));
        return this;
    }

    private addLikePV(e) {
        const postId = $(e.currentTarget).attr("data-id");
        if (this.model.id.toString() === postId) {
            const like = new LikeModel({pictureId: postId, user: HeaderRequestGenerator.currentUser()});
            like.save({}, {beforeSend: HeaderRequestGenerator.sendAuthorization});
            this.updateLikesCountTemp(true, postId, e);
        }
    }

    private deleteLikePV(e) {
        const postId = $(e.currentTarget).attr("data-id");
        const that = this;
        if (this.model.id.toString() === postId) {
            const likeToDestroy = _.findWhere(this.model.likes, {user : HeaderRequestGenerator.currentUser()}) as LikeModel;
            const myNewLike = new LikeModel(likeToDestroy);
            myNewLike.destroy({
                beforeSend: HeaderRequestGenerator.sendAuthorization,
                success() {
                    that.updateLikesCountTemp(false, postId, e);
                },
                error() {
                    // TODO handle error
                },
            });
        }
    }

    private addComment(e) {
        const commentBox = $(e.currentTarget).find("input.inputCommentFeed");
        const postId = commentBox.attr("data-id");
        if (this.model.id.toString() === postId) {
            const message = commentBox.val();
            if (message.length <= 0) {
                alert("Comment too short");
                return;
            }
            const comment = new CommentModel({comment: message, pictureId: postId, user: HeaderRequestGenerator.currentUser()});
            comment.save({}, {
                beforeSend: HeaderRequestGenerator.sendAuthorization,
                success: (model, response) => {
                    commentBox.val("");
                    const commentList =  $(e.currentTarget).parent().find(".commentFeedList");
                    commentList.append("<li class=\"textCommentFeed\">\
                <a class=\"heightTextFeed blackTextFeed\" href=\"\">" + model.user + "</a>\
                    <span>" + _.escape(model.comment) + "</span>\
                    </li>");
                },
                error: () => {
                    alert("error posting message");
                },
            });
        }
    }

    private edit() {
        $("#buttonSave").show();
        $("#editInput").show();
    }

    private addEggplantIconClass(modelLike) {
        const that = this;
        let result = false;

        $.each(modelLike, (index, value) => {
            if (value.user === HeaderRequestGenerator.currentUser()) {
                result = true;
            }
        });
        return result;
     }

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
            $("#countLikeText" + postId + " " + "#countLikeTextSpan" + postId).html("<span class='likeTextFeed blackTextFeed'>" + numberLike + " " + "likes" + "</span>");
        } else {
            $("#countLikeText" + postId + " " + "#countLikeTextSpan" + postId).html("<span class='likeTextFeed blackTextFeed'>" + numberLike + " " + "like" + "</span>");
        }
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
