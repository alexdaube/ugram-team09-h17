import * as Backbone from "backbone";

import {LoggedUserProfileView} from "./views/LoggedUserProfileView";
import {UserModel} from "./models/UserModel";
import {UserCollection} from "./collections/UserCollection";

import {UserCollectionForView} from "./collections/UserCollectionForView";
import {UserCollectionView} from "./views/UserCollectionView";

import {FeedView} from "./views/FeedView";
import {FeedModel} from "./models/FeedModel";

import {UserView} from "./views/UserView";
import {UserProfileView} from "./views/UserProfileView";
import {LoggedUserSettingsView} from "./views/LoggedUserSettingsView";

import {HeaderView} from "./views/HeaderView";
import {HeaderModel} from "./models/HeaderModel";

import {FooterView} from "./views/FooterView";
import {FooterModel} from "./models/FooterModel";
import {RecentlyPostedPictureCollection} from "./collections/RecentlyPostedPictureCollection";
import {RecentlyPostedPicturesView} from "./views/RecentlyPostedPicturesView";

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
        const feedModel = new FeedModel({});
        const feedView = new FeedView({model: feedModel});
        feedView.render();
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

    public showRecentPostedPictures(param: string = "") {
        const recentlyPostedPictureCollection = new RecentlyPostedPictureCollection();
        const recentlyPostedPicturesView = new RecentlyPostedPicturesView({
            recentlyPostedPictures: recentlyPostedPictureCollection,
        });
        recentlyPostedPicturesView.render();
    }

    public showUserProfile(param: string) {
        const userModel = new UserModel({id: param});
        const userProfileView = new UserProfileView({model: userModel});
        userProfileView.render();
    }
}
