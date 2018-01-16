const express = require('express');
const router = express.Router();

const Post = require('../models/post');

router.route('/blog')
  .post((req, res) => {
    // TODO: do this one
    debugger;
    res.send('TODO: do this one');
  })
  .get((req, res) => {
    Post.findAll()
      .then(allPosts => {
        res.send(allPosts);
      });
  })
  .delete((req, res) => {
    res.send('TODO: do this one');
  })

module.exports = router;