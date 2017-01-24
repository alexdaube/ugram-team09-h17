import {HelloWorldView} from './views/HelloWorldView'
import {HelloWorldModel} from './models/HelloWorldModel';

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

    let feedModel = new FeedModel({});
    let feedView = new FeedView({model: feedModel});
    feedView.render();

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
