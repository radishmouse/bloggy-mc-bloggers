const Sequelize = require('sequelize');
const sequelize = require('../db');

const Post = sequelize.define('post', {
  title: {
    type: Sequelize.STRING
  },
  content: {
    type: Sequelize.TEXT
  }
});

Post.sync()
  .then(() => {
    console.log('Created Post table!');
  });

module.exports = Post;