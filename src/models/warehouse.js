'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Warehouse extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    };
    Warehouse.init({
        name: DataTypes.STRING,
        address: DataTypes.STRING,
        phoneNumber: DataTypes.STRING,
        districtName: DataTypes.STRING,
        provinceName: DataTypes.STRING,
        addressCoordinate: DataTypes.JSON
    }, {
        sequelize,
        modelName: 'Warehouse',
    });
    return Warehouse;
};