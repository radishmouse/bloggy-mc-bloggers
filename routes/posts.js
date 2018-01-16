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
        // res.send(allPosts);
        res.render('blog-list', {
          posts: allPosts
        });
      });
  })
  .delete((req, res) => {
    res.send('TODO: do this one');
  })

router.route('/blog/new')
  .get((req, res) => {
    res.render('blog-form');
  })

router.route('/blog/:id')
  .get((req, res) => {
    Post.findOne({
      where: {
        id: req.params.id
      }
    }).then(result => {
      res.render('blog-single', {
        title: result.title,
        content: result.content
      });
    })
  })


module.exports = router;