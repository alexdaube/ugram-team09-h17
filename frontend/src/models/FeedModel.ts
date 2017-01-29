import * as Backbone from "backbone";

/*  tslint:disable:no-empty-interface */
export interface IFeedModelAttributes {
}

export class FeedModel extends Backbone.Model {

    constructor(attributes: IFeedModelAttributes, options?: any) {
        super(attributes, options);
    }

    public defaults() {
        return {
        };
    }
}
