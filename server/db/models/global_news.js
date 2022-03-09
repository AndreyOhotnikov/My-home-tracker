'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Global_news extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.User,{foreignKey:'user_id'})
      this.hasMany(models.Response,{foreignKey:'global_news_id'})
      this.hasMany(models.Like,{foreignKey:'global_news_id'})
      this.hasMany(models.Photolink,{foreignKey:'global_news_id'})
    }
  }
  Global_news.init({
    user_id: DataTypes.INTEGER,
    title: DataTypes.STRING,
    status: DataTypes.STRING,
    text: DataTypes.TEXT,
    fixed: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Global_news',
  });
  return Global_news;
};
