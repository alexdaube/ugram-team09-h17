import * as Backbone from 'backbone';

import {UserProfileView} from './views/UserProfileView'
import {UserModel} from './models/UserModel';
import {UserCollection} from './collections/UserCollection';

import {UserView} from './views/UserView';

import {FeedView} from './views/FeedView'
import {FeedModel} from './models/FeedModel';

import {UserEditView} from './views/UserEditView'

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
        let userModel = new UserModel({id:'jlabonte'});
        let userProfileView = new UserProfileView({model: userModel});
        userProfileView.render();
    }

    showSetting(param: string = '') {
        let userModel = new UserModel({id:'jlabonte'});
        let userEditView = new UserEditView({model: userModel});
        userEditView.render();
    }

    showUsers(param: string = '') {
        let userCollection = new UserCollection({});
        userCollection.fetch({
            success: function(response) {
                $('#content').html("");
                response.models.forEach(function (profileModel){
                    let userView = new UserView({model: profileModel});
                    $('#content').append(userView.$el);
                    userView.render();
                })
            }
        });
    }
}