import * as Backbone from 'backbone';
import * as _ from 'underscore';
import * as $ from "jquery";

import {UserModel} from '../models/UserModel';
import {HeaderRequestGenerator} from '../util/HeaderRequestGenerator';

export class UserProfileSettingsView extends Backbone.View<UserModel> {
    template: Function;
    userModel: UserModel;

    constructor(options?: Backbone.ViewOptions<UserModel>) {
        super(_.extend({
            el: '#content'
        }, options));
        this.template = require('./UserProfileSettingsTemplate.ejs') as Function;
        this.userModel = options["model"];
    }

    render() {
        var that = this;
        this.userModel.fetch({
            success: function(){
                that.$el.html(that.template({userModel: that.userModel}));
            },
            error: function(){
                console.log("Error while fetching user");

            }
        });
        return this;
    }


    events(){
        return <Backbone.EventsHash> {
            "click #saveProfile": "saveUserInfos"
        }
    }
    saveUserInfos(ev){
        ev.preventDefault();
        var that = this;

        var obj = {
            "email" :  $("#pepEmail").val(),
            "firstName" : $("#pepFirstName").val(),
            "lastName" : $("#pepLastName").val(),
            "phoneNumber" : $("#pepPhone").val()
        };

        this.userModel.save(obj, {
            beforeSend: HeaderRequestGenerator.setContentTypeToJSON,
            success: function() {
                that.render();
            },
            error: function() {
                console.log("An error occured while saving the user");
            }
        })
    }
}
