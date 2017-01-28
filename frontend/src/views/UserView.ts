import * as Backbone from 'backbone';
import * as _ from 'underscore';
import {UserModel} from '../models/UserModel';

export class UserView extends Backbone.View<UserModel> {
    template: Function;

    constructor(options?: Backbone.ViewOptions<UserModel>) {
        super(_.extend({
            tagname: 'div'
        }, options));
        this.template = require('./UserTemplate.ejs') as Function;
    }

    render() {
        this.$el.html(this.template(this.model.toJSON()));
        return this;
    }
}