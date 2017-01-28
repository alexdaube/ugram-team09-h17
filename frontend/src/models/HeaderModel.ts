import * as Backbone from "backbone";

/*  tslint:disable:no-empty-interface */
export interface IHeaderModelAttributes {
}

export class HeaderModel extends Backbone.Model {

    constructor(attributes: IHeaderModelAttributes, options?: any) {
        super(attributes, options);
    }

    public defaults() {
        return {
        };
    }
}
