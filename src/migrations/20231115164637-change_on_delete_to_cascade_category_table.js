'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.removeConstraint('Categories', 'categories_ibfk_1');

    await queryInterface.addConstraint('Categories', {
      fields: ['community_id'],
      type: 'foreign key',
      name: 'categories_ibfk_1',
      references: {
        table: 'Communities',
        field: 'id'
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeConstraint('Categories', 'categories_ibfk_1');

    await queryInterface.addConstraint('Categories', {
      fields: ['community_id'],
      type: 'foreign key',
      name: 'categories_ibfk_1',
      references: {
        table: 'Communities',
        field: 'id'
      },
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE'
    });
  }
};
