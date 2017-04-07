import * as Backbone from "backbone";

import {InputFormatter} from "../util/InputFormatter";
import {API_BASE_URL} from "../constants";

export class LikeModel extends Backbone.Model {

    constructor(options?: any) {
        super(options);
        this.urlRoot = `${API_BASE_URL}likes/${this.postId}`;
    }

    public defaults() {
        return {
            userId: "",
            postId: ""
        };
    }

    get userId(): string {
        return this.get("id");
    }

    set userId(userId: string) {
        this.set("id", userId);
    }

    get postId(): string {
        return this.get("postId");
    }

    set postId(postId: string) {
        this.set("postId", postId);
    }
}
