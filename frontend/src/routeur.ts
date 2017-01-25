


export class AppRouter extends Backbone.Router {
    routes = {
        '': 'defaultRoute',
        'profile': 'showProfile',
        'setting': 'showSetting'
    }

    constructor(){
        super();
        (<any>this)._bindRoutes();
    }
}