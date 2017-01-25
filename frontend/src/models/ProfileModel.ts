import * as Backbone from 'backbone';
import * as _ from 'underscore';
import * as $ from 'jquery';

export interface ProfileModelAttributes {
}

export class ProfileModel extends Backbone.Model {

    constructor(attributes: ProfileModelAttributes, options?: any) {
        super(attributes, options);
    }

    defaults() {
        return {
        }
    }
}
