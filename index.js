const express = require('express');
const mongoose = require('mongoose');
const keys = require('./config');
require('./models/Todo');

mongoose.connect(keys.mongoURI, {
  useUnifiedTopology: true,
  useNewUrlParser: true
});
// Make Mongoose use `findOneAndUpdate()`. Note that this option is `true`
// by default, you need to set it to false.
mongoose.set('useFindAndModify', false);

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

require('./routes')(app);

const PORT = process.env.PORT || 5000;
app.listen(PORT);
