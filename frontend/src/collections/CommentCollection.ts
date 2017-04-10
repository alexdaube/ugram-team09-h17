import * as Backbone from "backbone";
import * as _ from "underscore";

import {LikeModel} from "../models/LikeModel";
import {CommentModel} from "../models/CommentModel";

export class CommentCollection extends Backbone.Collection<CommentModel> {
    constructor(options?: any) {
        super(options);
        this.model = CommentModel;
        this.url = options["url"];
    }

    public parse(response) {
        return response;
    }
}
