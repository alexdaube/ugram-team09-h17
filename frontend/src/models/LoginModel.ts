import * as Backbone from "backbone";

export class LoginModel extends Backbone.Model {

    constructor(options?: any) {
        super(options);
    }

    public defaults() {
        return {};
    }
}
