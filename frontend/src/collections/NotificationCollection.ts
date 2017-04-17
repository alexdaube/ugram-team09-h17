import * as Backbone from "backbone";
import * as _ from "underscore";

import {NotificationModel} from "../models/NotificationModel";

export class NotificationCollection extends Backbone.Collection<NotificationModel> {
    constructor(options?: any) {
        super(options);
        this.model = NotificationModel;
        this.url = options["url"];
    }

    public parse(response) {
        console.log("response" + response.items);
        return response.items;
    }
}
