import * as Backbone from 'backbone';

import {ProfileView} from './views/ProfileView'
import {ProfileModel} from './models/ProfileModel';
import {ProfileCollection} from './collections/ProfileCollection';

import {UserView} from './views/UserView';

import {FeedView} from './views/FeedView'
import {FeedModel} from './models/FeedModel';

import {SettingView} from './views/SettingView'
import {SettingModel} from './models/SettingModel';

import {HeaderView} from './views/HeaderView'
import {HeaderModel} from './models/HeaderModel';

import {FooterView} from './views/FooterView'
import {FooterModel} from './models/FooterModel';

export class AppRouter extends Backbone.Router {

    routes = {
        '': 'defaultRoute',
        'profile': 'showProfile',
        'setting': 'showSetting',
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

    showProfile(param: string = '') {
        let profileModel = new ProfileModel({id:'jlabonte'});
        let profileView = new ProfileView({model: profileModel});
        profileView.render();
    }

    showSetting(param: string = '') {
        let settingModel = new SettingModel({});
        let settingView = new SettingView({model: settingModel});
        settingView.render();
    }

    showUsers(param: string = '') {
        let profileCollection = new ProfileCollection({});
        profileCollection.fetch({
            success: function(response) {
                response.models.forEach(function (profileModel){
                    let userView = new UserView({model: profileModel});
                    $('#content').append(userView.$el);
                    userView.render();
                })
            }
        });
    }
}