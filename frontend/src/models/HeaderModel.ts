import * as Backbone from 'backbone';

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
