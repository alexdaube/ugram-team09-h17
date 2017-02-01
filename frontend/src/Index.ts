import * as Backbone from "backbone";
import * as $ from "jquery";

import {AppRouter} from "./router";

$(document).ready(() => {
    const approuter = new AppRouter();
    Backbone.history.start();
});
