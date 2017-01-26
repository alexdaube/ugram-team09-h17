import * as Backbone from 'backbone';
import * as _ from 'underscore';
import * as $ from "jquery";

import {ProfileModel} from '../models/ProfileModel';
import {HeaderRequestGenerator} from '../util/HeaderRequestGenerator';

export class ProfileView extends Backbone.View<ProfileModel> {
    template: Function;
    profileModel: ProfileModel;

    constructor(options?: Backbone.ViewOptions<ProfileModel>) {
        super(_.extend({
            el: '#content'
        }, options));
        this.template = require('./ProfileTemplate.ejs') as Function;
        this.profileModel = options["model"];
    }

    render() {
        var that = this;
        this.profileModel.fetch({
            success: function(){
                console.log("fetch successfull");
                that.$el.html(that.template({userProfile: that.profileModel}));
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
    }
    saveUserInfos(ev){
        ev.preventDefault();
        console.log("save was clicked");

        var obj = {
            "email" :  "jlabonte@mail.com",
            "firstName" : "Jérôme",
            "lastName" : "Labonté",
            "phoneNumber" : 4188333914
        };

        this.profileModel.save(obj, {
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
