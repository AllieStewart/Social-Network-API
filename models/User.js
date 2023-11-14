// Start of JS file
// User model for application.
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
// change these to Mongoose

class User extends Model {}

User.init(
    {
        username: {
            type: DataTypes.STRING,
            allowNull: false, // required?
            unique: true,
            // trimmed
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false, // required?
            unique: true,
            // match valid email address
        },
        thoughts: {
            // array of _id values
            references: {
                model: 'thought',
                key: 'id' // maybe?
            }
        },
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
        sequelize, // Mongoooooose
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'user',
    }
);

module.exports = User;
// End of JS file