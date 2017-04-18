import * as Backbone from "backbone";
import * as _ from "underscore";

import {HeaderRequestGenerator} from "../util/HeaderRequestGenerator";
import {NotificationModel} from "../models/NotificationModel";
import {NotificationView} from "./NotificationView";
import {NotificationCollection} from "../collections/NotificationCollection";
import {API_BASE_URL} from "../constants";

export class NotificationCollectionView extends Backbone.View<any> {
    private template: Function;
    private textList: NotificationView[];
    private user = HeaderRequestGenerator.currentUser();
    private notificationCollection = new NotificationCollection({url: `${API_BASE_URL}users/${this.user}/notifications`});

    constructor(options?: any) {
        super(_.extend({}, options));
        this.textList = new Array<NotificationView>();
        this.template = require("./NotificationCollectionTemplate.ejs") as Function;
    }

    public render() {
        const html = this.template();
        this.$el.html(html);
        this.showNotification();

        $(".notificationZone").hide();

        $(".notificationZone").mousedown( (event) => {
            event.stopPropagation();
            window.setTimeout( () => { $(".notificationZone").hide(); }, 250);
        });

        return this;
    }

    private showNotification() {
        this.notificationCollection.fetch({
            beforeSend: HeaderRequestGenerator.sendAuthorization,
            data: {},
            success: () => {
                this.renderNotification();
            },
        });
    }

    private renderNotification() {
        this.notificationCollection.each((notification) => {
            const notificationView = new NotificationView({el: "#notification2", model: notification});
            this.textList.push(notificationView);
            notificationView.append();
        });
    }
}
