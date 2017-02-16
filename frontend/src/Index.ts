import * as Backbone from "backbone";
import * as $ from "jquery";

import {AppRouter} from "./router";

$(document).ready(() => {
    const appRouter = new AppRouter();
    Backbone.history.start();
});
