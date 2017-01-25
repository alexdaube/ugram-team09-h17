import * as Backbone from 'backbone';
import * as _ from 'underscore';

import {ProfileModel} from '../models/ProfileModel';

export class ProfileView extends Backbone.View<ProfileModel> {
    template: Function;

    constructor(options?: Backbone.ViewOptions<ProfileModel>) {
        super(_.extend({
            el: '#content'
        }, options));
        this.template = require('./ProfileTemplate.ejs') as Function;
    }

    render() {
        this.$el.html(this.template(this.model.toJSON()));
        return this;
    }
}