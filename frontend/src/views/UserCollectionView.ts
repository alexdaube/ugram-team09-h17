import * as Backbone from "backbone";
import * as $ from "jquery";
import * as _ from "underscore";
import { HeaderRequestGenerator } from "../util/HeaderRequestGenerator";
import {ShowMoreView} from "./ShowMoreView";
import {UserView} from "./UserView";
import {SearchUserView} from "./SearchUserView";

export class UserCollectionView extends Backbone.View<any> {
    private template: Function;
    private usersPerPage: number = 15;
    private nextPageToFetch: number = 0;
    private usersPerPageSearch: number = 100000;
    private userList: SearchUserView[];

    constructor(options?: Backbone.ViewOptions<any>) {
        super(_.extend({el: "#content"}, options));
        this.userList = new Array<SearchUserView>();
        this.template = require("./UserCollectionTemplate.ejs") as Function;
    }

    public render() {
        const html = this.template();
        this.$el.html(html);

        $(".searchBox").hide();

        $("#findInput").focusout( () => {
            window.setTimeout( () => { $(".searchBox").hide(); }, 100);
        });

        $("#findInput").click( () => {
            if ($("#findInput").val().length > 0) {
                $(".searchBox").show();
                this.searchText();
            }
        });

        $("#findInput").keyup( () => {
            if ($("#findInput").val().length > 0) {
                $(".searchBox").show();
                this.searchText();
            } else {
                $(".searchBox").hide();
            }
        });

        this.showPictures();
        this.showSearch();

        const showMoreView = new ShowMoreView({
            el: "#show-more-container",
            showMoreCallback: this.showPictures.bind(this),
        });

        showMoreView.render();
        return this;
    }

    private showPictures() {
        this.collection.fetch({
            beforeSend: HeaderRequestGenerator.sendAuthorization,
            data: {
                page: this.nextPageToFetch,
                perPage: this.usersPerPage,
            },
            success: () => {
                this.nextPageToFetch += 1;
                this.renderPictures();
            },
        });
    }

    private showSearch() {
        this.collection.fetch({
            beforeSend: HeaderRequestGenerator.sendAuthorization,
            data: {
                page: this.nextPageToFetch,
                perPage: this.usersPerPageSearch,
            },
            success: () => {
                this.nextPageToFetch += 1;
                this.renderSearch();
            },
        });
    }

    private renderPictures() {
        this.collection.each((user) => {
            const userView = new UserView({el: "#usersList", model: user});
            userView.append();
        });
        this.checkForMorePicturesAvailable();
    }

    private checkForMorePicturesAvailable() {
        if (this.collection.length < this.usersPerPage) {
            $("#show-more-container").hide();
        }
    }

    private renderSearch() {
        this.collection.each((user) => {
            const searchUserView = new SearchUserView({el: "#searchList", model: user});
            this.userList.push(searchUserView);
        });
    }

    private searchText() {
        let isEmpty = true;
        $("#searchList").html("");
        for (const searchUserView of this.userList) {
            if (searchUserView.model.userName.toLowerCase().indexOf($("#findInput").val().toLowerCase()) >= 0) {
                searchUserView.append();
                isEmpty = false;
            }
        }

        if (isEmpty) {
            $(".searchBox").hide();
        }
    }
}
