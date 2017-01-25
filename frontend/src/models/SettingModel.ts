import * as Backbone from 'backbone';
import * as _ from 'underscore';
import * as $ from 'jquery';

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
