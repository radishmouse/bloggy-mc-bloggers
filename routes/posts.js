const express = require('express');
const router = express.Router();

const Post = require('../models/post');
const ensureAuthenticated = require('../auth').ensureAuthenticated;

// This will make all routes on this router
// require login.
router.all('*', ensureAuthenticated);

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
  // Alternatively, you can use the
  // `ensureAuthenticated` route handler
  // to protect a single route method
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