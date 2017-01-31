import * as Backbone from "backbone";
import * as _ from "underscore";
import * as $ from "jquery";

import {UserModel} from "../models/UserModel";
import {UserCollection} from "../collections/UserCollection";

export class UserView extends Backbone.View<UserModel> {
    private template: Function;
    private userCollection: UserCollection;

    constructor(options?: Backbone.ViewOptions<UserModel>) {
        super(_.extend({}, options));
        this.initialize();
        this.template = require("./UserTemplate.ejs") as Function;
    }

    public initialize() {
        this.userCollection = new UserCollection;
        this.userCollection.fetch({
            success: function(response) {
                $('#content').html("");
                $('#content').append("<div class='contentUser contentUser2'><ul class='boxUser'><li class='titleUser'><h2 class='textUser'>Meet new people</h2></li></ul></div>");
                response.models.forEach(function (profileModel){
                    let userView = new UserView({model: profileModel});
                    $('#content').append(userView.$el);
                    userView.render();
                })
                $('#content').append("<div class='addMoreProfile'><a class='moreTextProfile' href=''>Show more</a></div>");
            }
        });
    }

    public render() {
        this.$el.html(this.template(this.model.toJSON()));
        return this;
    }
}