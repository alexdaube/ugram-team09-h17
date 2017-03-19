import * as Backbone from "backbone";
import * as hello from "hellojs";

import {HeaderRequestGenerator} from "../util/HeaderRequestGenerator";
import {PictureView} from "./PictureView";
import {ShowMoreView} from "./ShowMoreView";
import {InputValidator} from "../util/InputValidator";

export class UserProfileView extends Backbone.View<any> {
    private template: Function;
    private picturesPerPage: number = 9;
    private nextPageToFetch: number = 0;

    constructor(options?: any) {
        super(options);
        this.template = require("./UserProfileTemplate.ejs") as Function;
    }

    public events() {
        return <Backbone.EventsHash> {
            "click #logoutButton": "logout",
            "click #optionButton": () => { $("#popupCloseContent").show(); $("#confirmDelete").hide(); },
            "click #closeExitButtonPopup": () => { $("#popupCloseContent").hide(); $("#confirmDelete").hide(); },
            "click #closeCancelButtonPopup": () => { $("#popupCloseContent").hide(); $("#confirmDelete").hide(); },
            "click #deleteAccount": () => { $("#confirmDelete").show(); },
            "click #confirmDelete": "deleteMyAccount",
        };
    }

    public render() {
        this.model.fetch({
            beforeSend: HeaderRequestGenerator.sendAuthorization,
            success: () => {
                this.$el.html(this.template(
                    {
                        user: this.model,
                        currentUser: HeaderRequestGenerator.currentUser(),
                    }));
                this.$el.first().removeClass("contentFeed");

                const showMoreView = new ShowMoreView({
                    el: "#show-more-container",
                    showMoreCallback: this.showPictures.bind(this),
                });
                showMoreView.render();
                this.showPictures();
            },
            error: () => {
                this.$el.html(this.template("No user by that name!"));
            },
        });
        return this;
    }

    private showPictures() {
        this.collection.fetch({
            beforeSend: HeaderRequestGenerator.sendAuthorization,
            data: {
                page: this.nextPageToFetch,
                perPage: this.picturesPerPage,
            },
            success: () => {
                this.nextPageToFetch += 1;
                this.renderPictures();
            },
            error: () => {
                $("#profile-pictures-list").append("<h3>You have no pictures yet!</h3>");
                $("#show-more-container").hide();
            },
        });
    }

    private renderPictures() {
        this.collection.each((picture) => {
            const pictureView = new PictureView({el: "#profile-pictures-list", model: picture});
            pictureView.append();
        });
        this.checkForMorePicturesAvailable();
    }

    private checkForMorePicturesAvailable() {
        if (this.collection.length < this.picturesPerPage) {
            $("#show-more-container").hide();
        }
    }

    private deleteMyAccount() {        
        $("#confirmDelete").hide();
        const view = this;
        this.model.destroy({
            beforeSend: HeaderRequestGenerator.setContentTypeToJSON,
            success() {
                view.logout();
            },
            error() {
                // TODO Handle error
            },
        });
    }

    private logout() {
        hello("facebook").logout().then(() => {
            localStorage.removeItem("token");
            localStorage.removeItem("currentUser");
            window.location.href = "/";
        });

    }
}
