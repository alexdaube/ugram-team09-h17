import * as Backbone from "backbone";

/*  tslint:disable:no-empty-interface */
export interface IFooterModelAttributes {
}

export class FooterModel extends Backbone.Model {

    constructor(attributes: IFooterModelAttributes, options?: any) {
        super(attributes, options);
    }

    public defaults() {
        return {
        };
    }
}
