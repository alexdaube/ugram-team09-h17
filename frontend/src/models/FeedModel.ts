import * as Backbone from 'backbone';

export interface FeedModelAttributes {
}

export class FeedModel extends Backbone.Model {

    constructor(attributes: FeedModelAttributes, options?: any) {
        super(attributes, options);
    }

    defaults() {
        return {
        }
    }
}
