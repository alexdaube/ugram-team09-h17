import * as Backbone from "backbone";

/*  tslint:disable:no-empty-interface */
export interface ISettingModelAttributes {
}

export class SettingModel extends Backbone.Model {

    constructor(attributes: ISettingModelAttributes, options?: any) {
        super(attributes, options);
    }

    public defaults() {
        return {
        };
    }
}
