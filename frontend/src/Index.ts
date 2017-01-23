import {HelloWorldView} from './views/HelloWorldView'
import {HelloWorldModel} from './models/HelloWorldModel';

import {HeaderView} from './views/HeaderView'
import {HeaderModel} from './models/HeaderModel';

import {FeedView} from './views/FeedView'
import {FeedModel} from './models/FeedModel';

import {FooterView} from './views/FooterView'
import {FooterModel} from './models/FooterModel';

$(document).ready(() => {
    // let helloWorldModel = new HelloWorldModel({firstname: 'GLO-3120', lastname: 'WEB'});
    // let helloWorldView = new HelloWorldView({model: helloWorldModel});
    // helloWorldView.render();

    // let headerModel = new HeaderModel({});
    // let headerView = new HeaderView({model: headerModel});
    // headerView.render();

    let feedModel = new FeedModel({});
    let feedView = new FeedView({model: feedModel});
    feedView.render();

    // let footerModel = new FooterModel({});
    // let footerView = new FooterView({model: footerModel});
    // footerView.render();
});
