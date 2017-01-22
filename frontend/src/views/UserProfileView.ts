import {UserProfileModel} from '../models/UserProfileModel';

export class UserProfileView extends Backbone.View<UserProfileModel> {
    template: Function;
    userProfileModel: UserProfileModel;

    constructor(options?: Backbone.ViewOptions<UserProfileModel>) {
        super(_.extend({
            el: '#app'
        }, options));
        this.template = require('./UserProfileTemplate.ejs') as Function;

        //this.userProfileModel = options["model"];
    }

    render() {

        var that = this;
        this.model.fetch({
            success: function(userProfile){
                console.log("fetch successfull");
                //console.log(userProfile.attributes);
                that.$el.html(that.template(that.model.toJSON()));
            },
            error: function(){
                console.log("Shit happened");
            }
        });

        return this;
    }
}