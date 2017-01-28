import * as Backbone from "backbone";
import * as $ from "jquery";
import * as _ from "underscore";

import {ProfileModel} from "../models/ProfileModel";
import {HeaderRequestGenerator} from "../util/HeaderRequestGenerator";

export class ProfileView extends Backbone.View<ProfileModel> {
    private template: Function;
    private profileModel: ProfileModel;

    constructor(options?: Backbone.ViewOptions<ProfileModel>) {
        super(_.extend({
            el: "#content",
        }, options));
        this.template = require("./ProfileTemplate.ejs") as Function;

        const modelOption = "model";
        this.profileModel = options[modelOption];
    }

    public render() {
        const that = this;
        this.profileModel.fetch({
            success() {
                console.log("fetch successfull");
                that.$el.html(that.template({userProfile: that.profileModel}));
            },
            error() {
                console.log("Shit happened");
            },
        });
        return this;
    }

    public events() {
        return {
            "click #edit-user-profil": "editUserInfos",
            "click #save-user-profil": "saveUserInfos",
        } as Backbone.EventsHash;
    }
    public editUserInfos(ev) {
        ev.preventDefault();
    }
    public saveUserInfos(ev) {
        ev.preventDefault();
        console.log("save was clicked");

        const obj = {
            email :  "jlabonte@mail.com",
            firstName : "Jérôme",
            lastName : "Labonté",
            phoneNumber : 4188333914,
        };

        this.profileModel.save(obj, {
            beforeSend: HeaderRequestGenerator.setContentTypeToJSON,
            success() {
                console.log("Save successfull");
            },
            error(er) {
                console.log("Shit happened while saving: " + er.message);
            },
        });
    }
}
