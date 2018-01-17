// const http = require('http');
const express = require('express');
// const server = http.createServer((req, res) => {});
const app = express();


const cookieParser = require('cookie-parser')
app.use(cookieParser());

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));



const expressHbs = require('express-handlebars');

app.engine('.hbs', expressHbs({defaultLayout: 'layout', extname: '.hbs'}));
app.set('view engine', '.hbs');


// const passport = require('passport');
// const session = require('express-session');
// app.use(session({secret: 'abcdefg'}));
// app.use(passport.initialize());

// app.use(passport.session());


// const User = require('./models/user');
// const GitHubStrategy = require('passport-github').Strategy;

// passport.use(new GitHubStrategy({
//     clientID: "c4b8b0266bbccb3b4e7d",
//     clientSecret: "a5c3dc999326b2783da5c02bf92f417dc33cab46",
//     callbackURL: "http://localhost:3000/github/auth"
//   }, (accessToken, refreshToken, profile, cb) => {

//     User.findOrCreate({where: {
//       githubid: profile.id
//     }})
//     .then(user => {
//       console.log('in the .then');
//       console.log(user);
//       console.log(user[0].id);
//       return cb(null, user[0].id);
//     })
//     .catch(err => {
//       console.log('that did not work')
//       cb(err, null);
//     })
//   }
// ));


// passport.serializeUser((id, cb) => {
//   console.log('serializing');
//   debugger;
//   cb(null, id);

// });

// passport.deserializeUser((id, cb) => {
//   User.findOne({where: {id: id}}).then((user, cb) => {
//     console.log('deserializing');
//     console.log(user);
//     console.log(user[0].id);
//     return cb(null, user[0].id);
//   });
// });


// ============
const User = require('./models/user');
const passport = require('passport');
// Express and Passport Session
const session = require('express-session');
app.use(session({
  secret: 'keyboard cat',
  resave: true,
  saveUninitialized: true
}));


var GithubStrategy = require('passport-github').Strategy;

passport.use(new GithubStrategy({
  clientID: "c4b8b0266bbccb3b4e7d",
  clientSecret: "a5c3dc999326b2783da5c02bf92f417dc33cab46",
  callbackURL: "http://localhost:3000/github/auth"
},
  function(accessToken, refreshToken, profile, done) {
        // placeholder for translating profile into your own custom user object.
    //     // for now we will just use the profile object returned by GitHub


    User.findOrCreate({where: {
      githubid: profile.id
    }})
    .then(result => {
      let user = result[0];
      console.log('in the .then');
      console.log(user);
      // console.log(user[0].id);
      // return done(null, user[0].id);
      return done(null, user);
    })
    .catch(err => {
      console.log('that did not work')
      done(err, null);
    })

  }
));
passport.serializeUser(function(user, done) {
  // placeholder for custom user serialization
  // null is for errors
  console.log('we are serializing');
  console.log(user);
  done(null, user.id);

});

passport.deserializeUser(function(user, done) {
  console.log('we are deserializing');
  // placeholder for custom user deserialization.
  // maybe you are going to get the user from mongo by id?
  // null is for errors
  console.log(user);
  done(null, user);
});

app.use(passport.initialize());
app.use(passport.session());

function ensureAuthenticated(req, res, next) {
  debugger;
  if (req.isAuthenticated()) {
    // req.user is available for use here
    return next();
  }

    // denied. redirect to login
  res.redirect('/login');
}


app.get('/login', passport.authenticate('github'));
app.get('/logout', function(req, res, next) {
  console.log('logging out');
  req.logout();
  res.redirect('/');
});

// ok, here it is.
// if you don't have your own route handler after the passport.authenticate middleware
// then you get stuck in the infinite loop
// but wait. how do i now get to the blog?
app.get('/github/auth',passport.authenticate('github', { failureRedirect: '/login' }),
  function(req, res) {


    console.log('you just logged in');
    console.log(req.isAuthenticated());

    res.redirect('/');
  }
);
app.get('/', (req, res) => {

  console.log('are we logged in');
  console.log(req.isAuthenticated());
  res.render('home', {
    title: "yay it worked"
  })
})

const posts = require('./routes/posts');
app.use(posts);
app.use(express.static('public'));

app.listen(3000, () => {
  console.log('Running on port 3000');
});




// app.use(passport.session());

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
