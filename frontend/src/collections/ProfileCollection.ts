/**
 * Created by jeromelabonte on 2017-01-21.
 */
import {ProfileModel} from '../models/ProfileModel';
import * as Backbone from "backbone"

export class ProfileCollection extends Backbone.Collection<ProfileModel>{
    constructor(options?: any) {
        super(options);
        this.model = ProfileModel;
        this.url = "http://api.ugram.net/users";
    }

    parse(response) {
        return response.items;
    }
};