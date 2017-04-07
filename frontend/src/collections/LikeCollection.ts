import * as Backbone from "backbone";
import * as _ from "underscore";

import {LikeModel} from "../models/LikeModel";

export class LikeCollection extends Backbone.Collection<LikeModel> {
    constructor(options?: any) {
        super(options);
        this.model = LikeModel;
        this.url = options["url"];
    }

    public parse(response) {
        return response.items;
    }
}
