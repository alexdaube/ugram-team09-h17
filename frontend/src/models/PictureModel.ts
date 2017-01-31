import * as Backbone from "backbone"

import {StringFormatter} from "../util/StringFormatter";

export class PictureModel extends Backbone.Model {

    constructor(options?: any) {
        super(options);
        this.urlRoot = "http://api.ugram.net/pictures";
    };

    defaults() {
        return {
            id: 0,
            createdDate: "",
            description: "",
            mentions: "",
            tags: "",
            url: "",
            userId: ""
        }
    }

    get id() : number {
        return this.get("id");
    }

    set id(id: number){
        this.set("id", id);
    }

    get createdDate() : string {
        const bufferDate = this.get("createdDate");
        const formattedDate = StringFormatter.formatMillisecondDateToMMDDYYYY(new Date(bufferDate));
        return formattedDate;
    }

    set createdDate(createdDate: string){
        this.set("createdDate", createdDate);
    }

    get description() : string {
        return this.get("description");
    }

    set description(description: string){
        this.set("description", description);
    }

    get mentions() : string {
        return this.get("mentions");
    }

    set mentions(mentions: string){
        this.set("mentions", mentions);
    }

    get tags() : string {
        return this.get("tags");
    }

    set tags(tags: string){
        this.set("tags", tags);
    }

    get url() : string {
        return this.get("url");
    }

    set url(url: string){
        this.set("url", url);
    }

    get userId() : string {
        return this.get("userId");
    }

    set userId(userId: string){
        this.set("userId", userId);
    }
}