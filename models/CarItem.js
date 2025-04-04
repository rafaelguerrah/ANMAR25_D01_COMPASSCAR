const { DataTypes } = require('sequelize');
const db = require('../config/database');

const CarItem = db.define('CarItem', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    car_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'cars',
            key: 'id',
        },
        onDelete: 'CASCADE',
    },
}, {
    tableName: 'cars_items',
    timestamps: false,
});

CarItem.associate = (models) => {
    CarItem.belongsTo(models.Car, {
        foreignKey: 'car-id',
        as: 'car',
        onDelete: 'CASCADE',
    });
};

module.exports = CarItem;
