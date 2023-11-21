// Start of JS file
// Connection using Mongoose.
const { connect, connection } = require('mongoose');

const connectionString =
  process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/socialNetworkDB';

connect(connectionString);

module.exports = connection;
// End of JS file