import * as Backbone from "backbone";

import {PostUserCollection} from "../collections/PostUserCollection";

export class PostUserCollectionForView extends Backbone.Model {
    constructor(collection: PostUserCollection, options?: any) {
        options = options || {};
        options.innerCollection = collection;
        super(options);
    }

    public getCollection(): PostUserCollection {
        return this.get("innerCollection");
    }
};
