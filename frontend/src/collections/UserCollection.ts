/**
 * Created by jeromelabonte on 2017-01-21.
 */
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
};

export class UserCollectionForView extends Backbone.Model {
    constructor(collection: UserCollection, options?: any) {
        options = options || {};
        options.innerCollection = collection;
        super(options);
    }

    getCollection() : UserCollection {
        return this.get('innerCollection');
    }
}