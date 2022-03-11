'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Home,{foreignKey:'home_id'})
      this.hasMany(models.Support,{foreignKey:'user_id'})
      this.hasMany(models.Instruction,{foreignKey:'user_id'})
      this.hasMany(models.Benifit,{foreignKey:'user_id'})
      this.hasMany(models.Chat,{foreignKey:'user_id'})
      this.hasMany(models.Bid,{foreignKey:'user_id'})
      this.hasOne(models.Userinfo,{foreignKey:'user_id'})
      this.hasMany(models.Store,{foreignKey:'user_id'})
      this.hasMany(models.Local_news,{foreignKey:'user_id'})
      this.hasMany(models.Global_news,{foreignKey:'user_id'})
      this.hasMany(models.Response,{foreignKey:'user_id'})
      this.hasMany(models.Like,{foreignKey:'user_id'})
    }
  }
  User.init({
    nick_name: DataTypes.STRING,
    email: DataTypes.STRING,
    role: DataTypes.STRING,
    checked: DataTypes.STRING,
    password: DataTypes.STRING,
    home_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};
