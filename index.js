// const http = require('http');
const express = require('express');
// const server = http.createServer((req, res) => {});
const app = express();
app.use(express.static('public'));

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));

const posts = require('./routes/posts');
app.use(posts);

app.listen(3000, () => {
  console.log('Running on port 3000');
});

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
