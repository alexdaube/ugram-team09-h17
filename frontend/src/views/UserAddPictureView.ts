import * as Backbone from "backbone";
import * as $ from "jquery";
import * as _ from "underscore";

import {UserModel} from "../models/UserModel";
import {HeaderRequestGenerator} from "../util/HeaderRequestGenerator";
import {InputFormatter} from "../util/InputFormatter";
import {InputValidator} from "../util/InputValidator";

export class UserAddPictureView extends Backbone.View<UserModel> {

    private template: Function;
    private userModel: UserModel;

    constructor(options?: Backbone.ViewOptions<UserModel>) {
        super(_.extend({el: "#content"}, options));
        this.template = require("./UserAddPictureTemplate.ejs") as Function;
        this.userModel = options["model"];
    }

    public render() {
        const that = this;
        this.userModel.fetch({
            success() {
                that.$el.html(that.template({userModel: that.userModel}));
            },
            error() {
                // TODO Handle error
            },
        });
        return this;
    }

    public events() {
        return <Backbone.EventsHash> {
            "click #postPictureButton": "postPicture",
            "click .inputSizeSetting input": "hideSaveFeedBack",
        };
    }

    private postPicture() {
        const description: string = $("#description").val();
        const mentions: string[] = description.match(/@\w+/g);
        const tags: string[] = description.match(/#\w+/g);

        // if (InputValidator.containsScriptInjection(description)) {
        //     $("#textErrorSetting").show();
        //     $("#textErrorSetting").find("p").text("Script are not authorized");
        //     return;
        // }

        // TODO validate .jpg .jpeg .png .gif only
        //  if (!InputValidator.extensionFileIsValid(file)) {
        //      //$("#textErrorSetting").show();
        //      //$("#textErrorSetting").find("p").text("Invalid file extension");
        //      //return;
        //      alert("oui");
        //  }
        //  else {
        //      alert("non");
        //  }

        const formData: FormData = new FormData();
        formData.append("description", description);
        formData.append("mentions", mentions);
        formData.append("tags", tags);
        formData.append("file", (<any> $("input[type=file]")[0]).files[0]);
        $.ajax({
            url: "http://api.ugram.net/users/" + HeaderRequestGenerator.userId + "/pictures",
            type: "POST",
            data: formData,
            processData: false,
            contentType: false,
            cache: false,
            beforeSend: HeaderRequestGenerator.sendAuthorization,
        }).done(() => {
            $("#textSavePicture").show();
            $("#textErrorPicture").hide();
        }).fail(() => {
            $("#textErrorPicture").show();
            $("#textSavePicture").hide();
        });
    }

    private hideSaveFeedBack() {
        $("#textSavePicture").hide();
        $("#textErrorPicture").hide();
    }
}
