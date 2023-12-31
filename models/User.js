// Start of JS file
// User model for application.
const { Schema, model } = require('mongoose');

// User schema for users.
const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            match: [
                /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                "Please type in a valid email address",
              ],
        },
        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Thought',
            },
        ],
        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User',
            }
        ],
    },
    {
    toJSON: {
        virtuals: true,
      },
      id: false,
    }
);

// UserSchema -> Create a virtual called "friendCount" that retrieves the 
// length of the user's "friends" array field on query.
userSchema.virtual('friendCount')
.get(function () {
    return this.friends.length;
});

const User = model('User', userSchema);

module.exports = User;
// End of JS file