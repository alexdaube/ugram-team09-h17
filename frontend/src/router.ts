import * as Backbone from "backbone";

import {UserSettingsView} from "./views/UserSettingsView";
import {UserModel} from "./models/UserModel";
import {UserCollection} from "./collections/UserCollection";
import {UserCollectionView} from "./views/UserCollectionView";
import {UserProfileView} from "./views/UserProfileView";

import {FeedCollection} from "./collections/FeedCollection";
import {FeedCollectionView} from "./views/FeedCollectionView";

import {HeaderView} from "./views/HeaderView";
import {HeaderModel} from "./models/HeaderModel";

import {FooterView} from "./views/FooterView";
import {FooterModel} from "./models/FooterModel";

import {PictureModel} from "./models/PictureModel";

import {PostView} from "./views/PostView";

export class AppRouter extends Backbone.Router {

    public routes = {
        "": "defaultRoute",
        "profile": "showUserProfile",
        "setting": "showUserSetting",
        "users": "showUsers",
        "users/:userId": "showUserProfile",
        "users/:userId/pictures/:pictureId": "showFeed",
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
        this.showAllFeeds();
    }

    public showAllFeeds() {
        const feedCollection = new FeedCollection({url: "http://api.ugram.net/pictures"});
        const feedCollectionView = new FeedCollectionView({el: "#content", collection: feedCollection});
        feedCollectionView.render();
    }

    public showFeed(userFeedId: string, pictureId: string) {
        const pictureModel = new PictureModel({userId: userFeedId, id: pictureId});
        const postView = new PostView({el: "#content", model: pictureModel});
        postView.render();
    }

    public showUserProfile(userId: string = "") {
        const userModel = new UserModel({id: "jlabonte"});
        const feedCollection = new FeedCollection({url: "http://api.ugram.net/users/" + userModel.id + "/pictures"});
        const userProfileView = new UserProfileView({model: userModel, collection: feedCollection});
        userProfileView.render();
    }

    public showUserSetting(param: string = "") {
        const userModel = new UserModel({id: "jlabonte"});
        const userSettingsView = new UserSettingsView({model: userModel});
        userSettingsView.render();
    }

    public showUsers(param: string = "") {
        const userCollection = new UserCollection({url: "http://api.ugram.net/users"});
        const userCollectionView = new UserCollectionView({el: "#content", collection: userCollection});
        userCollectionView.render();
    }
}
