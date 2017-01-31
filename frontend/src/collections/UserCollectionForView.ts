import * as Backbone from "backbone";

import {UserCollection} from "../collections/UserCollection";

export class UserCollectionForView extends Backbone.Model {
    constructor(collection: UserCollection, options?: any) {
        options = options || {};
        options.innerCollection = collection;
        super(options);
    }

    public getCollection() : UserCollection {
        return this.get('innerCollection');
    }
};