import * as Backbone from "backbone";

import {LoggedUserProfileView} from "./views/LoggedUserProfileView";
import {LoggedUserSettingsView} from "./views/LoggedUserSettingsView";

import {UserModel} from "./models/UserModel";
import {UserCollection} from "./collections/UserCollection";
import {UserCollectionForView} from "./collections/UserCollectionForView";
import {UserCollectionView} from "./views/UserCollectionView";
import {UserView} from "./views/UserView";
import {UserProfileView} from "./views/UserProfileView";

import {FeedCollection} from "./collections/FeedCollection";
import {FeedCollectionView} from "./views/FeedCollectionView";
import {FeedCollectionForView} from "./collections/FeedCollectionForView";
import {FeedModel} from "./models/FeedModel";

import {HeaderView} from "./views/HeaderView";
import {HeaderModel} from "./models/HeaderModel";

import {FooterView} from "./views/FooterView";
import {FooterModel} from "./models/FooterModel";

export class AppRouter extends Backbone.Router {

    public routes = {
        "": "defaultRoute",
        "profile": "showLoggedUserProfile",
        "setting": "showLoggedUserSetting",
        "users": "showUsers",
        "users/:id": "showUserProfile",
        "recent" : "showRecentPostedPictures",
    };

    constructor() {
        super();
        (<any> this)._bindRoutes();
    }

    public initialize() {
        const headerModel = new HeaderModel({});
        const headerView = new HeaderView({model: headerModel});
        headerView.render();

        const footerModel = new FooterModel({});
        const footerView = new FooterView({model: footerModel});
        footerView.render();
    }

    public defaultRoute() {
        const feedCollection = new FeedCollection();
        const feedCollectionForView = new FeedCollectionForView(feedCollection);
        const feedCollectionView = new FeedCollectionView({model: feedCollectionForView});
        feedCollectionView.render();
    }

    public showLoggedUserProfile(param: string = "") {
        const userModel = new UserModel({id: "jlabonte"});
        const loggedUserProfileView = new LoggedUserProfileView({model: userModel});
        loggedUserProfileView.render();
    }

    public showLoggedUserSetting(param: string = "") {
        const userModel = new UserModel({id: "jlabonte"});
        const loggedUserSettingsView = new LoggedUserSettingsView({model: userModel});
        loggedUserSettingsView.render();
    }

    public showUsers(param: string = "") {
        const userCollection = new UserCollection();
        const userCollectionForView = new UserCollectionForView(userCollection);
        const userCollectionView = new UserCollectionView({model: userCollectionForView});
        userCollectionView.render();
    }

    public showUserProfile(param: string) {
        const userModel = new UserModel({id: param});
        const userProfileView = new UserProfileView({model: userModel});
        userProfileView.render();
    }
}
