import * as Backbone from "backbone";
import * as _ from "underscore";
import { HeaderRequestGenerator } from "../util/HeaderRequestGenerator";
import {PictureModel} from "../models/PictureModel";

export class NotificationView extends Backbone.View<PictureModel> {
    private template: Function;

    constructor(options?: Backbone.ViewOptions<PictureModel>) {
        super(_.extend({}, options));
        this.template = require("./NotificationTemplate.ejs") as Function;
    }

    public render() {
        this.model.fetch({
            beforeSend: HeaderRequestGenerator.sendAuthorization,
            success: () => {
                this.$el.html(this.template({user: this.model}));
            },
            error: () => {
                this.$el.html("There was an error");
            },
        });
        return this;
    }

    public append() {
        this.$el.append(this.template({user: this.model}));
        return this;
    }
}
