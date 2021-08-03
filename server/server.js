const express = require('express');
const cors = require('cors');
// mongoose helps us connect to mongoDB database
const mongoose = require('mongoose');

// configures environment variables
require('dotenv').config();

// next two lines make the express server
const app = express();
const port = process.env.PORT || 3000;

// next two lines are middleware
// cors middleware
app.use(cors());
// allows us to parse json
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {
    // the next two are used to deal with updates to mongoDB
    useNewUrlParser: true,
    useCreateIndex: true
});
const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB database connection established successfully!");
});

// require the router files
const exercisesRouter = require('./routes/exercises');
const usersRouter = require('./routes/users');

// telling server to use router file
app.use('/exercises', exercisesRouter);
app.use('/users', usersRouter);

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});