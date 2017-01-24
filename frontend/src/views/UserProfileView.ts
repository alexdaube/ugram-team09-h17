import {UserProfileModel} from '../models/UserProfileModel';
import {HeaderRequestGenerator} from '../util/HeaderRequestGenerator';

export class UserProfileView extends Backbone.View<UserProfileModel> {
    template: Function;
    userProfileModel: UserProfileModel;

    constructor(options?: Backbone.ViewOptions<UserProfileModel>) {
        super(_.extend({
            el: '#app'
        }, options));
        this.template = require('./UserProfileTemplate.ejs') as Function;
        this.userProfileModel = options["model"];

        // _.bindAll(this, 'render', 'close', 'remove');
        // this.userProfileModel.bind('change', this.render);
        // this.userProfileModel.bind('destroy', this.remove);
    }


    render() {
        var that = this;
        this.userProfileModel.fetch({
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

    events(){
        return <Backbone.EventsHash> {
            "click #edit-user-profil": "editUserInfos",
            "click #save-user-profil": "saveUserInfos"
        }
    }

    editUserInfos(ev) {
        ev.preventDefault();
        console.log("edit was clicked");

        $(".user-info-input").prop("readonly", !$(".user-info-input").prop("readonly"));
    }
    saveUserInfos(ev){
        ev.preventDefault();
        console.log("save was clicked");

        var obj = {
           "email" :  $("#user-info-input-email").val(),
           "firstName" : $("#user-info-input-firstName").val(),
           "lastName" : $("#user-info-input-lastName").val(),
            "phoneNumber" : 4188333914
           };

        this.userProfileModel.save(obj, {
            beforeSend: HeaderRequestGenerator.setContentTypeToJSON,
            success: function() {
                console.log("Save successfull");
            },
            error: function(er) {
                console.log("Shit happened while saving: " + er.message);
            }
        })


    }



}


















