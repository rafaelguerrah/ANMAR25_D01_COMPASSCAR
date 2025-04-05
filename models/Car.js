module.exports = (sequelize, DataTypes) => {
    const Car = sequelize.define('Car', {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      brand: DataTypes.STRING,
      model: DataTypes.STRING,
      year: DataTypes.INTEGER,
      plate: {
        type: DataTypes.STRING,
        unique: true,
      },
    }, {
      tableName: 'cars',
      timestamps: false,
    });
  
    Car.associate = (models) => {
      Car.hasMany(models.CarItem, {
        as: 'items',
        foreignKey: 'car_id',
      });
    };
  
    return Car;
  };
  