const { DataTypes } = require('sequelize');
const db = require('../config/database');

const CarItems = db.define('CarItems', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: DataTypes.STRING,
    carId: {
        type: DataTypes.INTEGER,
        field: 'car_id',
    },
}, {
    tableName: 'cars_items',
    timestamps: false,
});


CarItems.associate = (models) => {
    CarItems.belongsTo(models.Car, {
        foreignKey: 'carId',
        as: 'car' 
    });
};

module.exports = CarItems;