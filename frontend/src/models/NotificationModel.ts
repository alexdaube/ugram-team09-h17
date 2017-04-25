import * as Backbone from "backbone";

import {InputFormatter} from "../util/InputFormatter";
import {API_BASE_URL} from "../constants";

export class NotificationModel extends Backbone.Model {

    constructor(options?: any) {
        super(options);
        this.urlRoot = `${API_BASE_URL}users/${this.user}/notifications`;
    }

    public defaults() {
        return {
            user: "",
        };
    }

    get user(): string {
        return this.get("user");
    }

    set user(user: string) {
        this.set("user", user);
    }
}
