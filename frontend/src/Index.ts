
import {UserProfileView} from "./views/UserProfileView";
import {UserProfileModel} from "./models/UserProfileModel";

// $(document).ready(() => {
//     let helloWorldModel = new HelloWorldModel({
//         firstname: 'GLO-3120',
//         lastname: 'WEB'
//     });

//     let helloWorldView = new HelloWorldView({
//         model: helloWorldModel
//     });

//     helloWorldView.render();
// });

$(document).ready(() => {
    // let userProfileModel = new UserProfileModel({
    //         userName: "LadiesMan69",
    //         firstName: "Léandre",
    //         lastName: "Noël",
    //         email: "ladiesMan69@FHRITP.com",
    //         phoneNumber: "696-969-1337",
    //         inscriptionDate: "2000-01-01"
    // });

    let userProfileModel = new UserProfileModel();

    let userProfileView = new UserProfileView({
        model: userProfileModel
    });

    userProfileView.render();
});
