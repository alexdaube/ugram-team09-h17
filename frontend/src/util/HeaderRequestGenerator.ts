/* tslint:disable */
export module HeaderRequestGenerator {

    const token = "bearer 24d6e087-51a0-465a-a19b-ce9570ad3169";

    export function setContentTypeToJSON(xhr){
        console.log("contentTypeJSON");
        xhr.setRequestHeader("Content-Type", ("application/json"));
        xhr.setRequestHeader("Authorization", token);
    }

    export function setContentTypeToURLEncoded(xhr) {
        xhr.setRequestHeader("Content-Type", ("application/x-www-form-urlencoded"));
        xhr.setRequestHeader("Authorization", token);
    }
}
