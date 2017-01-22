import {UserProfileModel} from '../models/UserProfileModel';

export class UserProfileView extends Backbone.View<UserProfileModel> {
    template: Function;
    userProfileModel: UserProfileModel;

    constructor(options?: Backbone.ViewOptions<UserProfileModel>) {
        super(_.extend({
            el: '#app'
        }, options));
        this.template = require('./UserProfileTemplate.ejs') as Function;

        this.userProfileModel = options["model"];
    }

    render() {

        this.userProfileModel.fetch({
            success: function(userProfile){
                console.log("fetch successfull");
                //console.log(userProfile.attributes);
            },
            error: function(){
                console.log("Shit happened");
            }
        });

        this.$el.html(this.template({model: this.userProfileModel.toJSON()}));
        return this;
    }
}