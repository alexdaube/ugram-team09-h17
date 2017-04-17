import * as Backbone from "backbone";
import * as $ from "jquery";
import * as _ from "underscore";

import { UserModel } from "../models/UserModel";
import { HeaderRequestGenerator } from "../util/HeaderRequestGenerator";
import { InputValidator } from "../util/InputValidator";
import {API_BASE_URL} from "../constants";

export class UserAddPictureView extends Backbone.View<UserModel> {

    private template: Function;
    private userModel: UserModel;

    constructor(options?: Backbone.ViewOptions<UserModel>) {
        super(_.extend({}, options));
        this.template = require("./UserAddPictureTemplate.ejs") as Function;
        this.userModel = options["model"];
    }

    public render() {
        const that = this;
        this.userModel.fetch({
            beforeSend: HeaderRequestGenerator.sendAuthorization,
            success() {
                that.$el.html(that.template({ userModel: that.userModel }));
                const video: HTMLVideoElement = <HTMLVideoElement> document.getElementById("video");
                if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
                    navigator.mediaDevices.getUserMedia({ video: true }).then((stream) => {
                        video.src = window.URL.createObjectURL(stream);
                        video.play();
                    });
                }
            },
            error() {
                this.$el.html(this.template("No user by that name!"));
            },
        });
        return this;
    }

    public events() {
        return <Backbone.EventsHash> {
            "click #postPictureButton": "postPicture",
            "click .inputSizeSetting textarea": "hideSaveFeedBack",
            "click #snap": "takePicture",
            "change #upload-file-input": "readURL",
            "click #take-snapshot": "take_snapshot",
            "click #sendPhotoButton": "postPictureFromWebcam",
        };
    }

    public close() {
        this.remove();
        this.unbind();
    }

    private postPicture() {
        const description: string = $("#description").val();
        const mentions: string[] = description.match(/@\w+/g);
        const tags: string[] = description.match(/#\w+/g);

        if (InputValidator.containsScriptInjection(description)) {
            $("#textErrorSetting").show();
            $("#textSavePicture").hide();
            $("#textErrorSetting").find("p").text("Script are not authorized");
            return;
        }

        if (InputValidator.isTooLongText(description) || InputValidator.isNullOrEmpty(description)) {
            $("#textErrorPicture").show();
            $("#textSavePicture").hide();
            $("#textErrorPicture").find("p").text("Invalid description");
            return;
        }

        const formData: FormData = new FormData();
        formData.append("description", description);
        formData.append("mentions", mentions);
        formData.append("tags", tags);
        formData.append("file", (<any> $("input[name=file]")[0]).files[0]);
        const filename = $("input[name=file]").val().split("\\").pop();
        if (InputValidator.extensionFileIsValid(filename)) {
            $.ajax({
                url: `${API_BASE_URL}users/${HeaderRequestGenerator.currentUser()}/pictures`,
                type: "POST",
                data: formData,
                processData: false,
                contentType: false,
                cache: false,
                beforeSend: HeaderRequestGenerator.sendAuthorization,
                success() {
                    $("#textSavePicture").show();
                    $("#textErrorPicture").hide();
                    $("#description").val("");
                },
                error() {
                    $("#textErrorPicture").show();
                    $("#textErrorPicture").find("p").text("One or more inputs was invalid");
                    $("#textSavePicture").hide();
                },
            });
        } else {
            $("#textErrorPicture").show();
            $("#textErrorPicture").find("p").text("Extension file is invalid (.jpg .png .gif)");
            $("#textSavePicture").hide();
        }
    }

    private postPictureFromWebcam() {
        const description: string = $("#description").val();
        const mentions: string[] = description.match(/@\w+/g);
        const tags: string[] = description.match(/#\w+/g);

        if (InputValidator.containsScriptInjection(description)) {
            $("#textErrorSettingWebcam").show();
            $("#textSavePictureWebcam").hide();
            $("#textErrorSettingWebcam").find("p").text("Script are not authorized");
            return;
        }

        if (InputValidator.isTooLongText(description) || InputValidator.isNullOrEmpty(description)) {
            $("#textErrorPictureWebcam").show();
            $("#textSavePictureWebcam").hide();
            $("#textErrorPictureWebcam").find("p").text("Invalid description");
            return;
        }

        const formData: FormData = new FormData();
        formData.append("description", description);
        formData.append("mentions", mentions);
        formData.append("tags", tags);
        formData.append("file", (<any> $("input[name=webcam]")[0]).files[0]);
        $.ajax({
            url: `${API_BASE_URL}users/${HeaderRequestGenerator.currentUser()}/pictures`,
            type: "POST",
            data: formData,
            processData: false,
            contentType: false,
            cache: false,
            beforeSend: HeaderRequestGenerator.sendAuthorization,
            success() {
                $("#textSavePictureWebcam").show();
                $("#textErrorPictureWebCam").hide();
                $("#description").val("");
            },
            error() {
                $("#textErrorPictureWebcam").show();
                $("#textErrorPictureWebcam").find("p").text("One or more inputs was invalid");
                $("#textSavePictureWebcam").hide();
            },
        });
    }

    private hideSaveFeedBack() {
        $("#textSavePicture").hide();
        $("#textErrorPicture").hide();
        $("#textSavePictureWebcam").hide();
        $("#textErrorPictureWebcam").hide();
    }

    private takePicture() {
        const canvas: HTMLCanvasElement = <HTMLCanvasElement> document.getElementById("canvas");
        const context = canvas.getContext("2d");
        const video: HTMLVideoElement = <HTMLVideoElement> document.getElementById("video");
        context.drawImage(video, 0, 0, 320, 240);
        const imageData = canvas.toDataURL("image/png");
        $("#image-preview").attr("src", imageData);
        $("#image-preview").removeAttr("hidden");
        canvas.toBlob((blob) => {
            const fileBlob = new File([blob], "webcam.png", {type: "image/png"});
            const webcamInput: HTMLInputElement = <HTMLInputElement> $("input[name=webcam]")[0];
            webcamInput.files[0] = fileBlob;
        });
        $("#textErrorPictureWebcam").hide();
    }

    private readURL(e) {
        const input = e.target;
        if (input.files && input.files[0]) {
            const reader = new FileReader();
            reader.onload = (ev: any) => {
                $("#file-preview").attr("src", ev.target.result);
                $("#file-preview").removeAttr("hidden");
            };

            reader.readAsDataURL(input.files[0]);
        }
    }
}
