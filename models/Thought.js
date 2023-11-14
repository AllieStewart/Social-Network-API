// Start of JS file
// Thought model for application.
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
// change these to Mongoose

class Thought extends Model {}

Thought.init(
    {
        thoughtText: {
            type: DataTypes.STRING,
            allowNull: false, // required?
            // between 1 - 280 characters
        },
        createdAt: {
            type: DataTypes.DATE,
            // default value to current timestamp,
            // getter method to format timestamp on query
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false, // required?
            references: {
                model: 'user',
                key: 'id' // maybe?
            }
        },
        reactions: {
            // array of nested documents created with Reaction schema
        }
        // ThoughtSchema -> Create a virtual called "reactionCount" that retrieves the 
        // length of the thought's "reactions" array field on query.
    },
    {
        sequelize, // Mongoooooose
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'thought',
    }
);

module.exports = Thought;
// End of Js file