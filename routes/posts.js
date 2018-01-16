const express = require('express');
const router = express.Router();

const Post = require('../models/post');

router.route('/blog')
  .post((req, res) => {

    console.log(req.body);

    Post.create({
      title: req.body.title,
      content: req.body.content,
      userId: req.body.userId
    }).then(post => {
      res.send(post);
    });



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