import * as Backbone from 'backbone';

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
