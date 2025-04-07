module.exports = (sequelize, DataTypes) => {
    const CarItem = sequelize.define('CarItem', {
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
      timestamps: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    });
  
    CarItem.associate = (models) => {
      CarItem.belongsTo(models.Car, {
        foreignKey: 'car_id',
      as: 'car',
      });
    };
  
    return CarItem;
  };
  