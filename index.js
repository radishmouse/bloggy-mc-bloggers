// const http = require('http');
const express = require('express');
// const server = http.createServer((req, res) => {});
const app = express();
app.use(express.static('public'));

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));

const posts = require('./routes/posts');
app.use(posts);

const expressHbs = require('express-handlebars');

app.engine('.hbs', expressHbs({defaultLayout: 'layout', extname: '.hbs'}));
app.set('view engine', '.hbs');

const User = require('./models/user');

const passport = require('passport');
const GitHubStrategy = require('passport-github').Strategy;
passport.use(new GitHubStrategy({
    clientID: "c4b8b0266bbccb3b4e7d",
    clientSecret: "a5c3dc999326b2783da5c02bf92f417dc33cab46",
    callbackURL: "http://localhost:3000/github/auth"
  }, (accessToken, refreshToken, profile, cb) => {
    // TODO: update to work with User model
    User.findOrCreate({where: { githubid: profile.id }})
      .then(user => {
        return cb(null, user.id);
      })
      .catch(err => {
        cb(err, null);
      })
  }
));


app.get('/login', passport.authenticate('github'));
app.get('/github/auth',
  passport.authenticate('github', { failureRedirect: '/login' }),
  (req, res) => {
    // Successful authentication, redirect to the blog
    res.redirect('/');
  });


  passport.serializeUser((user, cb) => {
    cb(null, user);
  });

  passport.deserializeUser((clientID, cb) => {
    User.find({where: {id: id}})
      .then((user) => {
        cb(null, user);
      })
      .error(function(err){
        cb(err, null);
      });
  });


const cookieParser = require('cookie-parser')
app.use(cookieParser());
app.use(require('express-session')({
  secret: 'super-random-string',
  resave: true,
  saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());
app.listen(3000, () => {
  console.log('Running on port 3000');
});

// app.get('/please-work', (req, res) => {
//   res.render('home', {
//     title: "yay it worked"
//   })
// })
// const Post = require('./models/post');

// app.use((req, res, next) => {
//   console.log(`Got a Request: ${req.path}`);
//   next();
// });

// app.get('/', (req, res) => {
//   console.log('In the main route!');
//   console.log('yep got a GET request');
//   // res.send('Hey Builders!');
//   Post.findOne({
//     where: {
//       id: 1
//     }
//   })
//     .then(post => {
//       res.send(`<h1>${post.title}</h1>
//       <br>
//       <p>${post.content}</p>`);
//     });
// });

// app.post('/', (req, res) => {
//   res.send('Hey Builders that was a POST request!');
// });

// app.get('/cats', (req, res) => {
//   res.send('Cats live here!');
// });

// app.get('/cats/oakley', (req, res) => {
//   res.send('Shhhh. Oakley is sleeping!');
// });
// app.get('/cats/milla', (req, res) => {
//   res.send('Go ahead and yell. she is deaf anyway!');
// });

// app.get('*', (req, res) => {
//   res.send('We do not have any of those');
// });

// server.listen(3000);
