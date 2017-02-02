import * as Backbone from "backbone";
import * as _ from "underscore";

import {PictureModel} from "../models/PictureModel";
import {UserModel} from "../models/UserModel";

export class PictureView extends Backbone.View<PictureModel> {
    private template: Function;

    constructor(options?: Backbone.ViewOptions<PictureModel>) {
        super(_.extend({}, options));
        this.template = require("./PictureTemplate.ejs") as Function;
    }

    public render() {
        this.model.fetch({
            success: () => {
                this.$el.html(this.template({picture: this.model, user: UserModel}));
            },
            error: () => {
                this.$el.html("There was an error");
            },
        });
        return this;
    }

    public append() {
        this.$el.append(this.template({picture: this.model, user: UserModel}));
        return this;
    }
}
