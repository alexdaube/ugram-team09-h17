import * as Backbone from "backbone";
import * as $ from "jquery";
import * as _ from "underscore";

import {ShowMoreView} from "./ShowMoreView";
import {UserView} from "./UserView";
import {SearchView} from "./SearchView";

export class UserCollectionView extends Backbone.View<any> {
    private template: Function;
    private usersPerPage: number = 15;
    private nextPageToFetch: number = 0;
    private usersPerPageSearch: number = 100000;
    private searchText: string = "";

    constructor(options?: Backbone.ViewOptions<any>) {
        super(_.extend({el: "#content"}, options));
        this.template = require("./UserCollectionTemplate.ejs") as Function;
    }

    public render() {

        $("document").ready( function() {
            $(".searchBox").hide();

            $("#content").click( function() {
                $(".searchBox").hide();
            });

            $("#findInput").click( function(event) {
                $(".searchBox").show();
                event.stopPropagation(); 
            });

            $("#findInput").keyup( function(event) {
                this.searchText = $("#findInput").val();
                console.log(this.searchText);
            });
        });

        const html = this.template();
        this.$el.html(html);
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
            const userView = new UserView({el: "#usersList" , model: user});
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
        //var compter = 0;
        this.collection.each((user) => {
            console.log("1 :" + user.id);
            console.log("2 :" + this.searchText);
            if (user.id == this.searchText) {
                 const searchView = new SearchView({el: "#searchList" , model: user});
                 searchView.append();
            //     //compter++;
            }
        });

        //console.log(compter);
    }
}
