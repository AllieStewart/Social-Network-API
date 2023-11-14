// Start of JS file
// Thought model.
const { Thought } = require('../models');

const thoughtData = [
    {
        thoughtText: "Here's a cool thought...",
        username: "lernantino",
        userId: "5edff358a0fcb779aa7b118b"
    }
    // add more later
];

const seedThoughts = () => Thought.bulkCreate(thoughtData);

module.exports = seedThoughts;
// End of JS file