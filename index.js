// const http = require('http');
const express = require('express');
// const server = http.createServer((req, res) => {});
const app = express();

app.get('/', (req, res) => {
  console.log('yep got a GET request');
  res.send('Hey Builders!');
});

app.post('/', (req, res) => {
  res.send('Hey Builders that was a POST request!');
});

app.get('/cats', (req, res) => {
  res.send('Cats live here!');
});

app.get('/cats/oakley', (req, res) => {
  res.send('Shhhh. Oakley is sleeping!');
});
app.get('/cats/milla', (req, res) => {
  res.send('Go ahead and yell. she is deaf anyway!');
});

app.get('*', (req, res) => {
  res.send('We do not have any of those');
});

// server.listen(3000);
app.listen(3000, () => {
  console.log('Running on port 3000');
});