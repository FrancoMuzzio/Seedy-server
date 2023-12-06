'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Posts', 'date');
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Posts', 'date', {
      type: Sequelize.DATE,
      allowNull: false
    });
  }
};
