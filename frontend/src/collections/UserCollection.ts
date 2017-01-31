import * as Backbone from "backbone";

import {UserModel} from "../models/UserModel";

export class UserCollection extends Backbone.Collection<UserModel> {
    constructor(options?: any) {
        super(options);
        this.model = UserModel;
        this.url = "http://api.ugram.net/users";
    }

    public parse(response) {
        return response.items;
    }
}