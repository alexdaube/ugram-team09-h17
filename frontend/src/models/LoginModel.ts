import * as Backbone from "backbone";

export class LoginModel extends Backbone.Model {

    constructor(options?: any) {
        super(options);
        //this.urlRoot = "http://api.ugram.net/users";
    };

    public defaults() {
        return {};
    }
}
