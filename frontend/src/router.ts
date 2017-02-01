import * as Backbone from 'backbone';

import {LoggedUserProfileView} from './views/LoggedUserProfileView'
import {UserModel} from './models/UserModel';
import {UserCollection} from './collections/UserCollection';

import {UserCollectionForView} from './collections/UserCollectionForView';
import {UserCollectionView} from './views/UserCollectionView';


import {FeedCollectionView} from './views/FeedCollectionView'
import {FeedCollectionForView} from './collections/FeedCollectionForView'

import {FeedModel} from './models/FeedModel';

import {UserView} from './views/UserView';
import {UserProfileView} from './views/UserProfileView';
import {LoggedUserSettingsView} from './views/LoggedUserSettingsView';

import {HeaderView} from './views/HeaderView'
import {HeaderModel} from './models/HeaderModel';

import {FooterView} from './views/FooterView'
import {FooterModel} from './models/FooterModel';
import {FeedCollection} from "./collections/FeedCollection";
import {RecentlyPostedPicturesView} from "./views/RecentlyPostedPicturesView";

export class AppRouter extends Backbone.Router {

    routes = {
        '': 'defaultRoute',
        'profile': 'showLoggedUserProfile',
        'setting': 'showLoggedUserSetting',
        'users': 'showUsers',
        'users/:id': 'showUserProfile',
        'recent' : 'showRecentPostedPictures',
        'feed' : 'showFeed',
    };

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
        // let feedModel = new FeedModel({});
        // let feedView = new FeedCollectionView({model: feedModel});
        // feedView.render();
    }

    showLoggedUserProfile(param: string = '') {
        let userModel = new UserModel({id:'jlabonte'});
        let loggedUserProfileView = new LoggedUserProfileView({model: userModel});
        loggedUserProfileView.render();
    }

    showLoggedUserSetting(param: string = '') {
        let userModel = new UserModel({id:'jlabonte'});
        let loggedUserSettingsView = new LoggedUserSettingsView({model: userModel});
        loggedUserSettingsView.render();
    }

    showUsers(param: string = '') {
        let userCollection = new UserCollection;
        let userCollectionForView = new UserCollectionForView(userCollection);
        let userCollectionView = new UserCollectionView({model:userCollectionForView});
        userCollectionView.render();
    }

    showFeed(param: string = '') {
        let feedCollection = new FeedCollection;
        let feedCollectionForView = new FeedCollectionForView(feedCollection);
        let feedCollectionView = new FeedCollectionView({model:feedCollectionForView});
        feedCollectionView.render();
    }

    showUserProfile(param: string = '') {
        console.log(param);
        let userModel = new UserModel({id: param});
        let userProfileView = new UserProfileView({model: userModel});
        userProfileView.render();
    }
}