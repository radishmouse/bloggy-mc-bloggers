const Sequelize = require('sequelize');
const sequelize = require('../db');

const User = sequelize.define('user', {
  firstName: {
    type: Sequelize.STRING
  },
  lastName: {
    type: Sequelize.STRING
  },
  githubid: {
    type: Sequelize.INTEGER
  }
});

//alter table users add column githubId integer;

module.exports = User;