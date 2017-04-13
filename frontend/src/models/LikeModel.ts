import * as Backbone from "backbone";

import {InputFormatter} from "../util/InputFormatter";
import {API_BASE_URL} from "../constants";

export class LikeModel extends Backbone.Model {

    constructor(options?: any) {
        console.log("yolo");
        super(options);
        this.urlRoot = `${API_BASE_URL}pictures/${this.pictureId}/likes`;
    }

    public defaults() {
        return {
            user: "",
            like: "",
        };
    }

    get user(): string {
        return this.get("user");
    }

    set user(user: string) {
        this.set("user", user);
    }

    get like(): string {
        return this.get("like");
    }

    set like(like: string) {
        this.set("like", like);
    }

    get pictureId(): string {
        return this.get("pictureId");
    }

    set pictureId(pictureId: string) {
        this.set("pictureId", pictureId);
    }
}
