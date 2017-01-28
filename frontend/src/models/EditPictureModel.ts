import * as Backbone from "backbone";

/*  tslint:disable:no-empty-interface */
export interface IEditPictureModelAttributes {
    description?: string;
    mentions?: string[];
    tags?: string[];
}

export class EditPictureModel extends Backbone.Model {

    constructor(attributes: IEditPictureModelAttributes, options?: any) {
        super(attributes, options);
    }
}