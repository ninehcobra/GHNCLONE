'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('oders', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            pickName: {
                type: Sequelize.STRING
            },
            pickMoney: {
                type: Sequelize.STRING
            },
            pickAddress: {
                type: Sequelize.STRING
            },
            pickPhone: {
                type: Sequelize.STRING
            },
            pickMail: {
                type: Sequelize.STRING
            },
            recName: {
                type: Sequelize.STRING
            },
            recAddress: {
                type: Sequelize.STRING
            },
            recPhone: {
                type: Sequelize.STRING
            },
            recEmail: {
                type: Sequelize.STRING
            },
            recNote: {
                type: Sequelize.STRING
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
        await queryInterface.dropTable('oders');
    }
};