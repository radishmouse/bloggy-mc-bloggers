const Sequelize = require('sequelize');
const sequelize = require('../db');

const User = sequelize.define('user', {
  firstName: {
    type: Sequelize.STRING
  },
  lastName: {
    type: Sequelize.STRING
  }
});

User.sync()
  .then(() => {
    console.log('Created User table!');
  });

module.exports = User;