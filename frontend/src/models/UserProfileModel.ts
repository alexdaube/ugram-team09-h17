import {StringFormatter} from '../util/StringFormatter';

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



    constructor(options?: any) {
        super(options);
        this.url = "http://api.ugram.net/users/jlabonte";
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

    get userName(): string {
        return this.get("id");
    }

    set userName(userName: string){
        this.set("id", userName);
    }

    get firstName(): string {
        return this.get("firstName");
    }

    set firstName(firstName: string){
        this.set("firstName", firstName);
    }

    get lastName(): string {
        return this.get("lastName");
    }

    set lastName(lastName: string){
        this.set("lastName", lastName);
    }

    get email(): string {
        return this.get("email");
    }

    set email(email: string){
        this.set("email", email);
    }

    get phoneNumber(): number {
        return this.get("phoneNumber");
    }

    set phoneNumber(phoneNumber: number){
        this.set("phoneNumber", phoneNumber);
    }

    get inscriptionDate(): string {
        var bufferDate = this.get("registrationDate");
        var formattedDate = StringFormatter.formatMilisecondDateToMMDDYYYY(new Date(bufferDate));
        return formattedDate;
    }

    set inscriptionDate(inscriptionDate: string){
        this.set("registrationDate", inscriptionDate);
    }
}
























