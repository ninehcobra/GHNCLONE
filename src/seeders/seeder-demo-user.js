'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [{
      email: 'admin@gmail.com',
      password: '123456',
      firstName: 'Công',
      lastName: 'Chính',
      address: 'Đồng Nai',
      phoneNumber: '0797260870',
      gender: 1,
      roleId: 'R1',
      positionId: 'Sếp tổng',
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },

  down: async (queryInterface, Sequelize) => {

  }
};
