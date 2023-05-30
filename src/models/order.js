'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Order extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Order.belongsTo(models.User, { foreignKey: 'userId' })
        }
    };
    Order.init({
        userId: DataTypes.INTEGER,
        takeName: DataTypes.STRING,
        takeAddress: DataTypes.STRING,
        takePhone: DataTypes.STRING,
        takeProvince: DataTypes.STRING,
        takeDistrict: DataTypes.STRING,
        takeTime: DataTypes.STRING,
        receivePhone: DataTypes.STRING,
        receiverName: DataTypes.STRING,
        receiverAddress: DataTypes.STRING,
        receiveProvince: DataTypes.STRING,
        receiveDistrict: DataTypes.STRING,
        arrProduct: DataTypes.JSON,
        imagePackage: DataTypes.BLOB,
        totalWeight: DataTypes.INTEGER,
        CODCost: DataTypes.INTEGER,
        totalCost: DataTypes.INTEGER,
        note: DataTypes.STRING,
        noteOption: DataTypes.STRING,
        fee: DataTypes.INTEGER,
        payOption: DataTypes.STRING,
        status: DataTypes.STRING,
        warehouseId: DataTypes.INTEGER
    }, {
        sequelize,
        modelName: 'Order',
    });
    return Order;
};