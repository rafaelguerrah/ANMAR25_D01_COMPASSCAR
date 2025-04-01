const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('compasscar', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
});

(async () => {
  try {
    await sequelize.authenticate();
    console.log('Conexão com o Sequelize estabelecida com sucesso');
  } catch (err) {
    console.error('Falha na conexão:', err);
  }
})();


module.exports = sequelize;