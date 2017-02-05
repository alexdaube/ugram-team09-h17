export class InputValidator {

    public static emailAddressIsValid(email: string) {
        const reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return reg.test(email);
    }

    public static phoneIsValid(text: string) {
        const reg = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
        return reg.test(text);
    }

    public static normalInputIsValid(text: string) {
        const reg = /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/;
        return reg.test(text);
    }

    public static extensionFileIsValid(text: string) {
        const reg = /^.*\.(png|PNG|jpg|JPG|jpeg|JPEG|gif|GIF)$/;
        return reg.test(text);
    }

    // public static containsScriptInjection(text: string) {
    //     return (new RegExp("<script").test(text)
    //          || new RegExp("type=").test(text)
    //          || new RegExp("text/javascript").test(text)
    //          || new RegExp("</script").test(text));
    // }
}
