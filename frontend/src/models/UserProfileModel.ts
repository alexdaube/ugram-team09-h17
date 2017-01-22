

export interface UserProfileAttributes {
    userName: string;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    inscriptionDate: string;
}

export class UserProfileModel extends Backbone.Model {

    url: string;

    //userName: string;
    // firstName: string;
    // lastName: string;
    // email: string;
    // phoneNumber: string;
    // inscriptionDate: string;








    get userName(): string {
        return this.get("userName");
    }

    set userName(userName: string){
        this.set("userName", userName);
    }

    get firstName(): string {
        return this.get("firstName");
    }

    set firstName(firstName: string){
        this.set("firstName", firstName);
    }

    constructor(options?: any) {
        super(options);
        this.url = "http://api.ugram.net/users/derp";
    };

    defaults() {
        return {
            userName: "",
            firstName: "",
            lastName: "",
            email: "",
            phoneNumber: "",
            inscriptionDate: ""
        }
    }
}

