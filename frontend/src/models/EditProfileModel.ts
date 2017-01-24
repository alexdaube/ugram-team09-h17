export interface EditProfileModelAttributes {
}

export class EditProfileModel extends Backbone.Model {

    constructor(attributes: EditProfileModelAttributes, options?: any) {
        super(attributes, options);
    }

    defaults() {
        return {
        }
    }
}
