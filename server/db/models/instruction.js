'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Instruction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.User,{foreignKey:'user_id'})
    }
  }
  Instruction.init({
    title: DataTypes.STRING,
    text: DataTypes.TEXT,
    user_id:DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Instruction',
  });
  return Instruction;
};
