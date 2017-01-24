import {EditProfileModel} from '../models/EditProfileModel';

export class EditProfileView extends Backbone.View<EditProfileModel> {
    template: Function;

    constructor(options?: Backbone.ViewOptions<EditProfileModel>) {
        super(_.extend({
            el: '#app'
        }, options));
        this.template = require('./EditProfileTemplate.ejs') as Function;
    }

    render() {
        this.$el.html(this.template(this.model.toJSON()));
        return this;
    }
}