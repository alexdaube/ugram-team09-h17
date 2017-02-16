import * as Backbone from "backbone";
import * as _ from "underscore";

import {UserModel} from "../models/UserModel";

export class UserCollection extends Backbone.Collection<UserModel> {
    constructor(options?: any) {
        super(options);
        this.model = UserModel;
        this.url = options["url"];
    }

    public parse(response) {
        _.each(response.items, (item) => {
            item["imageUrl"] = item["url"];
            delete item["url"];
        });
        return response.items;
    }
}
