import * as Backbone from "backbone";
import * as _ from "underscore";
import {HeaderRequestGenerator} from "../util/HeaderRequestGenerator";
import {NotificationModel} from "../models/NotificationModel";

export class NotificationView extends Backbone.View<NotificationModel> {
    private template: Function;

    constructor(options?: Backbone.ViewOptions<NotificationModel>) {
        super(_.extend({}, options));
        this.template = require("./NotificationTemplate.ejs") as Function;
    }

    public render() {
        this.model.fetch({
            beforeSend: HeaderRequestGenerator.sendAuthorization,
            success: () => {
                this.$el.html(this.template({notification: this.model}));
            },
            error: () => {
                this.$el.html("There was an error");
            },
        });
        return this;
    }

    public append() {
        this.$el.append(this.template({notification: this.model}));
        return this;
    }
}
