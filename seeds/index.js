// Start of JS file
// Index to seed the database,
// takes seed data from other files in /seeds.
const seedUsers = require('./userData.js');
const seedThoughts = require('./thoughtData.js');

const sequelize = require('../config/connection');
// change to MongoDB/Mongoose

const seedDatabase = async () => {
  await sequelize.sync({ force: true });
  // change to MongoDB/Mongoose

  await seedUsers();
  console.log("---USERS SEEDED---");

  await seedThoughts();
  console.log("---THOUGHTS SEEDED---");

  process.exit(0);
};

seedDatabase();
// End of JS file