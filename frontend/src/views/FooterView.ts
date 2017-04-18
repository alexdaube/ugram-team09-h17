import * as Backbone from "backbone";
import * as _ from "underscore";

import {HeaderRequestGenerator} from "../util/HeaderRequestGenerator";
import {NotificationModel} from "../models/NotificationModel";
import {NotificationView} from "./NotificationView";

export class FooterView extends Backbone.View<NotificationModel> {
    private template: Function;
    private textList: NotificationView[];

    constructor(options?: Backbone.ViewOptions<NotificationModel>) {
        super(_.extend({el: "#footer"}, options));
        this.textList = new Array<NotificationView>();
        this.template = require("./FooterTemplate.ejs") as Function;
    }

    public render() {
        this.$el.html(this.template(this.model.toJSON()));
        this.showNotification();
        return this;
    }

    private showNotification() {
        console.log("mathieu vez1");
        this.collection.fetch({
            beforeSend: HeaderRequestGenerator.sendAuthorization,
            data: {},
            success: () => {
                this.renderNotification();
            },
        });
    }

    private renderNotification() {
        console.log("mathieu vez2");
        console.log(this.collection);
        this.collection.each((notification) => {
            const notificationView = new NotificationView({el: "#notification2", model: notification});
            this.textList.push(notificationView);
        });
        console.log(this.textList);
    }
}
