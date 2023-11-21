// Start of JS file
// Thought model for application.
const { Schema, models } = require('mongoose');

const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: DataTypes.STRING,
            required: true,
            min_length: 1,
            max_length: 280,
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
        toJSON: {
            virtuals: true,
        },
        id: false,
    }
);

module.exports = thoughtSchema;
// End of Js file