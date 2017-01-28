import * as Backbone from "backbone";
import {StringFormatter} from "../util/StringFormatter";

export interface IProfileAttributes {
    email: string;
    firstName: string;
    inscriptionDate: string;
    lastName: string;
    phoneNumber: string;
    pictureUrl: string;
    userName: string;
}

export class ProfileModel extends Backbone.Model {

    public  url: string;

    constructor(options?: any) {
        super(options);
        this.urlRoot = "http://api.ugram.net/users";
    };

    public  defaults() {
        return {
            email: "",
            firstName: "",
            inscriptionDate: "",
            lastName: "",
            phoneNumber: "",
            userName: "",
        };
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
        const bufferDate = this.get("registrationDate");
        const formattedDate = StringFormatter.formatMillisecondDateToMMDDYYYY(new Date(bufferDate));
        return formattedDate;
    }

    set inscriptionDate(inscriptionDate: string){
        this.set("registrationDate", inscriptionDate);
    }
}
