import * as Backbone from "backbone";
import * as _ from "underscore";

import {HeaderModel} from "../models/HeaderModel";
import {SearchTextView} from "./SearchTextView";

export class HeaderView extends Backbone.View<HeaderModel> {
    private template: Function;
    private userList: SearchTextView[];

    constructor(options?: Backbone.ViewOptions<HeaderModel>) {
        super(_.extend({el: "#header"}, options));
        this.userList = new Array<SearchTextView>();
        this.template = require("./HeaderTemplate.ejs") as Function;
    }

    public render() {
        this.$el.html(this.template(this.model.toJSON()));
        $(".searchBox2").hide();

        return this;
    }
}
