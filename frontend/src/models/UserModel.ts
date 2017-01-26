/**
 * Created by jeromelabonte on 2017-01-21.
 */
export interface UserModelAttributes {
    email: string;
    firstName: string;
    id: string;
    lastName: string;
    phoneNumber: number;
    pictureUrl: string;
    registrationDate: number;
}

export class UserModel extends Backbone.Model {

    constructor(attributes, options?: any) {
        super(attributes, options);
    }

    defaults(): UserModelAttributes {
        return {
            email: '',
            firstName: '',
            id: '',
            lastName: '',
            phoneNumber: 0,
            pictureUrl: '',
            registrationDate: 0
        }
    }

    urlRoot = "http://api.ugram.net/users";
}
