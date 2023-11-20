// Start of JS file
// UserRoutes for GET, POST, PUT, DELETE of users.
const router = require('express').Router();
const { User, Thought } = require('../../models');

// GET all users
router.get('/', async (req, res) => {
    await User.findAll({
            attributes: { exclude: ['[password'] }
        })
        .then(userData => res.json(userData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
  });
  
  // GET user by id
  router.get('/:id', async (req, res) => {
    await User.findOne({
            attributes: { exclude: ['password'] },
            where: {
                id: req.params.id
            },
            include: [{
                    model: Post,
                    attributes: [
                        'id',
                        'title',
                        'content',
                        'created_at'
                    ]
                },
                {
                    model: Comment,
                    attributes: ['id', 'text', 'created_at'],
                    include: {
                        model: Post,
                        attributes: ['title']
                    }
                },
                {
                    model: Post,
                    attributes: ['title'],
                }
            ]
        })
        .then(userData => {
            if (!userData) {
                res.status(404).json({ message: 'No user found with this id.' });
                return;
            }
            res.json(userData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
  });

  // CREATE new user
router.post('/', async (req, res) => {
    await User.create({
        username: req.body.username,
        password: req.body.password
    }).then(userData => {
            req.session.save(() => {
                req.session.user_id = userData.id;
                req.session.username = userData.username;
                req.session.loggedIn = true;
  
                res.json(userData);
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
  });
  
  // UPDATE User by id
  router.put('/:id', async (req, res) => {
    await User.update(req.body, {
            individualHooks: true,
            where: {
                id: req.params.id
            }
        }).then(userData => {
            if (!userData[0]) {
                res.status(404).json({ message: 'No user found with this id.' });
                return;
            }
            res.json(userData);
        }).catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
  });
  
  // DELETE User by id
  router.delete('/:id', async (req, res) => {
    await User.destroy({
            where: {
                id: req.params.id
            }
        }).then(userData => {
            if (!userData) {
                res.status(404).json({ message: 'No user found with this id.' });
                return;
            }
            res.json(userData);
        }).catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
  });
  
  module.exports = router;
  // End of JS file
  // (Placeholder)