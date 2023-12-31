// Start of JS file
// Controller for User model and Friends.
const { Thought, User } = require('../models');

module.exports = {
// GET all users
  async getUsers(req, res) {
    try {
      const users = await User.find()
      .populate('thoughts')
      .populate('friends')
      .select('-__v');
      res.json(users);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
// GET a user
  async getSingleUser(req, res) {
    try {
      const user = await User.findOne({ _id: req.params.userId })
      .populate('thoughts')
      .populate('friends')
      .select('-__v');
      if (!user) {
        return res.status(404).json({ message: 'No user with that ID :(' })
      }
      res.json(user);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
// CREATE a new user
  async createUser(req, res) {
    try {
      const user = await User.create(req.body);
      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
// UPDATE a user
  async updateUser(req, res) {
    try {
      const user = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $set: req.body },
        { runValidators: true, new: true }
      );
      if (!user) {
        res.status(404).json({ message: 'No user with that ID :(' });
      }
      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
// DELETE user and remove their thoughts
  async deleteUser(req, res) {
    try {
      const user = await User.findOneAndDelete({ _id: req.params.userId });
      if (!user) {
        return res.status(404).json({ message: 'No such user exists' });
      }
      // await Thought.deleteMany({_id: { $in: user.thoughts }});
      const thought = await Thought.findOneAndUpdate(
        { users: req.params.userId },
        { $pull: { users: req.params.userId } },
        { new: true }
      );
      if (!thought) {
        return res.status(404).json({
          message: 'User deleted, but no thoughts found',
        });
      }
      res.json({ message: 'User and thoughts successfully deleted' });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
// ADD friend to user
  async addFriend(req, res) {
    console.log('You are adding a friend');
    try {
      const friend = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $addToSet: { friends: req.params.friendId } },
        { runValidators: true, new: true }
      );
      if (!friend) {
        return res
          .status(404)
          .json({ message: 'No user found with that ID :(' });
      }
      res.json(friend);
    } catch (err) {
      res.status(500).json(err);
    }
  },
// REMOVE friend from a user
  async removeFriend(req, res) {
    try {
      const friend = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $pull: { friends: req.params.friendId } },
        { runValidators: true, new: true }
      );
      if (!friend) {
        return res
          .status(404)
          .json({ message: 'No user found with that ID :(' });
      }
      res.json(friend);
    } catch (err) {
      res.status(500).json(err);
    }
  },
};
// End of JS file