import * as Backbone from "backbone";
import {PictureModel} from "../models/PictureModel";

export class RecentlyPostedPictureCollection extends Backbone.Collection<PictureModel> {
    constructor(options?: any) {
        super(options);
        this.model = PictureModel;
        this.url = "http://api.ugram.net/pictures";
    }

    public parse(response) {
        return response.items;
    }
};
