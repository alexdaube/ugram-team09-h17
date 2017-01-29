import * as Backbone from 'backbone';

import {LoggedUserProfileView} from './views/LoggedUserProfileView'
import {UserModel} from './models/UserModel';
import {UserCollection} from './collections/UserCollection';

import {UserView} from './views/UserView';

import {FeedView} from './views/FeedView'
import {FeedModel} from './models/FeedModel';

import {LoggedUserProfileSettingsView} from './views/LoggedUserSettingsView'

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
        userCollection.fetch({
            success: function(response) {
                $('#content').html("");
                $('#content').append("<div class='contentUser contentUser2'><ul class='boxUser'><li class='titleUser'><h2 class='textUser'>Meet new people</h2></li></ul></div>");
                response.models.forEach(function (profileModel){
                    let userView = new UserView({model: profileModel});
                    $('#content').append(userView.$el);
                    userView.render();
                })
                $('#content').append("<div class='addMoreProfile'><a class='moreTextProfile' href=''>Show more</a></div>");
            }
        });
    }
}