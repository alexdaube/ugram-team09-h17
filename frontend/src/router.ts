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

import {RegisterView} from "./views/RegisterView";

import {LoginView} from "./views/LoginView";
import {LoginModel} from "./models/LoginModel";

import {PictureModel} from "./models/PictureModel";

import {PostView} from "./views/PostView";
import {HeaderRequestGenerator} from "./util/HeaderRequestGenerator";

export class AppRouter extends Backbone.Router {

    public routes = {
        "": "defaultRoute",
        "login": "showLogin",
        "home": "showFeed",
        "register": "showRegister",
        "setting": "showUserSetting",
        "picture": "showAddPicture",
        "users": "showUsers",
        "users/:userId": "showUserProfile",
        "users/:userId/pictures/:pictureId": "showPost",
        "profile": "showProfile",
    };

    constructor() {
        super();
        (<any> this)._bindRoutes();
    }

    public initialize() {
        const headerModel = new HeaderModel({});
        //const feedCollection = new FeedCollection({url: "http://api.ugram.net/pictures"});
        const feedCollection = new FeedCollection({url: "http://localhost:3000/pictures"});
        const headerView = new HeaderView({model: headerModel, collection: feedCollection});
        headerView.render();

        const footerModel = new FooterModel({});
        const footerView = new FooterView({model: footerModel});
        footerView.render();
    }

    public defaultRoute() {
        this.showRegister();
    }

    public showRegister() {
        const loginModel = new LoginModel({});
        const registerView = new RegisterView({model: loginModel});
        registerView.render();
    }

    public showLogin() {
        const loginModel = new LoginModel({});
        const loginView = new LoginView({model: loginModel});
        loginView.render();
    }

    public showProfile() {
        this.showUserProfile(HeaderRequestGenerator.userId);
    }

    public showFeed() {
        //const feedCollection = new FeedCollection({url: "http://api.ugram.net/pictures"});
        const feedCollection = new FeedCollection({url: "http://localhost:3000/pictures"});
        const feedCollectionView = new FeedCollectionView({el: "#content", collection: feedCollection});
        feedCollectionView.render();
    }

    public showPost(userFeedId: string, pictureId: string) {
        const pictureModel = new PictureModel({userId: userFeedId, id: pictureId});
        const postView = new PostView({el: "#content", model: pictureModel});
        postView.render();
    }

    public showUserProfile(userId: string = "") {
        const userModel = new UserModel({id: userId});
        //const feedCollection = new FeedCollection({url: "http://api.ugram.net/users/" + userModel.id + "/pictures"});
        const feedCollection = new FeedCollection({url: "http://localhost:3000/users/" + userModel.id + "/pictures"});
        const userProfileView = new UserProfileView({el: "#content", model: userModel, collection: feedCollection});
        userProfileView.render();
    }

    public showUserSetting(param: string = "") {
        const userModel = new UserModel({id: HeaderRequestGenerator.userId});
        const userSettingsView = new UserSettingsView({model: userModel});
        userSettingsView.render();
    }

    public showAddPicture(param: string = "") {
        const userModel = new UserModel({id: HeaderRequestGenerator.userId});
        const userAddPictureView = new UserAddPictureView({model: userModel});
        userAddPictureView.render();
    }

    public showUsers(param: string = "") {
        //const userCollection = new UserCollection({url: "http://api.ugram.net/users"});
        const userCollection = new UserCollection({url: "http://localhost:3000/users"});
        const userCollectionView = new UserCollectionView({el: "#content", collection: userCollection});
        userCollectionView.render();
    }
}
