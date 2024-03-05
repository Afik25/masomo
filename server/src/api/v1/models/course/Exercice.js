const { Model, DataTypes } = require("sequelize");

class Exercice extends Model {
  static init(sequelize) {
    super.init(
      {
        lesson_id: DataTypes.INTEGER,
        code: DataTypes.STRING,
        title: DataTypes.STRING,
        type: DataTypes.STRING,
        timing: DataTypes.INTEGER, // premium or freemium
        version: DataTypes.STRING,
        description: DataTypes.TEXT,
        thumbnail: DataTypes.TEXT,
        audio: DataTypes.STRING,
        video: DataTypes.STRING,
        pdf: DataTypes.STRING,
        status: DataTypes.INTEGER,
        updated_at: DataTypes.DATE,
      },
      {
        sequelize,
        freezeTableName: true,
        tableName: "exercices",
      }
    );
  }
  static associate(models) {
    this.belongsTo(models.Lesson, {
      foreignKey: "lesson_id",
      as: "exercice_lesson",
      allowNull: false,
    });
    this.hasMany(models.Solution, {
      foreignKey: "exercice_id",
      as: "exercice_solution",
      allowNull: false,
    });
    this.hasMany(models.Section, {
      foreignKey: "exercise_id",
      as: "lesson_exercice",
      allowNull: false,
    });
  }
}
module.exports = Exercice;
