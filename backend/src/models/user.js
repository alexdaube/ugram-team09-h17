const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');


//  TODO THIS WILL NEED TO BE CHANGED FROM MONGOOSE TO BOOKSHELF...

// Define our model
const userSchema = new Schema({
    ugramId: {type: String, unique: true, required: true},
    email: {type: String, lowercase: true, required: true},
    password: {type: String, required: true},
    firstName: String,
    lastName: String,
    phoneNumber: Number,
    pictureUrl: String,
    registrationDate: Date,
    //images: [{ type: Schema.Types.ObjectId, ref: 'image' }]
});

// On Save Hook, encrypt password
// Before saving a model, run this function
userSchema.pre('save', (next) => {
    // get access to the user model
    const user = this;

    // generate a salt then run callback
    bcrypt.genSalt(10, (err, salt) => {
        if (err) {
            return next(err);
        }

        // hash (encrypt) our password using the salt
        bcrypt.hash(user.password, salt, null, (err, hash) => {
            if (err) {
                return next(err);
            }

            // overwrite plain text password with encrypted password
            user.password = hash;
            next();
        });
    });
});

userSchema.methods.comparePassword = (candidatePassword, callback) => {
    bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
        if (err) {
            return callback(err);
        }

        callback(null, isMatch);
    });
};

// Create the model class
const ModelClass = mongoose.model('user', userSchema);

// Export the model
module.exports = ModelClass;
