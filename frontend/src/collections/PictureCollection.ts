import * as Backbone from "backbone"

import {PictureModel} from "../models/PictureModel";

export class PictureCollection extends Backbone.Collection<PictureModel>{
    constructor(options?: any) {
        super(options);
        this.model = PictureModel;
        this.url = "http://api.ugram.net/pictures";
    }

    parse(response) {
        return response.items;
    }
};