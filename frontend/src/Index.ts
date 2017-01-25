

import {AppRouter} from "./routeur"

$(document).ready(() => {
    var app_router = new AppRouter();
    Backbone.history.start();
});
