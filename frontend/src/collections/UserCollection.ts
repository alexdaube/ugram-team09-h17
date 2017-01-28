/**
 * Created by jeromelabonte on 2017-01-21.
 */
<<<<<<< HEAD:frontend/src/collections/UserCollection.ts
import {UserModel} from '../models/UserModel';
import * as Backbone from "backbone"

export class UserCollection extends Backbone.Collection<UserModel>{
=======
import * as Backbone from "backbone";
import {ProfileModel} from "../models/ProfileModel";

export class ProfileCollection extends Backbone.Collection<ProfileModel> {
>>>>>>> develop:frontend/src/collections/ProfileCollection.ts
    constructor(options?: any) {
        super(options);
        this.model = UserModel;
        this.url = "http://api.ugram.net/users";
    }

    public parse(response) {
        return response.items;
    }
};
