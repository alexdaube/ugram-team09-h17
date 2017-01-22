import {UserProfileModel} from '../models/UserProfileModel';

export class UserProfileView extends Backbone.View<UserProfileModel> {
    template: Function;
    userProfileModel: UserProfileModel;

    constructor(options?: Backbone.ViewOptions<UserProfileModel>) {
        super(_.extend({
            el: '#app'
        }, options));
        this.template = require('./UserProfileTemplate.ejs') as Function;
        console.log(options);
        this.userProfileModel = options["model"];
    }

    render() {

        var that = this;
        this.model.fetch({
            success: function(){
                console.log("fetch successfull");
                that.$el.html(that.template({userProfile: that.userProfileModel}));
            },
            error: function(){
                console.log("Shit happened");
            }
        });

        return this;
    }
}