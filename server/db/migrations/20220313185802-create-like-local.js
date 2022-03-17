module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('LikeLocals', {
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
      local_news_id: {
        allowNull: true,
        type: Sequelize.INTEGER,
        references: {
          model: 'Local_news',
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
    await queryInterface.dropTable('LikeLocals');
  },
};
