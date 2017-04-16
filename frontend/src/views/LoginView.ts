import * as Backbone from "backbone";
import * as $ from "jquery";
import * as _ from "underscore";
import * as hello from "hellojs";
import * as request from "superagent";
import {InputValidator} from "../util/InputValidator";
import {LoginModel} from "../models/LoginModel";
import {API_BASE_URL, FB_CLIENT} from "../constants";

export class LoginView extends Backbone.View<LoginModel> {
    private template: Function;
    private socialToken: string;
    private network: string;
    private signupNeeded: boolean = false;

    constructor(options?: Backbone.ViewOptions<LoginModel>) {
        super(_.extend({}, options));
        this.template = require("./LoginTemplate.ejs") as Function;
        hello.init({facebook: FB_CLIENT});
        this.login = this.login.bind(this);
        this.signup = this.signup.bind(this);
        this.loginSucessCallback = this.loginSucessCallback.bind(this);
        this.loginErrorCallBack = this.loginErrorCallBack.bind(this);
        this.signupSuccessCallback = this.signupSuccessCallback.bind(this);
        this.signupErrorCallback = this.signupErrorCallback.bind(this);
    }

    public events() {
        return <Backbone.EventsHash> {
            "click #loginButton": () => { this.login(); },
            "click #registerButton": () => { this.signup(); },
        };
    }

    public render() {
        this.$el.html(this.template({signupNeeded: this.signupNeeded}));
        return this;
    }

    public signup() {
        const userName = $("#username-input").val().trim();
        if (InputValidator.isNullOrEmpty(userName)) {
            this.showError("User name cannot be empty!");
            return;
        }

        if (InputValidator.isTooLongText(userName, 30)) {
            this.showError("User name must be shorter than 30 characters!");
            return;
        }

        if (InputValidator.isURLSafe(userName)) {
            this.showError("User name cannot contain anything other than numbers, letters, underscores or dashes. It must not have any spaces either!");
            return;
        }

        const params = {
            network: this.network,
            socialToken: this.socialToken,
            userName,
        };

        this.authenticate("signup", params)
            .then(this.signupSuccessCallback)
            .catch(this.signupErrorCallback);
    }

    public login() {
        hello("facebook").login({scope: "email"}).then((auth) => {
            this.socialToken = auth.authResponse.access_token;
            this.network = auth.network;
            const params = {
                network: this.network,
                socialToken: this.socialToken,
            };
            this.authenticate("login", params)
                .then(this.loginSucessCallback)
                .catch(this.loginErrorCallBack);
        });
    }

    private showError(message: string) {
        $("#textErrorSetting").show();
        $("#textErrorSetting").find("p").text(message);
    }

    private authenticate(route, params) {
        return new Promise((resolve, reject) => {
            request
                .post(`${API_BASE_URL}${route}`)
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
            Backbone.history.navigate("profile", true);
        } else {
            this.signupNeeded = true;
            this.render();
        }
    }

    private loginErrorCallBack(err) {
        // TODO catch error
    }

    private signupSuccessCallback(response) {
        localStorage.setItem("token", response.body.token);
        Backbone.history.navigate("profile", true);
    }

    private signupErrorCallback(err) {
        if (err.response.body.signupError) {
            this.showError(err.response.body.signupError);
        }
    }
}
