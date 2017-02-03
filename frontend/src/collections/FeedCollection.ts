import * as Backbone from "backbone";
import * as _ from "underscore";

import {PictureModel} from "../models/PictureModel";

export class FeedCollection extends Backbone.Collection<PictureModel> {
    constructor(options?: any) {
        super(options);
        this.model = PictureModel;
        this.url = options["url"];
    }

    public parse(response) {
        _.each(response.items, (item) => {
            item["imageUrl"] = item["url"];
            delete item["url"];
        });
        
        return response.items;
    }
}
