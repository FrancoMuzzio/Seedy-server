'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Roles', [
      { name: 'community_founder', createdAt: new Date(), updatedAt: new Date() },
      { name: 'community_moderator', createdAt: new Date(), updatedAt: new Date() },
      { name: 'community_member', createdAt: new Date(), updatedAt: new Date() }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Roles', null, {});
  }
};
