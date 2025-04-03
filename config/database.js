const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('compasscar', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
  logging: false 
});

(async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection established successfully with Sequelize');
  } catch (err) {
    console.error('Unable to connect to the database:', err);
  }
})();

module.exports = sequelize;