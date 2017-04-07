import * as Backbone from "backbone";
import * as _ from "underscore";

import {LikeModel} from "../models/LikeModel";

export class LikeCollection extends Backbone.Collection<LikeModel> {
    constructor(options?: any) {
        super(options);
        this.model = LikeModel;
        // TODO this is valid for this class?
        this.url = options["url"];
    }

    public parse(response) {
        // TODO this is valid for this class?
        _.each(response.items, (item) => {
            item["imageUrl"] = item["url"];
            delete item["url"];
        });
        return response.items;
    }
}
