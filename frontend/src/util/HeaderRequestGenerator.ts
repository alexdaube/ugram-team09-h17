
export class HeaderRequestGenerator {

    static token: string = "bearer 24d6e087-51a0-465a-a19b-ce9570ad3169";

    static setContentTypeToJSON(xhr) {
        xhr.setRequestHeader("Content-Type", ("application/json"));
        xhr.setRequestHeader("Authorization", HeaderRequestGenerator.token);
    }

    static setContentTypeToURLEncoded(xhr) {
        xhr.setRequestHeader("Content-Type", ("application/x-www-form-urlencoded"));
        xhr.setRequestHeader("Authorization", HeaderRequestGenerator.token);
    }
}
