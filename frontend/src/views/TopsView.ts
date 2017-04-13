import * as Backbone from "backbone";
// import * as $ from "jquery";
import * as _ from "underscore";

export class TopsView extends Backbone.View<any> {
    private template: Function;

    constructor(options?: Backbone.ViewOptions<any>) {
        super(_.extend({el: "#content"}, options));
        this.template = require("./TopsTemplate.ejs") as Function;
    }

    // public events() {
    //     return <Backbone.EventsHash> {
    //         "click #loginButton": () => { this.login(); },
    //         "click #registerButton": () => { this.signup(); },
    //     };
    // }

    public render() {
        this.$el.html(this.template({}));
        return this;
    }
}
