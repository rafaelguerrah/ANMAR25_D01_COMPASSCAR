const { DataTypes } = require('sequelize');
const db = require('../config/database');

const Car = db.define('car', {
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
    Car.hasMany(models.CarItems, {
        foreignKey: 'carId',
        as: 'items' 
    });
};

module.exports = Car;
