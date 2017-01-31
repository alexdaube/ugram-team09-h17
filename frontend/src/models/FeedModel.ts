import * as Backbone from "backbone";

export class FeedModel extends Backbone.Model {

    constructor(options?: any) {
        super(options);
    }

    defaults() {
        return {};
    }
}