import * as Backbone from "backbone";

export class TagModel extends Backbone.Model {
    constructor(options?: any) {
        super(options);
    }

    public defaults() {
        return {
            tag: "",
            count: 0,
        };
    }

    get tag(): string {
        return this.get("id");
    }

    set tag(tag: string) {
        this.set("tag", tag);
    }

    get count(): number {
        return this.get("id");
    }

    set count(count: number) {
        this.set("tag", count);
    }
}
