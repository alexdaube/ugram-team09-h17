import * as Backbone from "backbone";
import * as $ from "jquery";
import * as _ from "underscore";
import * as hello from "hellojs";
import * as request from "superagent";

import {InputValidator} from "../util/InputValidator";
import {LoginModel} from "../models/LoginModel";

export class LoginView extends Backbone.View<LoginModel> {
    private template: Function;
    private socialToken: string;
    private network: string;
    private signupNeeded: boolean = true;

    constructor(options?: Backbone.ViewOptions<LoginModel>) {
        super(_.extend({el: "#content"}, options));
        this.template = require("./LoginTemplate.ejs") as Function;
        hello.init({facebook: "760512777458970"});
        this.login = this.login.bind(this);
        this.signup = this.signup.bind(this);
    }

    public events() {
        return <Backbone.EventsHash> {
            "click #loginButton": this.login,
            "click #registerButton": this.signup,
        };
    }

    public render() {
        this.$el.html(this.template({signupNeeded: this.signupNeeded}));
        return this;
    }

    public signup() {
        const userName = $("#username-input").val();
        if (InputValidator.isNullOrEmpty(userName)) {
            // tell user that this field cannot be empty
            return;
        }

        if(InputValidator.isURLSafe(userName)) {
            // Show message
            return
        }

        if(InputValidator.isTooLongText(userName, 30)) {
            // Show message
            return;
        }

        if (InputValidator.containsScriptInjection(userName)) {
            // Show message
            return;
        }

        const params = {
            network: this.network,
            socialToken: this.socialToken,
            userName,
        };
        this.authenticate('signup', params)
            .then(this.signupSuccessCallback)
            .catch(this.signupErrorCallback);
    }

    public login() {
        hello("facebook").login({scope: "email",}).then((auth) => {
            this.socialToken = auth.authResponse.access_token;
            this.network = auth.network;
            const params = {
                network: this.network,
                socialToken: this.socialToken,
            };

            this.authenticate('login', params)
                .then(this.loginSucessCallback)
                .catch(this.loginErrorCallBack);
        });
    }

    private authenticate(route, params) {
        return new Promise((resolve, reject) => {
            request
                .post("http://localhost:3000/" + route)
                .send(params)
                .set("Accept", "application/json")
                .end((err, res) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(res);
                    }
                });
        });
    }

    private loginSucessCallback(response) {
        if (response.body.token) {
            localStorage.setItem("token", response.body.token);
            // move user to /profile
        } else {
            this.signupNeeded = true;
            this.render();
            //window.location.href = "/#register";
        }
    }

    private loginErrorCallBack(err) {
        // TODO catch error
    }

    private signupSuccessCallback(response) {
        localStorage.setItem("token", response.body.token);
        // Move user to profile
    }

    private signupErrorCallback(err) {
        // TODO handle error
        if(err.body.signupError) {
            // Show some error message
        }
    }
}
