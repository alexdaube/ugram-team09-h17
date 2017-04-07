import * as Backbone from "backbone";

import {InputFormatter} from "../util/InputFormatter";
import {API_BASE_URL} from "../constants";

export class LikeModel extends Backbone.Model {

    constructor(options?: any) {
        super(options);
        this.urlRoot = `${API_BASE_URL}picture/${this.pictureId}/likes`;
    }

    public defaults() {
        return {
            userId: "",
            pictureId: "",
        };
    }

    get userId(): string {
        return this.get("id");
    }

    set userId(userId: string) {
        this.set("id", userId);
    }

    get pictureId(): string {
        return this.get("pictureId");
    }

    set pictureId(pictureId: string) {
        this.set("pictureId", pictureId);
    }
}
