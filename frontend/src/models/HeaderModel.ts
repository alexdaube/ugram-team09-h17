import * as Backbone from 'backbone';
import * as _ from 'underscore';
import * as $ from 'jquery';

export interface HeaderModelAttributes {
}

export class HeaderModel extends Backbone.Model {

    constructor(attributes: HeaderModelAttributes, options?: any) {
        super(attributes, options);
    }

    defaults() {
        return {
        }
    }
}
