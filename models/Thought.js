// Start of JS file
// Thought model for application.
const { Schema, model } = require('mongoose');
const dayjs = require('dayjs');

// Reaction schema for reactions.
const reactionSchema = new Schema(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId(),
        },
        reactionBody: {
            type: String,
            required: true,
            maxlength: 280,
        },
        username: {
            type: String,
            required: true,
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: queryTime => dayjs(queryTime).format('MMM DD, YYYY [at] hh:mm a'),
        },
    },
    {
        toJSON: {
            virtuals: true,
            getters: true,
        },
        id: false,
    }
);

// Thought schema for thoughts.
const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            min_length: 1,
            max_length: 280,
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: queryTime => dayjs(queryTime).format('MMM DD, YYYY [at] hh:mm a'),
        },
        username: {
            type: String,
            required: true,
        },
        reactions: [reactionSchema],
    },
    {
        toJSON: {
            virtuals: true,
            getters: true,
        },
        id: false,
    }
);

// ThoughtSchema -> Create a virtual called "reactionCount" that retrieves the 
// length of the thought's "reactions" array field on query.
thoughtSchema.virtual('reactionCount')
.get(function() {
    return this.reactions.length;
});

const Thought = model('thought', thoughtSchema);

module.exports = Thought;
// End of Js file