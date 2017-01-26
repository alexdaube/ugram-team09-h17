import {HelloWorldView} from './views/HelloWorldView'
import {HelloWorldModel} from './models/HelloWorldModel';
import {UserView} from './views/UserView';
import {UserModel} from './models/UserModel';
import {UserCollection} from './collections/UserCollection';

$(document).ready(() => {
    let helloWorldModel = new HelloWorldModel({
        firstname: 'GLO-3120',
        lastname: 'WEB'
    });

    let helloWorldView = new HelloWorldView({
        model: helloWorldModel
    });

    helloWorldView.render();
    let users = new UserCollection();
    users.fetch({
        success: function (usersResponse) {
            console.log(usersResponse);
        }
    });
    for(var i = 0; i < users.models.length; ++i) {
        var userView = new UserView({model: users.model.at(i)});
        users.$el.append(userView.$el);
        userView.render();
    }
    let user = new UserModel({
        id: 'wfortin'
    });
    user.fetch({
        success: function (userResponse) {
            let userView = new UserView({
                model: userResponse
            });
            userView.render();
        }
    });
});
