// require express router since this is a route we are creating
const router = require('express').Router();
// require the mongoose model
let User = require('../models/user.model');

// first route that takes get requests
router.route('/').get((req, res) => {
    // find is a mongoose method that will return a promise in json format
    User.find()
        .then(users => res.json(users))
        .catch(err => res.status(400).json('Error!: ' + err));
});

router.route('/add').post((req, res) => {
    const username = req.body.username;

    const newUser = new User({username});

    // .save saves the new user to the database
    newUser.save()
        .then(() => res.json('User added!'))
        .catch(err => res.status(400).json('Error!: ' + err));
});

module.exports = router;