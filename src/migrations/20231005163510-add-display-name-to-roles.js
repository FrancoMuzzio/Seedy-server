'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('roles', 'display_name', {
      type: Sequelize.STRING,
      after: 'name' // después de la columna 'name'
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('roles', 'display_name');
  }
};
