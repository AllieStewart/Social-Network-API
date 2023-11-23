// Start of JS file
// Controller for Thought model and Reaction schema.
const { Thought, User } = require('../models');

module.exports = {
// GET all thoughts
  async getThoughts(req, res) {
    try {
      const thought = await Thought.find();
      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },
// GET a thought
  async getSingleThought(req, res) {
    try {
      const thought = await Thought.findOne({ _id: req.params.thoughtId })
        .select('-__v');
      if (!thought) {
        return res.status(404).json({ message: 'No thought found with that ID :(' });
      }
      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },
// CREATE a thought
  async createThought(req, res) {
    try {
      const thought = await Thought.create(req.body);
      const user = await User.findOneAndUpdate(
        { _id: req.body.userId },
        { $push: { thoughts: _id } },
        { new: true }
      );
      res.json({thought, user});
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
// UPDATE a thought
  async updateThought(req, res) {
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $set: req.body },
        { runValidators: true, new: true }
      );
      if (!thought) {
        res.status(404).json({ message: 'No thought found with that ID :(' });
      }
      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },
// DELETE a thought
async deleteThought(req, res) {
  try {
    const thought = await Thought.findOneAndDelete({ _id: req.params.thoughtId });
    
    if (!thought) {
      res.status(404).json({ message: 'No thought found with that ID :(' });
    }
    await User.deleteMany({ _id: { $in: thought.users } });
    res.json({ message: 'Thought and reactions deleted!' });
  } catch (err) {
    res.status(500).json(err);
  }
},
// ADD reaction to user
  async addReaction(req, res) {
    console.log('You are adding a reaction');
    try {
      const reaction = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $addToSet: { reactions: req.body } },
        { runValidators: true }
      );
      if (!reaction) {
        return res
          .status(404)
          .json({ message: 'No thought found with that ID :(' });
      }
      res.json(reaction);
    } catch (err) {
      res.status(500).json(err);
    }
  },
// REMOVE reaction from a user
  async removeReaction(req, res) {
    try {
      const reaction = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $pull: { reactions: { reactionId: req.params.reactionId } } },
        { runValidators: true, new: true }
      );
      if (!reaction) {
        return res
          .status(404)
          .json({ message: 'No reaction found with that ID :(' });
      }
      res.json(reaction);
    } catch (err) {
      res.status(500).json(err);
    }
  },
};
// End of JS file