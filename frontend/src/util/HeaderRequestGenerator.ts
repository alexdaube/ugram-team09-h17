import * as jwt_decode from "jwt-decode";

export class HeaderRequestGenerator {

    public static currentUser(): string {
        const token = localStorage.getItem("token");
        const decoded = jwt_decode(token);
        const currentUser = decoded.sub.userName;
        return currentUser;
    }

    public static setContentTypeToJSON(xhr) {
        xhr.setRequestHeader("Content-Type", ("application/json"));
        xhr.setRequestHeader("Authorization", localStorage.getItem("token"));
    }

    public static sendAuthorization(xhr) {
        xhr.setRequestHeader("Authorization", localStorage.getItem("token"));
    }

    public static setContentTypeToURLEncoded(xhr) {
        xhr.setRequestHeader("Content-Type", ("application/x-www-form-urlencoded"));
        xhr.setRequestHeader("Authorization", localStorage.getItem("token"));
    }

    public static isConnectedUser(userId: string): boolean {
        return  this.currentUser() === userId;
    }

    // private static token: string = "bearer 24d6e087-51a0-465a-a19b-ce9570ad3169";
    private static token: string = localStorage.getItem("token");
}
