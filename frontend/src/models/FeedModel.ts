import * as Backbone from 'backbone';
import * as _ from 'underscore';
import * as $ from 'jquery';

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
