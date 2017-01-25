import {AppRouter} from "./router"

$(document).ready(() => {
    var app_router = new AppRouter();
    Backbone.history.start();
});