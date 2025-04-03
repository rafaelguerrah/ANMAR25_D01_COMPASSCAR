const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('compasscar', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
  logging: false 
});


(async () => {
  try {
    await sequelize.authenticate();
    console.log('Conexão estabelecida com sucesso com o Sequelize');
  } catch (err) {
    console.error('Não foi possível conectar:', err);
  }
})();

module.exports = sequelize;