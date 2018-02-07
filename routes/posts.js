const express = require('express');
const router = express.Router();

const Post = require('../models/post');


router.all('*', (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  next();
})

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

        res.json(allPosts);

        // const posts = allPosts.map(p => {
        //   return {
        //     title: p.title,
        //     content: p.content.substring(0, 10) + '...',
        //     id: p.id
        //   }
        // });

        // res.render('blog-list', {
        //   // posts: allPosts
        //   posts: posts
        // });
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
  .delete((req, res) => {
    console.log('You are trying to delete via Ajax');
    Post.findOne({
      where: {
        id: req.params.id
      }
    }).then(result => {
      result.destroy()
        .then(() => {
          console.log('You deleted the thing');
          res.send({message: `successfully deleted post ${req.params.id}`})
        });
    });
  })

router.route('/blog/:id/delete')
  .post((req, res) => {
    // delete the thing.

    // res.redirect(`/blog/${req.params.id}/edit`);
    Post.findOne({
      where: {
        id: req.params.id
      }
    }).then(result => {
      result.destroy()
        .then(() => {
          console.log('You deleted the thing');
          res.redirect('/blog/new');
        });
    });
  });

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