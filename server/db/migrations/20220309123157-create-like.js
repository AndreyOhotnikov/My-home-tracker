module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Likes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      user_id: {
        type: Sequelize.ARRAY(Sequelize.INTEGER),
        allowNull: true,

        // references: {
        //   model: 'Users',
        //   key: 'id',
        // },
      },
      global_news_id: {
        type: Sequelize.INTEGER,
        allowNull: true,

        references: {
          model: 'Global_news',
          key: 'id',
        },
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Likes');
  },
};
