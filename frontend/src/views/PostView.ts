import * as Backbone from "backbone";
import * as _ from "underscore";

import {PictureModel} from "../models/PictureModel";

export class PostView extends Backbone.View<PictureModel> {
    private template: Function;

    constructor(options?: Backbone.ViewOptions<PictureModel>) {
        super(_.extend({}, options));
        this.template = require("./PostTemplate.ejs") as Function;
    }

    public events() {
        return <Backbone.EventsHash> {
            "click #optionButtonEdit": () => { $("#popupEditContent").show(); },
            "click #closeExitButtonPopup": () => { $("#popupEditContent").hide(); },
            // "click #optionButton": () => { $("#popupCloseContent").show(); },
            // "click #closeExitButtonPopup": () => { $("#popupCloseContent").hide(); },
            // "click #closeCancelButtonPopup": () => { $("#popupCloseContent").hide(); },
            // "click #postPictureButton": () => { this.postPicture(); },
        };
    }

    public render() {
        this.model.fetch({
            success: () => {
                this.$el.html(this.template({post: this.model, isSingleFeed: true}));
                this.$el.first().addClass("contentFeed");
            },
            error: () => {
                this.$el.html("There was an error");
            },
        });
        return this;
    }

    public append() {
        this.$el.append(this.template({post: this.model, isSingleFeed: false}));
        return this;
    }
}
