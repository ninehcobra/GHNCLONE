'use strict';

const { BLOB } = require("sequelize");

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('orders', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            userId: {
                type: Sequelize.INTEGER
            },
            takeName: {
                type: Sequelize.STRING
            },
            takeAddress: {
                type: Sequelize.STRING
            },
            takePhone: {
                type: Sequelize.STRING
            },
            takeProvince: {
                type: Sequelize.STRING
            },
            receiverName: {
                type: Sequelize.STRING
            },
            takeDistrict: {
                type: Sequelize.STRING
            },
            takeTime: {
                type: Sequelize.STRING
            },
            receivePhone: {
                type: Sequelize.STRING
            },
            receiverName: {
                type: Sequelize.STRING
            },
            receiverAddress: {
                type: Sequelize.STRING
            },
            receiveProvince: {
                type: Sequelize.STRING
            },
            receiveDistrict: {
                type: Sequelize.INTEGER
            },
            arrProduct: {
                type: Sequelize.JSON
            },
            imagePackage: {
                type: Sequelize.BLOB('long')
            },
            totalWeight: {
                type: Sequelize.INTEGER
            },
            CODCost: {
                type: Sequelize.INTEGER
            },
            totalCost: {
                type: Sequelize.INTEGER
            },
            noteOption: {
                type: Sequelize.STRING
            },
            fee: {
                type: Sequelize.INTEGER
            },
            note: {
                type: Sequelize.STRING
            },
            payOption: {
                type: Sequelize.STRING
            },
            status: {
                type: Sequelize.STRING
            },
            warehouseId: {
                type: Sequelize.INTEGER
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            }
        });
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('orders');
    }
};