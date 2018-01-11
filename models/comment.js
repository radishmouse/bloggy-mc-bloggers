const Sequelize = require('sequelize');
const sequelize = require('../db');
const User = require('./user');
const Post = require('./post');

const Comment = sequelize.define('post', {
  content: {
    type: Sequelize.TEXT
  }
});

Comment.belongsTo(Post);
Comment.belongsTo(User);

module.exports = Post;
