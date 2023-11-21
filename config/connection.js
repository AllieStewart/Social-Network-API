// Start of JS file
// Connection using Mongoose.
const { connect, connection } = require('mongoose');

const connectionString =
  process.env.MONGODB_URI || 'mongodb+srv://root:wryipsfhkzcbm@cluster0.72mmbgv.mongodb.net/';

connect(connectionString);

module.exports = connection;
// End of JS file