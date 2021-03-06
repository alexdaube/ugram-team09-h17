import * as Backbone from "backbone";

import {InputFormatter} from "../util/InputFormatter";
import {API_BASE_URL} from "../constants";

export class UserModel extends Backbone.Model {

    constructor(options?: any) {
        super(options);
        this.urlRoot = `${API_BASE_URL}users`;
    }

    public defaults() {
        return {
            userName: "",
            firstName: "",
            lastName: "",
            email: "",
            phoneNumber: "",
            inscriptionDate: "",
            profilePictureUrl: "",
            likes: 0,
        };
    }

    get userName(): string {
        return this.get("id");
    }

    set userName(userName: string) {
        this.set("id", userName);
    }

    get firstName(): string {
        return this.get("firstName");
    }

    set firstName(firstName: string) {
        this.set("firstName", firstName);
    }

    get lastName(): string {
        return this.get("lastName");
    }

    set lastName(lastName: string) {
        this.set("lastName", lastName);
    }

    get email(): string {
        return this.get("email");
    }

    set email(email: string) {
        this.set("email", email);
    }

    get phoneNumber(): number {
        return this.get("phoneNumber");
    }

    set phoneNumber(phoneNumber: number) {
        this.set("phoneNumber", phoneNumber);
    }

    get inscriptionDate(): string {
        const bufferDate = this.get("registrationDate");
        return InputFormatter.formatMillisecondDateToMMDDYYYY(new Date(bufferDate));
    }

    set inscriptionDate(inscriptionDate: string) {
        this.set("registrationDate", inscriptionDate);
    }

    get profilePictureUrl(): string {
        return this.get("pictureUrl");
    }

    set profilePictureUrl(profilePictureUrl: string) {
        this.set("pictureUrl", profilePictureUrl);
    }

    get likes() {
        return this.get("likes");
    }

    set likes(likes: number) {
        this.set("likes", likes);
    }
}
