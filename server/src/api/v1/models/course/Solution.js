const { Model, DataTypes } = require("sequelize");

class Solution extends Model {
  static init(sequelize) {
    super.init(
      {
        exercice_id: DataTypes.INTEGER,
        code: DataTypes.STRING,
        title: DataTypes.STRING,
        type: DataTypes.STRING, // freemium or premium
        version: DataTypes.STRING,
        description: DataTypes.TEXT,
        audio: DataTypes.STRING,
        video: DataTypes.STRING,
        status: DataTypes.INTEGER,
        updated_at: DataTypes.DATE,
      },
      {
        sequelize,
        freezeTableName: true,
        tableName: "solutions",
      }
    );
  }
  static associate(models) {
    this.belongsTo(models.Exercice, {
      foreignKey: "exercice_id",
      as: "solution_exercice",
      allowNull: false,
    });
    this.hasMany(models.Section, {
      foreignKey: "solution_id",
      as: "lesson_solution",
      allowNull: false,
    });
  }
}
module.exports = Solution;
