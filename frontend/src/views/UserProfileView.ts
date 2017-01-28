import * as Backbone from 'backbone';
import * as _ from 'underscore';

import {UserModel} from '../models/UserModel';

export class UserProfileView extends Backbone.View<UserModel> {
    template: Function;
    userProfileModel: UserModel;

    constructor(options?: Backbone.ViewOptions<UserModel>) {
        super(_.extend({
            el: '#content'
        }, options));
        this.template = require('./UserProfileTemplate.ejs') as Function;
        this.userProfileModel = options["model"];
    }
    render() {
        var that = this;
        this.userProfileModel.fetch({
            success: function(){
                that.$el.html(that.template({userModel: that.userProfileModel}));
            },
            error: function(){
                console.log("Error while fetching user");
            }
        });
        return this;
    }
}
