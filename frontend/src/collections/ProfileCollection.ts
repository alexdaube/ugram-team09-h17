/**
 * Created by jeromelabonte on 2017-01-21.
 */
import * as Backbone from "backbone";
import {ProfileModel} from "../models/ProfileModel";

export class ProfileCollection extends Backbone.Collection<ProfileModel> {
    constructor(options?: any) {
        super(options);
        this.model = ProfileModel;
        this.url = "http://api.ugram.net/users";
    }

    public parse(response) {
        return response.items;
    }
};
