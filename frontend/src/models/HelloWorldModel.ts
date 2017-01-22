export interface HelloWorldAttributes {
    firstname: string;
    lastname: string;
}

export class HelloWorldModel extends Backbone.Model {

    constructor(attributes: HelloWorldAttributes, options?: any) {
        super(attributes, options);
    }

    defaults() {
        return {
            firstname: '',
            lastname: ''
        }
    }
}
