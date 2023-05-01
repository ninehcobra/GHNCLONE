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
            userId: {
                type: Sequelize.INTEGER
            },
            senderName: {
                type: Sequelize.STRING
            },
            senderAddress: {
                type: Sequelize.STRING
            },
            senderPhone: {
                type: Sequelize.STRING
            },
            senderMail: {
                type: Sequelize.STRING
            },
            receiverName: {
                type: Sequelize.STRING
            },
            receiverAddress: {
                type: Sequelize.STRING
            },
            receiverPhone: {
                type: Sequelize.STRING
            },
            receiverMail: {
                type: Sequelize.STRING
            },
            weight: {
                type: Sequelize.STRING
            },
            value: {
                type: Sequelize.STRING
            },
            note: {
                type: Sequelize.STRING
            },
            deliveryPersonId: {
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
        await queryInterface.dropTable('oders');
    }
};