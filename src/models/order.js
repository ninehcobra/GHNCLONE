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
        }
    };
    Order.init({
        pickName: DataTypes.STRING,
        pickMoney: DataTypes.STRING,
        pickAddress: DataTypes.STRING,
        pickPhone: DataTypes.STRING,
        pickMail: DataTypes.STRING,
        recName: DataTypes.STRING,
        recAddress: DataTypes.STRING,
        recPhone: DataTypes.STRING,
        recMail: DataTypes.STRING,
        recNote: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'Order',
    });
    return Order;
};