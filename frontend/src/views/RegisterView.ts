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
        hello.init({facebook: "885865444886900"});
        this.facebookLogin = this.facebookLogin.bind(this);
    }

    public events() {
        return <Backbone.EventsHash> {
            //"auth.login": this.facebookLogin,
            "click #loginButton": () => {
                hello('facebook').login({
                    scope: 'email'
                }).then((auth) => {
                    this.facebookLogin(auth);
                    console.log(auth);
                });
            },
        };
    }

    // new deps => hellojs, superagent
    // Front end stuff
    // Init hello lib with facebook client id as param

//     hello.init({
//     facebook: '359288236870',
//     windows: '000000004403AD10'
// });


    // Put a click event with a callback => facebookLogin

    // have 2 view wide variables
    // socialToken
    // serverToken

    // on auth.login event
    // save socialtoken
    // call a callback to communicate with own server
//     var socialToken;
//     var serverToken;
//
//     hello.on('auth.login', function (auth) {
//     // Save the social token
//     socialToken = auth.authResponse.access_token;
//
//     // Auth with our own server using the social token
//     authenticate(auth.network, socialToken).then(function (token) {
//         serverToken = token;
//     });
// });
//
//     function authenticate(network, socialToken) {
//     return new Promise(function (resolve, reject) {
//         request
//             .post('/api/auth')
//             .send({
//                 network: network,
//                 socialToken: socialToken
//             })
//             .set('Accept', 'application/json')
//             .end(function(err, res){
//                 if (err) {
//                     reject(err);
//                 } else {
//                     resolve(res);
//                 }
//             });
//     });
// }

    public render() {
        this.$el.html(this.template(this.model.toJSON()));
        return this;
    }

    public facebookLogin(auth) {
        // Save the social token
        this.socialToken = auth.authResponse.access_token;

        // Auth with our own server using the social token
        this.authenticate(auth.network, this.socialToken).then((response) => {
            this.serverToken = response.token;
            //headers: { authorization: localStorage.getItem('token') }
            //localStorage.removeItem('token');
            localStorage.setItem('token', response.token);
        }).catch((err) => {
            debugger;
            var hello = "iam here"
        });
    }

    private authenticate(network, socialToken) {
        return new Promise((resolve, reject) => {
            request
                .post("http://localhost:3000/authentication")
                .send({
                    network: network,
                    socialToken: socialToken
                })
                .set("Accept", "application/json")
                .end(function (err, res) {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(res);
                    }
                });
        });
    }
}
