'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Roles', [
      { name: 'community_founder', display_name: 'Founder', createdAt: new Date(), updatedAt: new Date() },
      { name: 'community_moderator', display_name: 'Mod', createdAt: new Date(), updatedAt: new Date() },
      { name: 'community_member', display_name: 'Member', createdAt: new Date(), updatedAt: new Date() }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Roles', null, {});
  }
};
