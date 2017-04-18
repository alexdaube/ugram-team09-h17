import * as Backbone from "backbone";
import * as $ from "jquery";
import * as _ from "underscore";
import {HeaderRequestGenerator} from "../util/HeaderRequestGenerator";
import {UserCollection} from "../collections/UserCollection";
import {TagCollection} from "../collections/TagCollection";
import {UserView} from "./UserView";
import {TagView} from "./TagView";

interface ICollections {
    users: UserCollection;
    tags: TagCollection;
}

export class PopularView extends Backbone.View<any> {
    private template: Function;
    private users: UserCollection;
    private tags: TagCollection;

    constructor(collections: ICollections, options?: Backbone.ViewOptions<any>) {
        super(options);
        this.users = collections.users;
        this.tags = collections.tags;
        this.template = require("./PopularTemplate.ejs") as Function;
    }

    public close() {
        this.remove();
        this.unbind();
    }

    public render() {
        this.$el.html(this.template({}));
        this.fetchCollection(this.users, this.renderUsers);
        this.fetchCollection(this.tags, this.renderTags);
        return this;
    }

    private fetchCollection(collection, renderCallback) {
        collection.fetch({
            beforeSend: HeaderRequestGenerator.sendAuthorization,
            success: () => {
                renderCallback(collection);
            },
            error: () => {
                renderCallback([]);
            },
        });
    }

    private renderUsers(collection) {
        if (collection.length !== 0 ) {
            collection.each((user) => {
                const userView = new UserView({el: "#popularUsersList", model: user});
                userView.append();
            });
        } else {
            $("#popularUsersList").append(`<div class="centerPopularTitle"><p>There are no users with likes</p></div>`);
        }
    }

    private renderTags(collection) {
        if (collection.length !== 0 ) {
            collection.each((tag) => {
                const tagView = new TagView({el: "#popularTagsList", model: tag});
                tagView.append();
            });
        } else {
            $("#popularTagsList").append(`<div class="centerPopularTitle"><p>There are no hashtags mentioned</p></div>`);
        }
    }
}
