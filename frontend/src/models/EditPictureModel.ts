import * as Backbone from "backbone";

/*  tslint:disable:no-empty-interface */
export interface IEditPictureModelAttributes {
    description?: string;
    mentions?: string[];
    tags?: string[];
    file: any;
    userId: string;
}

export class EditPictureModel extends Backbone.Model {

    constructor(attributes: IEditPictureModelAttributes, options?: any) {
        super(attributes, options);
        this.urlRoot = "http://api.ugram.net/users/"+this.attributes.userId+"/pictures";
    }

}