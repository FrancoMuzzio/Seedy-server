'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.removeConstraint('Posts', 'posts_ibfk_2');

    await queryInterface.addConstraint('Posts', {
      fields: ['category_id'],
      type: 'foreign key',
      name: 'posts_ibfk_2',
      references: {
        table: 'Categories',
        field: 'id'
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeConstraint('Posts', 'posts_ibfk_2');

    await queryInterface.addConstraint('Posts', {
      fields: ['category_id'],
      type: 'foreign key',
      name: 'posts_ibfk_2',
      references: {
        table: 'Categories',
        field: 'id'
      },
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE'
    });
  }
};
