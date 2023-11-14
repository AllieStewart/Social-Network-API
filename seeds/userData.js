// Start of JS file
// User model.
const { User } = require('../models');

const userData = [
    {
        username: "lernantino",
        email: "lernantino@gmail.com"
    }
    // add more later
];

const seedUsers = () => User.bulkCreate(userData);

module.exports = seedUsers;
// End of JS file