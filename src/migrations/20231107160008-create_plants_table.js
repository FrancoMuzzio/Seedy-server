'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Plants', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      scientific_name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      family: {
        type: Sequelize.STRING,
        allowNull: false
      },
      common_names: {
        type: Sequelize.JSON,
        defaultValue: {} // JSON vacío por defecto
      },
      images: {
        type: Sequelize.JSON,
        allowNull: false,
        defaultValue: {} // JSON vacío por defecto
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP')
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Plants');
  }
};
