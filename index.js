// const http = require('http');
const express = require('express');
// const server = http.createServer((req, res) => {});
const bodyParser = require('body-parser');
const expressHbs = require('express-handlebars');
const setupAuth = require('./auth');

const posts = require('./routes/posts');

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));

app.engine('.hbs', expressHbs({defaultLayout: 'layout', extname: '.hbs'}));
app.set('view engine', '.hbs');

// Setup auth *before* registering *any* other routes.
setupAuth(app);

// Home page
app.get('/', (req, res) => {
  console.log('are we logged in');
  console.log(req.isAuthenticated());
  if (req.isAuthenticated() && req.session && req.session.passport) {
    console.log(`req.session.passport.user: ${req.session.passport.user}`);
  }
  res.render('home', {
    title: "yay it worked"
  })
});


// Definitely put your authenticated routes *after* auth setup
app.use(posts);


// Put your static middleware after all dynamic ones.
app.use(express.static('public'));

app.listen(3000, () => {
  console.log('Running on port 3000');
});

