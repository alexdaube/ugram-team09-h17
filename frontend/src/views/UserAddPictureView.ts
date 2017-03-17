import * as Backbone from "backbone";
import * as $ from "jquery";
import * as _ from "underscore";

import { UserModel } from "../models/UserModel";
import { HeaderRequestGenerator } from "../util/HeaderRequestGenerator";
import { InputFormatter } from "../util/InputFormatter";
import { InputValidator } from "../util/InputValidator";

export class UserAddPictureView extends Backbone.View<UserModel> {

    private template: Function;
    private userModel: UserModel;

    constructor(options?: Backbone.ViewOptions<UserModel>) {
        super(_.extend({ el: "#content" }, options));
        this.template = require("./UserAddPictureTemplate.ejs") as Function;
        this.userModel = options["model"];
    }

    public render() {
        const that = this;
        this.userModel.fetch({
            success() {
                that.$el.html(that.template({ userModel: that.userModel }));
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
        };
    }

    private postPicture() {
        const description: string = $("#description").val();
        const mentions: string[] = description.match(/@\w+/g);
        const tags: string[] = description.match(/#\w+/g);

        if (InputValidator.containsScriptInjection(description)) {
            $("#textErrorSetting").show();
            $("#textErrorSetting").find("p").text("Script are not authorized");
            return;
        }

        if (InputValidator.isTooLongText(description) || InputValidator.isNullOrEmpty(description)) {
            $("#textErrorPicture").show();
            $("#textErrorPicture").find("p").text("Invalid description");
            return;
        }

        const formData: FormData = new FormData();
        formData.append("description", description);
        formData.append("mentions", mentions);
        formData.append("tags", tags);
        formData.append("file", (<any> $("input[type=file]")[0]).files[0]);
        const filename = $("input[type=file]").val().split("\\").pop();

        if (InputValidator.extensionFileIsValid(filename)) {
            $.ajax({
                // url: "http://api.ugram.net/users/" + HeaderRequestGenerator.userId + "/pictures",
                url: "http://localhost:3000/users/" + HeaderRequestGenerator.userId + "/pictures",
                type: "POST",
                data: formData,
                processData: false,
                contentType: false,
                cache: false,
                beforeSend: HeaderRequestGenerator.sendAuthorization,
                success() {
                    $("#textSavePicture").show();
                    $("#textErrorPicture").hide();
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

    private hideSaveFeedBack() {
        $("#textSavePicture").hide();
        $("#textErrorPicture").hide();
    }
}
