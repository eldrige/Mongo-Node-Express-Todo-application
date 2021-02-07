const express = require('express');
const exphbs = require('express-handlebars');
const todoRoute = require('./routes/todosRoute');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const morgan = require('morgan');
const methodOverride = require('method-override');

const app = express();
const PORT = process.env.PORT || 4500;

mongoose
  .connect('mongodb://localhost/FlashDo', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log(err));

app.use(bodyParser.urlencoded({ extended: false }));
// morgan middleware
app.use(morgan('dev'));
// parse application/json
app.use(bodyParser.json());

app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
// layout, view that wraps around all our other view, eg the boilerplate html
app.set('view engine', 'handlebars');

app.use(methodOverride('_method'));

app.use('/todos', todoRoute);
// method overiride middleware, overirde helps us to create put requests

app.listen(PORT, () => {
  console.log(`App is running on port ${PORT}`);
});

app.get('/', (req, res) => {
  let title = 'Flash todo app';
  res.render('index', {
    title,
  });
});
