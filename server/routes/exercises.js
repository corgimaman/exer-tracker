// require express router since this is a route we are creating
const router = require('express').Router();
// require the mongoose model
let Exercise = require('../models/exercise.model');

// first route that takes get requests
router.route('/').get((req, res) => {
    // find is a mongoose method that will return a promise in json format
    Exercise.find()
        .then(exercises => res.json(exercises))
        .catch(err => res.status(400).json('Error!: ' + err));
});

router.route('/add').post((req, res) => {
    // assign req to variables
    const username = req.body.username;
    const description = req.body.description;
    const duration = Number(req.body.duration);
    const date = Date.parse(req.body.date);

    // create new exercise using variables
    const newExercise = new Exercise({
        username,
        description,
        duration,
        date
    });

    // .save saves the new exercise to the database
    newExercise.save()
        .then(() => res.json('Exercise added!'))
        .catch(err => res.status(400).json('Error!: ' + err));
});

// return info about a single exercise
router.route('/:id').get((req, res) => {
    Exercise.findById(req.params.id)
        .then(exercise => res.json(exercise))
        .catch(err => res.status(400).json('Error! ' + err));
});

// delete exercise by id
router.route('/:id').delete((req, res) => {
    Exercise.findByIdAndDelete(req.params.id)
        .then(() => res.json('Exercise deleted.'))
        .catch(err => res.status(400).json('Error! ' + err));
});

// update exercise by id
router.route('/update/:id').post((req, res) => {
    Exercise.findById(req.params.id)
        .then(exercise => {
            exercise.username = req.body.username;
            exercise.description = req.body.description;
            exercise.duration = Number(req.body.duration);
            exercise.date = Date.parse(req.body.date);

            exercise.save()
                .then(() => res.json('Exercise updated!'))
                .catch(err => res.status(400).json('Error!: ' + err));
        })
        .catch(err => res.status(400).json('Error! ' + err));
});

module.exports = router;