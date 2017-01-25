import * as Backbone from 'backbone';

export interface SettingModelAttributes {
}

export class SettingModel extends Backbone.Model {

    constructor(attributes: SettingModelAttributes, options?: any) {
        super(attributes, options);
    }

    defaults() {
        return {
        }
    }
}
