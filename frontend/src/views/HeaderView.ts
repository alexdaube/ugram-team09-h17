import * as Backbone from 'backbone';
import * as _ from 'underscore';

import {HeaderModel} from '../models/HeaderModel';

export class HeaderView extends Backbone.View<HeaderModel> {
    template: Function;

    constructor(options?: Backbone.ViewOptions<HeaderModel>) {
        super(_.extend({
            el: '#header'
        }, options));
        debugger;
        this.template = require('./HeaderTemplate.ejs') as Function;
    }

    render() {
        this.$el.html(this.template(this.model.toJSON()));
        return this;
    }
}