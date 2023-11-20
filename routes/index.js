// Start of JS file
// Index for routes.
const router = require('express').Router();

const apiRoutes = require('./api');
//const homeRoutes = require('./homeRoutes.js');

//router.use('/', homeRoutes);
router.use('/api', apiRoutes);

router.use((req, res) => res.send('Wrong route!'));

module.exports = router;
// End of JS file