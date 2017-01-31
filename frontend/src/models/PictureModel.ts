import * as Backbone from "backbone";

import {StringFormatter} from "../util/StringFormatter";

export class PictureModel extends Backbone.Model {

    constructor(options?: any) {
        super(options);
    }

    public defaults() {
        return {
            postedDate: "",
            description: "",
            mentions: [],
            tags: [],
            url: "",
            userId: ""
        };
    }

    get postedDate(): string {
        const createdDate = this.get("createdDate");
        return StringFormatter.formatMillisecondDateToMMDDYYYY(new Date(createdDate));
    }

    get description(): string {
        return this.get("description");
    }

    set description(description: string){
        this.set("description", description);
    }

    get mentions(): Array<string> {
        return this.get("mentions");
    }

    set mentions(mentions: Array<string>){
        this.set("description", mentions);
    }

    get tags(): Array<string> {
        return this.get("tags");
    }

    set tags(tags: Array<string>){
        this.set("description", tags);
    }

    get url(): string {
        return this.get("url");
    }

    set url(url: string){
        this.set("url", url);
    }

    get userId(): string {
        return this.get("userId");
    }

    set userId(userId: string){
        this.set("userId", userId);
    }
}
