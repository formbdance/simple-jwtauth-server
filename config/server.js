const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const usersRouter = require("../src/routes/users")
require('dotenv').config();

const URL = "mongodb://localhost:27017/Movies"

const app = express();

app.use(bodyParser.json());
app.use(cors());
app.use("/users", usersRouter)

mongoose
    .connect(URL)
    .then(() => console.log(`Connected to MongoDB`))
    .catch((err) => console.log(`DB connection error: ${err}`))
    
module.exports = app