import * as Backbone from "backbone";
import * as _ from "underscore";

import {UserCollectionForView} from "../collections/UserCollectionForView";
import {UserView} from "./UserView";

export class UserCollectionView extends Backbone.View<UserCollectionForView> {

    private template: Function;

    constructor(options?: Backbone.ViewOptions<UserCollectionForView>) {
        super(_.extend({el: "#content"}, options));
        this.template = require("./UserCollectionTemplate.ejs") as Function;
    }

    public render() {
        this.$el.html(this.template());
        const userCollection = this.model.getCollection();
        userCollection.fetch({
            success(response) {
                $("#usersList").html("");
                response.models.forEach((userModel) =>{
                    const userView = new UserView({model: userModel});
                    $("#usersList").append(userView.$el);
                    userView.render();
                });
            },
        });

        return this;
    }
}
