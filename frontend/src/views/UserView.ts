import * as Backbone from "backbone";
import * as _ from "underscore";

import {UserModel} from "../models/UserModel";

export class UserView extends Backbone.View<UserModel> {
    private template: Function;

    constructor(options?: Backbone.ViewOptions<UserModel>) {
        super(_.extend({}, options));
        this.template = require("./UserTemplate.ejs") as Function;
    }

    public render() {
        this.model.fetch({
            success: () => {
                this.$el.html(this.template({user: this.model, isSingleFeed: true}));
            },
            error: () => {
                this.$el.html("There was an error");
            },
        });
        return this;
    }

    public append() {
        this.$el.append(this.template({user: this.model, isSingleFeed: false}));
        return this;
    }
}
