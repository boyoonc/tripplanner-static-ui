const express = require('express');
const path = require('path');
const nunjucks = require('nunjucks');
const models = require('./models');
const morgan = require('morgan');
const body_parser = require('body-parser');

const app = express();

app.use(morgan('tiny'))
app.use(body_parser.urlencoded({ extended: false }))
app.use(body_parser.json())

app.set('view engine', 'html');
app.engine('html', nunjucks.render);
nunjucks.configure('views', { nocache: true })

app.use('/public', express.static(path.join(__dirname, 'public')));


app.get('/', (req, res, next) => {
  res.render('index');
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
models.sync()
  .then(() => {
    console.log('hello');
    return models.seed()
      .then(() => {
        console.log('seeded');
        app.listen(port, () => {
          console.log(`listening on port ${port}`);
        });
      });
  });
