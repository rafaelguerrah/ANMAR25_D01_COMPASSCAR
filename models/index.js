const Sequelize = require('sequelize');
const sequelize = require('../config/database'); 
const db = {};


db.Sequelize = Sequelize;
db.sequelize = sequelize;


db.Car = require('./Car')(sequelize, Sequelize.DataTypes);
db.CarItem = require('./CarItem')(sequelize, Sequelize.DataTypes);


Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

module.exports = db;
