const Sequelize = require('sequelize');
const sequelize = new Sequelize('bloggy-mc-bloggers', 'chrisaquino', {
  host: 'localhost',
  dialect: 'postgres'
});