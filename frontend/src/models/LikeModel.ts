import * as Backbone from "backbone";

import {InputFormatter} from "../util/InputFormatter";
import {API_BASE_URL} from "../constants";

export class LikeModel extends Backbone.Model {

    constructor(options?: any) {
        super(options);
        this.urlRoot = `${API_BASE_URL}pictures/${this.pictureId}/likes`;
    }

    public defaults() {
        return {
            user: "",
            pictureId: "",
        };
    }

    get user(): string {
        return this.get("user");
    }

    set user(user: string) {
        this.set("user", user);
    }

    get pictureId(): string {
        return this.get("pictureId");
    }

    set pictureId(pictureId: string) {
        this.set("pictureId", pictureId);
    }
}
