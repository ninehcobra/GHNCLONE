'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Lading extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    };
    Lading.init({
        staffId: DataTypes.STRING,
        status: DataTypes.STRING,
        note: DataTypes.STRING,
        pickDate: DataTypes.DATE,
        deliverDate: DataTypes.DATE,
        customerFullname: DataTypes.STRING,
        customerPhone: DataTypes.STRING,
        address: DataTypes.STRING,
        shipMoney: DataTypes.INTEGER,
        pickMoney: DataTypes.INTEGER,
        weight: DataTypes.INTEGER,
    }, {
        sequelize,
        modelName: 'Lading',
    });
    return Lading;
};