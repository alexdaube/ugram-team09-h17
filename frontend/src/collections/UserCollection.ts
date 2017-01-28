/**
 * Created by jeromelabonte on 2017-01-21.
 */
import {UserModel} from '../models/UserModel';
import * as Backbone from "backbone"

export class UserCollection extends Backbone.Collection<UserModel>{
    constructor(options?: any) {
        super(options);
        this.model = UserModel;
        this.url = "http://api.ugram.net/users";
    }

    parse(response) {
        return response.items;
    }
};