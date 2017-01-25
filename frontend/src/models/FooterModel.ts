import * as Backbone from 'backbone';
import * as _ from 'underscore';
import * as $ from 'jquery';

export interface FooterModelAttributes {
}

export class FooterModel extends Backbone.Model {

    constructor(attributes: FooterModelAttributes, options?: any) {
        super(attributes, options);
    }

    defaults() {
        return {
        }
    }
}
