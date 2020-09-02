'use strict';
const models = require('../models')
const User = models.Users

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return User.bulkCreate([
      {
        email: 'admin@admin.com',
        password: 'asdfasdf',
        role: 'admin',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        email: 'ibanzajoe@gmail.com',
        password: 'asdfasdf',
        role: 'user',
        first_name: 'Dennis',
        last_name: 'Lee',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        email: 'tester2@tester.com',
        password: 'asdfasdf',
        role: 'user',
        first_name: 'Kanye',
        last_name: 'West',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        email: 'tester3@tester.com',
        password: 'asdfasdf',
        role: 'user',
        first_name: 'Gary',
        last_name: 'Johnson',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        email: 'tester4@tester.com',
        password: 'asdfasdf',
        role: 'user',
        first_name: 'Joey',
        last_name: 'Triviani',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        email: 'tester5@tester.com',
        password: 'asdfasdf',
        role: 'user',
        first_name: 'Dave',
        last_name: 'Matthews',
        created_at: new Date(),
        updated_at: new Date()
      }
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
    return User.bulkDelete([
      { email: 'admin@admin.com' },
      { email: 'ibanzajoe@gmail.com' },
      { email: 'tester2@tester.com' },
      { email: 'tester3@tester.com' },
      { email: 'tester4@tester.com' },
      { email: 'tester5@tester.com' }
    ], {})
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
