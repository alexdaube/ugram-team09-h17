import * as Backbone from "backbone";
import * as _ from "underscore";

import {HeaderRequestGenerator} from "../util/HeaderRequestGenerator";
import {SearchTextView} from "./SearchTextView";
import {NotificationCollectionView} from "./NotificationCollectionView";

export class HeaderView extends Backbone.View<any> {
    private template: Function;
    private nextPageToFetch: number = 0;
    private usersPerPageSearch: number = 100000;
    private textList: SearchTextView[];

    constructor(options?: any) {
        super(_.extend({el: "#header"}, options));
        this.textList = new Array<SearchTextView>();
        this.template = require("./HeaderTemplate.ejs") as Function;
    }

    public events() {
        return <Backbone.EventsHash> {
            "click #notificationButton": () => { $(".notificationZone").show(); },
        };
    }

    public render() {
        const html = this.template();
        this.$el.html(html);

        $(".searchBox2").hide();

        $("#findInput2").focusout( () => {
            window.setTimeout( () => { $(".searchBox2").hide(); }, 250);
        });

        $("#findInput2").click( () => {
            if ($("#findInput2").val().length > 0) {
                $(".searchBox2").show();
                this.searchText();
            }
        });

        $("#findInput2").keyup( () => {
            if ($("#findInput2").val().length > 0) {
                $(".searchBox2").show();
                this.searchText();
            } else {
                $(".searchBox2").hide();
            }
        });

        this.showSearch();
        this.renderNotification();

        return this;
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

    private renderSearch() {
        this.collection.each((picture) => {
            const searchTextView = new SearchTextView({el: "#searchList2", model: picture});
            this.textList.push(searchTextView);
        });
    }

    private renderNotification() {
        const notificationCollectionView = new NotificationCollectionView({el: "#notificationCollection"});
        notificationCollectionView.render();
    }

    private searchText() {
        let isEmpty = true;
        $("#searchList2").html("");
        for (const searchTextView of this.textList) {
            if (searchTextView.model.description != null) {
                if (searchTextView.model.description.toLowerCase().indexOf($("#findInput2").val().toLowerCase()) >= 0) {
                    searchTextView.append();
                    isEmpty = false;
                }
            }
        }

        if (isEmpty) {
            $(".searchBox2").hide();
        }
    }
}
