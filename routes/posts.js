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
    }).then(newPost => {
      res.redirect(`/blog/${newPost.id}`);
    });
  })
  .get((req, res) => {
    Post.findAll()
      .then(allPosts => {

        const posts = allPosts.map(p => {
          return {
            title: p.title,
            content: p.content.substring(0, 10) + '...',
            id: p.id
          }
        });

        res.render('blog-list', {
          // posts: allPosts
          posts: posts
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
        content: result.content,
        id: result.id
      });
    })
  })

router.route('/blog/:id/edit')
  .get((req, res) => {
    Post.findOne({
      where: {
        id: req.params.id
      }
    }).then(result => {
      res.render('blog-form', {
        title: result.title,
        content: result.content,
        editRoute: `/${result.id}/edit`,
        id: result.id
      });
    })
  })
  .post((req, res) => {
    Post.findOne({
      where: {
        id: req.params.id
      }
    }).then(result => {
      result.update({
        title: req.body.title,
        content: req.body.content
      }).then(updatedResult => {
        res.render('blog-form', {
          title: updatedResult.title,
          content: updatedResult.content,
          editRoute: `/${updatedResult.id}/edit`,
          id: updatedResult.id,
          message: 'Successfully updated blog post!'
        });
      });
    });
  })

module.exports = router;