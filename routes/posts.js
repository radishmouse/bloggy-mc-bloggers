const express = require('express');
const router = express.Router();

// const ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn;
const Post = require('../models/post');


function ensureAuthenticated(req, res, next) {

  if (req.isAuthenticated()) {
    // req.user is available for use here
    console.log('we are all good');
    return next();
  }
  console.log('clearly, they are not authenticated');
    // denied. redirect to login
  res.redirect('/');
}


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
  .get(ensureAuthenticated, (req, res) => {
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
        content: result.content
      });
    })
  })


module.exports = router;