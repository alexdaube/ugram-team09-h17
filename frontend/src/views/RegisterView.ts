import * as Backbone from "backbone";
import * as _ from "underscore";
import * as hello from "hellojs";
import * as request from "superagent";
import {LoginModel} from "../models/LoginModel";

export class RegisterView extends Backbone.View<LoginModel> {
    private template: Function;
    private socialToken: string;
    private serverToken: string;

    constructor(options?: Backbone.ViewOptions<LoginModel>) {
        super(_.extend({el: "#content"}, options));
        this.template = require("./RegisterTemplate.ejs") as Function;
        hello.init({facebook: "760512777458970"});
        this.facebookRegister = this.facebookRegister.bind(this);
    }

    public events() {
        return <Backbone.EventsHash> {
            "click #registerButton": () => {
                hello("facebook").login({
                    scope: "email",
                }).then((auth) => {
                    this.facebookRegister(auth);
                });
            },
        };
    }

    public render() {
        this.$el.html(this.template(this.model.toJSON()));
        return this;
    }

    public facebookRegister(auth) {
        // Save the social token
        this.socialToken = auth.authResponse.access_token;
        const userName = $("#username-input").val();
        // Auth with our own server using the social token
        this.signup(auth.network, this.socialToken, userName).then((response) => {
            this.serverToken = response.body.token;
            localStorage.setItem("token", response.body.token);
        }).catch((err) => {
            // TODO handle error
        });
    }

    private signup(network, socialToken, userName) {
        return new Promise((resolve, reject) => {
            request
                .post("http://localhost:3000/signup")
                .send({
                    network,
                    socialToken,
                    userName,
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
