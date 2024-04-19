const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema ({

    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true
    },
    repeat_password: {
        type: String,
        required: true
    },
    website:  {
        type: String,
    },
    role: {
        type: String,
        required: true,
        set: function (value) {
          return value.toLowerCase();
        },
        enum: ["job-seeker", "company"],
      },
    image: {
        type: String,
      },
});

const UserModel = mongoose.model("User", UserSchema)
module.exports = UserModel;



