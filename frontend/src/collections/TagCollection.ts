import * as Backbone from "backbone";
import {TagModel} from "../models/TagModel";

export class TagCollection extends Backbone.Collection<TagModel> {
    constructor(options?: any) {
        super(options);
        this.model = TagModel;
        this.url = options["url"];
    }

    public parse(response) {
        return response;
    }
}
