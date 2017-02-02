import * as Backbone from "backbone";
import * as _ from "underscore";

export class ShowMoreView extends Backbone.View<any> {
    private template: Function;
    private onShowMoreCallback: Function;

    constructor(options?: any) {
        super(_.extend({
            el: options["element"],
        }, options));
        this.onShowMoreCallback = options["showMoreCallback"];
        this.template = require("./ShowMoreTemplate.ejs") as Function;
    }

    public render() {
        const html = this.template();
        this.$el.html(html);
        return this;
    }

    public events() {
        return <Backbone.EventsHash> {
            "click #show-more-button": "handleShowMore",
        };
    }

    private handleShowMore() {
        this.onShowMoreCallback();
    }
}
