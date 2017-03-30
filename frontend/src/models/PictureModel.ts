import * as Backbone from "backbone";

import {InputFormatter} from "../util/InputFormatter";
import {HeaderRequestGenerator} from "../util/HeaderRequestGenerator";
import {API_BASE_URL} from "../constants";

export class PictureModel extends Backbone.Model {
    constructor(options?: any) {
        super(options);
        this.urlRoot = `${API_BASE_URL}users/${this.userId}/pictures`;
    }

    public defaults() {
        return {
            description: "",
            mentions: [],
            postedDate: "",
            tags: [],
            url: "",
            user_userName: "",
            editable: false,
        };
    }

    public parse(response, options) {
        // TODO make it non constant
        response["editable"] = HeaderRequestGenerator.isConnectedUser(response["user_userName"]);
        response["imageUrl"] = response["url"];
        delete response["url"];
        return response;
    }

    get description(): string {
        return this.get("description");
    }

    set description(description: string) {
        this.set("description", description);
    }

    get mentions(): string[] {
        return this.get("mentions");
    }

    set mentions(mentions: string[]) {
        this.set("mentions", mentions);
    }

    get postedDate(): string {
        const createdDate = this.get("createdDate");
        return InputFormatter.formatMillisecondDateToMMDDYYYY(new Date(createdDate));
    }

    get tags(): string[] {
        return this.get("tags");
    }

    set tags(tags: string[]) {
        this.set("tags", tags);
    }

    get imageUrl(): string {
        return this.get("imageUrl");
    }

    set imageUrl(imageUrl: string) {
        this.set("imageUrl", imageUrl);
    }

    get userId(): string {
        return this.get("user_userName");
    }

    set userId(user_userName: string) {
        this.set("user_userName", user_userName);
    }

    get editable(): boolean {
        return this.get("editable");
    }

    set editable(editable: boolean) {
        this.set("editable", editable);
    }
}
