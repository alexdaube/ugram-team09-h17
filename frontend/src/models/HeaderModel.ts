import * as Backbone from "backbone";

export class HeaderModel extends Backbone.Model {

    constructor(options?: any) {
        super(options);
    }

    public defaults() {
        return {};
    }
}