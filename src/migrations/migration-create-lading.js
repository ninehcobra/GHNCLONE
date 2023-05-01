'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('ladings', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            status: {
                type: Sequelize.STRING
            },
            note: {
                type: Sequelize.STRING
            },
            pickDate: {
                type: Sequelize.DATE
            },
            deliverDate: {
                type: Sequelize.DATE
            },
            customerFullname: {
                type: Sequelize.STRING
            },
            customerPhone: {
                type: Sequelize.STRING
            },
            address: {
                type: Sequelize.STRING
            },
            ship_money: {
                type: Sequelize.INTEGER
            },
            pick_money: {
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
        await queryInterface.dropTable('ladings');
    }
};