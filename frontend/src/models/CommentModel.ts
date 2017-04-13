import * as Backbone from "backbone";

import {InputFormatter} from "../util/InputFormatter";
import {API_BASE_URL} from "../constants";

export class CommentModel extends Backbone.Model {

    constructor(options?: any) {
        super(options);
        this.urlRoot = `${API_BASE_URL}pictures/${this.pictureId}/comments`;
    }

    public defaults() {
        return {
            user: "",
            comment: "",
        };
    }

    get user(): string {
        return this.get("user");
    }

    set user(user: string) {
        this.set("user", user);
    }

    get comment(): string {
        return this.get("comment");
    }

    set comment(comment: string) {
        this.set("comment", comment);
    }

    get pictureId(): string {
        return this.get("pictureId");
    }

    set pictureId(pictureId: string) {
        this.set("pictureId", pictureId);
    }
}
