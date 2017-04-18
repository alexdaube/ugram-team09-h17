import * as Backbone from "backbone";

import {AppView} from "./views/AppView";

import {UserSettingsView} from "./views/UserSettingsView";
import {UserModel} from "./models/UserModel";
import {UserCollection} from "./collections/UserCollection";
import {UserCollectionView} from "./views/UserCollectionView";
import {UserProfileView} from "./views/UserProfileView";
import {UserAddPictureView} from "./views/UserAddPictureView";

import {FeedCollection} from "./collections/FeedCollection";
import {FeedCollectionView} from "./views/FeedCollectionView";

import {TagCollection} from "./collections/TagCollection";

import {HeaderView} from "./views/HeaderView";
import {HeaderModel} from "./models/HeaderModel";

import {FooterView} from "./views/FooterView";
import {FooterModel} from "./models/FooterModel";

import {LoginView} from "./views/LoginView";
import {LoginModel} from "./models/LoginModel";

import {PopularView} from "./views/PopularView";

import {PictureModel} from "./models/PictureModel";

import {LikeModel} from "./models/LikeModel";

import {PostView} from "./views/PostView";
import {HeaderRequestGenerator} from "./util/HeaderRequestGenerator";
import {API_BASE_URL} from "./constants";

export class AppRouter extends Backbone.Router {
    public appView = new AppView();

    public routes = {
        "": "defaultRoute",
        "login": "showLogin",
        "home": "showFeed",
        "setting": "showUserSetting",
        "picture": "showAddPicture",
        "users": "showUsers",
        "users/:userId": "showUserProfile",
        "users/:userId/pictures/:pictureId": "showPost",
        "profile": "showProfile",
        "popular": "showPopular",
        "tags/:tag": "showTagFeed",
    };

    constructor() {
        super();
        (<any> this)._bindRoutes();
    }

    public defaultRoute() {
        if (!localStorage.getItem("token")) {
            this.showLogin();
        } else {
            window.location.href = "/?#home";
        }
    }

    public showLogin() {
        const loginModel = new LoginModel({});
        const loginView = new LoginView({model: loginModel});
        this.appView.showView(loginView);
    }

    public showPopular() {
        this.showHeaderFooter();
        this.loginRedirect();

        const userCollection = new UserCollection({url: `${API_BASE_URL}users/popular`});
        const tagCollection = new TagCollection({url: `${API_BASE_URL}tags/popular`});

        const popularView = new PopularView({users: userCollection, tags: tagCollection});
        this.appView.showView(popularView);
    }

    public showProfile() {
        this.showHeaderFooter();

        this.loginRedirect();
        this.showUserProfile(HeaderRequestGenerator.currentUser());
    }

    public showFeed() {
        this.showHeaderFooter();

        this.loginRedirect();
        const feedCollection = new FeedCollection({url: `${API_BASE_URL}pictures`});
        const feedCollectionView = new FeedCollectionView({collection: feedCollection});
        this.appView.showView(feedCollectionView);
    }

    public showTagFeed(tag: string) {
        this.showHeaderFooter();

        this.loginRedirect();
        const feedCollection = new FeedCollection({url: `${API_BASE_URL}tags/${tag}/pictures`});
        const feedCollectionView = new FeedCollectionView({collection: feedCollection});
        this.appView.showView(feedCollectionView);
    }

    public showPost(userFeedId: string, postId: string) {
        this.showHeaderFooter();

        this.loginRedirect();
        const pictureModel = new PictureModel({userId: userFeedId, id: postId});
        const likeModel = new LikeModel({id: userFeedId, pictureId: postId});
        const postView = new PostView({model: pictureModel});
        this.appView.showView(postView);
    }

    public showUserProfile(userId: string = "") {
        this.showHeaderFooter();

        this.loginRedirect();
        const userModel = new UserModel({id: userId});
        const feedCollection = new FeedCollection({url: `${API_BASE_URL}users/${userModel.id}/pictures`});
        const userProfileView = new UserProfileView({model: userModel, collection: feedCollection});
        this.appView.showView(userProfileView);
    }

    public showUserSetting(param: string = "") {
        this.showHeaderFooter();

        this.loginRedirect();
        const userModel = new UserModel({id: HeaderRequestGenerator.currentUser()});
        const userSettingsView = new UserSettingsView({model: userModel});
        this.appView.showView(userSettingsView);
    }

    public showAddPicture(param: string = "") {
        this.showHeaderFooter();

        this.loginRedirect();
        const userModel = new UserModel({id: HeaderRequestGenerator.currentUser()});
        const userAddPictureView = new UserAddPictureView({model: userModel});
        this.appView.showView(userAddPictureView);
    }

    public showUsers(param: string = "") {
        this.showHeaderFooter();

        this.loginRedirect();
        const userCollection = new UserCollection({url: `${API_BASE_URL}users`});
        const userCollectionView = new UserCollectionView({collection: userCollection});
        this.appView.showView(userCollectionView);
    }

    public loginRedirect() {
        if (!localStorage.getItem("token")) {
            window.location.href = "/";
        }
    }

    public showHeaderFooter() {
        const headerModel = new HeaderModel({});
        const feedCollection = new FeedCollection({url: `${API_BASE_URL}pictures`});
        const headerView = new HeaderView({model: headerModel, collection: feedCollection});
        headerView.render();

        const footerModel = new FooterModel({});
        const footerView = new FooterView({model: footerModel});
        footerView.render();
    }
}
