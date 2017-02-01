import * as Backbone from "backbone";

import {FeedCollection} from "../collections/FeedCollection";

export class FeedCollectionForView extends Backbone.Model {
    constructor(collection: FeedCollection, options?: any) {
        options = options || {};
        options.innerCollection = collection;
        super(options);
    }

    public getCollection(): FeedCollection {
        return this.get("innerCollection");
    }
};
