const express = require('express');
const config = require('./config');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');



require('dotenv').config();

const app = express();
const port = process.env.PORT || 6060;

app.use(cors());
app.use(bodyParser.json());

const mongodbUrl = config.MONGODB_URL;
mongoose.connect(process.env.MONGODB_URI || mongodbUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
}).catch(error => console.log(error.reason));


const timersRouter = require('./routes/timers');
const usersRouter = require('./routes/users');
const bodyParser = require('body-parser');

app.use('/timers', timersRouter);
app.use('/users', usersRouter);

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});