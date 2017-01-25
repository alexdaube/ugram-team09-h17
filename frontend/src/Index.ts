import {HeaderView} from './views/HeaderView'
import {HeaderModel} from './models/HeaderModel';

import {FeedView} from './views/FeedView'
import {FeedModel} from './models/FeedModel';

import {ProfileView} from './views/ProfileView'
import {ProfileModel} from './models/ProfileModel';

import {SettingView} from './views/SettingView'
import {SettingModel} from './models/SettingModel';

import {FooterView} from './views/FooterView'
import {FooterModel} from './models/FooterModel';

$(document).ready(() => {
    let headerModel = new HeaderModel({});
    let headerView = new HeaderView({model: headerModel});
    headerView.render();

    // let feedModel = new FeedModel({});
    // let feedView = new FeedView({model: feedModel});
    // feedView.render();

    // let profileModel = new ProfileModel({});
    // let profileView = new ProfileView({model: profileModel});
    // profileView.render();

    // let settingModel = new SettingModel({});
    // let settingView = new SettingView({model: settingModel});
    // settingView.render();

    let footerModel = new FooterModel({});
    let footerView = new FooterView({model: footerModel});
    footerView.render();
});

class AppRouter extends Backbone.Router {
    routes = {
        "*feed": "defaultRoute",
        // 'profile': 'showProfile',
        // 'setting': 'showSetting'
    }

    constructor(){
    	super();
    	(<any>this)._bindRoutes();
    }

    defaultRoute() {
        let feedModel = new FeedModel({});
        let feedView = new FeedView({model: feedModel});
        feedView.render();
    }

    // showProfile(param: string = '') {
    //     let profileModel = new ProfileModel({});
    //     let profileView = new ProfileView({model: profileModel});
    //     profileView.render();
    // }

    // showSetting(param: string = '') {
    //     let settingModel = new SettingModel({});
    //     let settingView = new SettingView({model: settingModel});
    //     settingView.render();
    // }
}

var app_router = new AppRouter();
Backbone.history.start();