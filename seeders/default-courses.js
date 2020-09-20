'use strict';
const models = require('../models')
const Courses = models.Courses

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return Courses.bulkCreate([
      {
        name: 'default-course',
        description: 'default course set to show this works',
        images: null,
        main_image: null,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'second-default-course',
        description: 'default course set to show this works',
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
    /* return Courses.bulkDelete([
      
    ], {}) */
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
