'use strict';
const models = require('../models')
const Journals = models.Journals

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return Journals.bulkCreate([
      {
        name: 'default-journal',
        description: 'default journal set to show this works',
        images: null,
        main_image: null,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'second-default-journal',
        description: 'default journal set to show this works',
        images: null,
        main_image: null,
        created_at: new Date(),
        updated_at: new Date()
      },
      
    ], {})
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
  },

  down: async (queryInterface, Sequelize) => {
    /* return Journals.bulkDelete([
      
    ], {}) */
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};