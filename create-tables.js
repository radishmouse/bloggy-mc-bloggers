const User = require('./models/user');
const Post = require('./models/post');
const Comment = require('./models/comment');

User.sync({force: true})
  .then(() => {
    return Post.sync({force: true})
  })
  .then(() => {
    return Comment.sync({force: true})
  })
  .then(() => {
    console.log('Tables created.');
  })
