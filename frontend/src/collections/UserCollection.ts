import * as Backbone from "backbone"

import {ProfileModel} from '../models/ProfileModel';

export class UserCollection extends Backbone.Collection<ProfileModel> {
    
    constructor(options?: any) {
        super(options);
        this.model = ProfileModel;
        this.url = "http://api.ugram.net/users";
    }

    parse(response) {
        return response.items;
    }
};