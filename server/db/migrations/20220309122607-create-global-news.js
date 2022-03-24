'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Global_news', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      user_id: {
        type: Sequelize.INTEGER,
        references:{
          model:'Users',
          key:'id'
       }
      },
      title: {
        type: Sequelize.STRING
      },
      status: {
        type: Sequelize.STRING
      },
      text: {
        type: Sequelize.TEXT
      },
      fixed: {
        type: Sequelize.STRING
      },
      link: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Global_news');
  }
};
