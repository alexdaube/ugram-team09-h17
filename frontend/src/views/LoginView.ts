import * as Backbone from "backbone";
import * as _ from "underscore";
import * as hello from "hellojs";
import * as request from "superagent";

import {LoginModel} from "../models/LoginModel";

export class LoginView extends Backbone.View<LoginModel> {
    private template: Function;
    private socialToken: string;
    private serverToken: string;

    constructor(options?: Backbone.ViewOptions<LoginModel>) {
        super(_.extend({el: "#content"}, options));
        this.template = require("./LoginTemplate.ejs") as Function;
        hello.init({facebook: "760512777458970"});
        this.facebookLogin = this.facebookLogin.bind(this);
    }

    public events() {
        return <Backbone.EventsHash> {
            "click #loginButton": () => {
                hello("facebook").login({
                    scope: "email",
                }).then((auth) => {
                    this.facebookLogin(auth);
                });
            },
        };
    }

    public render() {
        this.$el.html(this.template(this.model.toJSON()));
        return this;
    }

    public facebookLogin(auth) {
        // Save the social token
        this.socialToken = auth.authResponse.access_token;

        // Auth with our own server using the social token
        this.authenticate(auth.network, this.socialToken).then((response) => {
            if (response.body.token) {
                this.serverToken = response.body.token;
                localStorage.setItem("token", response.body.token);
            } else {
                window.location.href = "/#register";
            }
        }).catch((err) => {
            // TODO catch error
        });
    }

    private authenticate(network, socialToken) {
        return new Promise((resolve, reject) => {
            request
                .post("http://localhost:3000/authentication")
                .send({
                    network,
                    socialToken,
                })
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
}
