const express = require('express');
const path = require('path');
const nunjucks = require('nunjucks');
const models = require('./models');
const morgan = require('morgan');
const bodyParser = require('body-parser');
// const bootstrap = require('bootstrap');
const app = express();

app.use(morgan('tiny'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.set('view engine', 'html');
app.engine('html', nunjucks.render);
nunjucks.configure('views', { nocache: true })

app.use('/public', express.static(path.join(__dirname, 'public')));
app.use('/bootstrap', express.static(path.join(__dirname, 'node_modules/bootstrap/dist')));
app.use('/jquery', express.static(path.join(__dirname, 'node_modules/jquery/dist')));

app.get('/', (req, res, next) => {
  Promise.all([models.Restaurant.findAll(), models.Hotel.findAll(), models.Activity.findAll()])
    .then(result => {
      res.render('index', {restaurants: result[0], hotels: result[1], activities: result[2]})
    })
});

app.use((req, res, next) => {
  const error = new Error('page not found');
  error.status = 404;
  next(error);
});

app.use((err, req, res, next) => {
  res.status(err.status || 500).render('error', { error: err });
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});

