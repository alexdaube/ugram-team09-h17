import * as Backbone from "backbone";

import {UserSettingsView} from "./views/UserSettingsView";
import {UserModel} from "./models/UserModel";
import {UserCollection} from "./collections/UserCollection";
import {UserCollectionView} from "./views/UserCollectionView";
import {UserProfileView} from "./views/UserProfileView";
import {UserAddPictureView} from "./views/UserAddPictureView";

import {FeedCollection} from "./collections/FeedCollection";
import {FeedCollectionView} from "./views/FeedCollectionView";

import {HeaderView} from "./views/HeaderView";
import {HeaderModel} from "./models/HeaderModel";

import {FooterView} from "./views/FooterView";
import {FooterModel} from "./models/FooterModel";

import {LoginView} from "./views/LoginView";
import {LoginModel} from "./models/LoginModel";

import {TopsView} from "./views/TopsView";

import {PictureModel} from "./models/PictureModel";

import {LikeModel} from "./models/LikeModel";
import {LikeCollection} from "./collections/LikeCollection";

import {PostView} from "./views/PostView";
import {HeaderRequestGenerator} from "./util/HeaderRequestGenerator";
import {API_BASE_URL} from "./constants";

export class AppRouter extends Backbone.Router {

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
        "tops": "showTops",
    };

    constructor() {
        super();
        (<any> this)._bindRoutes();
    }

    public defaultRoute() {
        if (!localStorage.getItem("token")) {
            this.showLogin();
        } else {
            window.location.href = "/#home";
        }
    }

    public showLogin() {
        const loginModel = new LoginModel({});
        const loginView = new LoginView({model: loginModel});
        loginView.render();
    }

    public showTops() {
        this.showHeaderFooter();
        this.loginRedirect();
        const topsView = new TopsView({});
        topsView.render();
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
        const feedCollectionView = new FeedCollectionView({el: "#content", collection: feedCollection});
        feedCollectionView.render();
    }

    public showPost(userFeedId: string, postId: string) {
        this.showHeaderFooter();

        this.loginRedirect();
        const pictureModel = new PictureModel({userId: userFeedId, id: postId});
        const likeModel = new LikeModel({id: userFeedId, pictureId: postId});
        const likeCollection = new LikeCollection({url: `${API_BASE_URL}pictures/${likeModel.pictureId}/likes`});
        const postView = new PostView({el: "#content", model: pictureModel, collection: likeCollection});
        postView.render();
    }

    public showUserProfile(userId: string = "") {
        this.showHeaderFooter();

        this.loginRedirect();
        const userModel = new UserModel({id: userId});
        const feedCollection = new FeedCollection({url: `${API_BASE_URL}users/${userModel.id}/pictures`});
        const userProfileView = new UserProfileView({el: "#content", model: userModel, collection: feedCollection});
        userProfileView.render();
    }

    public showUserSetting(param: string = "") {
        this.showHeaderFooter();

        this.loginRedirect();
        const userModel = new UserModel({id: HeaderRequestGenerator.currentUser()});
        const userSettingsView = new UserSettingsView({model: userModel});
        userSettingsView.render();
    }

    public showAddPicture(param: string = "") {
        this.showHeaderFooter();

        this.loginRedirect();
        const userModel = new UserModel({id: HeaderRequestGenerator.currentUser()});
        const userAddPictureView = new UserAddPictureView({model: userModel});
        userAddPictureView.render();
    }

    public showUsers(param: string = "") {
        this.showHeaderFooter();

        this.loginRedirect();
        const userCollection = new UserCollection({url: `${API_BASE_URL}users`});
        const userCollectionView = new UserCollectionView({el: "#content", collection: userCollection});
        userCollectionView.render();
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
