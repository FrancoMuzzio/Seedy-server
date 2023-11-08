'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('User_Plant', {
      user_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'users',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        allowNull: false,
        primaryKey: true,
      },
      plant_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'plants',
          key: 'id', 
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        allowNull: false,
        primaryKey: true,
      }
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('User_Plant');
  }
};
