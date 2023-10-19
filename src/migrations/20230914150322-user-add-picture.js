'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Agregar la columna 'picture' a la tabla 'Users' después de la columna 'password'
    await queryInterface.addColumn('Users', 'picture', {
      type: Sequelize.STRING,
      allowNull: true,
      defaultValue: null,
      after: 'password' // Especifica que la columna se agregará después de 'password'
    });
  },

  down: async (queryInterface, Sequelize) => {
    // Eliminar la columna 'picture' de la tabla 'Users'
    await queryInterface.removeColumn('Users', 'picture');
  }
};
