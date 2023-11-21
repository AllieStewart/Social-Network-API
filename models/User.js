// Start of JS file
// User model for application.
const { Schema, models } = require('mongoose');
const thoughtSchema = require('./Thought');

const userSchema = new Schema(
    {
        username: {
            type: DataTypes.STRING,
            required: true,
            unique: true,
            // trimmed
        },
        email: {
            type: DataTypes.STRING,
            required: true,
            unique: true,
            // match valid email address
        },
        // thoughts: {
        //     // array of _id values
        //     references: {
        //         model: 'thought',
        //         key: 'id' // maybe?
        //     }
        thoughts: [thoughtSchema],
        //},
        friends: {
            // array of _id values
            references: {
                model: 'user',
                key: 'id' // maybe?
            }
        }
        // UserSchema -> Create a virtual called "friendCount" that retrieves the 
        // length of the user's "friends" array field on query.
    },
    {
    toJSON: {
        virtuals: true,
      },
      id: false,
    }
);

const User = model('user', userSchema);

module.exports = User;
// End of JS file