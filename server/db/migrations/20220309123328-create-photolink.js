'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Photolinks', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userinfo_id: {
        type: Sequelize.INTEGER,
        references:{
          model:'Users',
          key:'id'
       }
      },
      global_news_id: {
        type: Sequelize.INTEGER,
        references:{
          model:'Global_news',
          key:'id'
       }
      },
      local_news_id: {
        type: Sequelize.INTEGER,
        references:{
          model:'Local_news',
          key:'id'
       }
      },
      bid_id: {
        type: Sequelize.INTEGER,
        references:{
          model:'Bids',
          key:'id'
       }
      },
      documentIsChairman_user_id: {
        type: Sequelize.INTEGER,
        references:{
          model:'Users',
          key:'id'
       }
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
    await queryInterface.dropTable('Photolinks');
  }
};
