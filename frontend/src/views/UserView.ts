import {UserModel} from '../models/UserModel';

export class UserView extends Backbone.View<UserModel> {
    template: Function;

    constructor(options?: Backbone.ViewOptions<UserModel>) {
        super(_.extend({
            el: '#app'
        }, options));
        this.template = require('./UserTemplate.ejs') as Function;
    }

    render() {
        this.$el.html(this.template(this.model.toJSON()));
        return this;
    }
}