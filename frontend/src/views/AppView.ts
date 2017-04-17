import * as Backbone from "backbone";
import * as _ from "underscore";

export class AppView extends Backbone.View<any> {
    public currentView: any = null;

    public showView(view: Backbone.View<any>) {
        if (this.currentView) {
            this.currentView.close();
        }
        this.currentView = view;
        this.currentView.render();
        this.currentView.$el.appendTo("#content");
    }

}
