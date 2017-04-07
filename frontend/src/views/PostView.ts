import * as Backbone from "backbone";
import * as _ from "underscore";

import {PictureModel} from "../models/PictureModel";
import {HeaderRequestGenerator} from "../util/HeaderRequestGenerator";
import {InputValidator} from "../util/InputValidator";

export class PostView extends Backbone.View<any> {
    private template: Function;

    constructor(options?: Backbone.ViewOptions<any>) {
        super(_.extend({}, options));
        this.template = require("./PostTemplate.ejs") as Function;
    }

    public events() {
        return <Backbone.EventsHash> {
            "click #optionButtonEdit": () => { $("#popupEditContent").show(); },
            "click #closeExitButtonPopup": () => { $("#popupEditContent").hide(); },
            "click #deleteButtonPopup": "delete",
            "click #editButtonPopup": "edit",
            "click #saveButtonPopup": "saveModif",
        };
    }

    public render() {
        this.model.fetch({
            beforeSend: HeaderRequestGenerator.sendAuthorization,
            success: () => {
                this.$el.html(this.template({ post: this.model, isSingleFeed: true }));
                this.$el.first().addClass("contentFeed");
                this.showLikes();
            },
            error: () => {
                this.$el.html("There was an error");
            },
        });

        return this;
    }

    private showLikes() {
        // this.collection.fetch({
        //     beforeSend: HeaderRequestGenerator.sendAuthorization,
        //     data: {
        //         page: this.nextPageToFetch,
        //         perPage: this.picturesPerPage,
        //     },
        //     success: () => {
        //         this.nextPageToFetch += 1;
        //         this.renderLikes();
        //     },
        //     error: () => {
        //         $("#profile-pictures-list").append("<h3>You have no pictures yet!</h3>");
        //         $("#show-more-container").hide();
        //     },
        // });
    }

    private renderLikes() {
        // TODO :
        // this.collection.size = nb like dans le html
        // for each element, find if user is inside, if not plantegg1 or 2

        
        // this.collection.each((picture) => {
        //     const pictureView = new PictureView({ el: "#profile-pictures-list", model: picture });
        //     pictureView.append();
        // });

        // $(".pictureProfile").each((index, picture) => {
        //     const imageHeight = $(picture).height();
        //     const imageWidth = $(picture).width();

        //     if (imageHeight < imageWidth) {
        //         $(picture).height("100%");
        //         $(picture).css("max-width", "100%");
        //         $(picture).css("max-height", "10%");
        //     } else if (imageHeight > imageWidth) {
        //         $(picture).width("100%");
        //         $(picture).css("max-width", "10%");
        //         $(picture).css("max-height", "100%");
        //     }
        // });
    }

    public append() {
        this.$el.append(this.template({ post: this.model, isSingleFeed: false }));
        return this;
    }

    private edit() {
        $("#buttonSave").show();
        $("#editInput").show();

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
