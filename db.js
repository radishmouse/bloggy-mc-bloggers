const Sequelize = require('sequelize');
const sequelize = new Sequelize('bloggy-mc-bloggers', 'chrisaquino', '', {
  host: 'localhost',
  dialect: 'postgres'
});

module.exports = sequelize;

// sequelize
//   .authenticate()
//   .then(() => {
//     console.log('That totally connected. yeah!');
//   })
//   .catch((err) => {
//     console.error('Oh noes that did not work. :(')
//   });



// User.sync()
//   .then(() => {
//     console.log('It should have created the table.');
//     return User.create({
//       firstName: 'Chris',
//       lastName: 'Aquinoooooooooooo'
//     });
//   });

// User.findOne({
//   where: {
//     id: 1
//   }
// })
// .then((me) => {
//    console.log(me);
// });




