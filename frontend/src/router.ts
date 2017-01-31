import * as Backbone from 'backbone';

import {LoggedUserProfileView} from './views/LoggedUserProfileView'
import {UserModel} from './models/UserModel';
import {UserCollection, UserCollectionForView} from './collections/UserCollection';

import {UserCollectionView} from './views/UserCollectionView';

import {FeedView} from './views/FeedView'
import {FeedModel} from './models/FeedModel';

import {LoggedUserProfileSettingsView} from './views/LoggedUserProfileSettingsView'

import {HeaderView} from './views/HeaderView'
import {HeaderModel} from './models/HeaderModel';

import {FooterView} from './views/FooterView'
import {FooterModel} from './models/FooterModel';

export class AppRouter extends Backbone.Router {

    routes = {
        '': 'defaultRoute',
        'profile': 'showLoggedUserProfile',
        'setting': 'showLoggedUserSetting',
        'users': 'showUsers'
    }

    constructor() {
        super();
        (<any>this)._bindRoutes();
    }

    initialize() {
        let headerModel = new HeaderModel({});
        let headerView = new HeaderView({model: headerModel});
        headerView.render();

        let footerModel = new FooterModel({});
        let footerView = new FooterView({model: footerModel});
        footerView.render();
    }

    defaultRoute() {
        let feedModel = new FeedModel({});
        let feedView = new FeedView({model: feedModel});
        feedView.render();
    }

    showLoggedUserProfile(param: string = '') {
        let userModel = new UserModel({id:'jlabonte'});
        let loggedUserProfileView = new LoggedUserProfileView({model: userModel});
        loggedUserProfileView.render();
    }

    showLoggedUserSetting(param: string = '') {
        let userModel = new UserModel({id:'jlabonte'});
        let loggedUserProfileSettingsView = new LoggedUserProfileSettingsView({model: userModel});
        loggedUserProfileSettingsView.render();
    }

    showUsers(param: string = '') {
        let userCollection = new UserCollection({});
        let userCollectionForView = new UserCollectionForView(userCollection);
        let userCollectionView = new UserCollectionView({model:userCollectionForView});
        userCollectionView.render();
    }
}