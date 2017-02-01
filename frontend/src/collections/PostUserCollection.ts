import * as Backbone from "backbone";

import {PictureModel} from "../models/PictureModel";

export class PostUserCollection extends Backbone.Collection<PictureModel> {
    constructor(options?: any) {
        super(options);
        this.model = PictureModel;
        //TODO GET /users/{userId}/pictures
        this.url = "http://api.ugram.net/pictures";
    }

    public parse(response) {
        return response.items;
    }
};
