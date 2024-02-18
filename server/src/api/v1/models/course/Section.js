const { Model, DataTypes } = require("sequelize");

class Section extends Model {
  static init(sequelize) {
    super.init(
      {
        lesson_id: DataTypes.INTEGER,
        exercise_id: DataTypes.INTEGER,
        solution_id: DataTypes.INTEGER,
        description: DataTypes.TEXT,
        thumbnails: DataTypes.STRING,
      },
      {
        sequelize,
        freezeTableName: true,
        tableName: "sections",
      }
    );
  }
  static associate(models) {
    this.belongsTo(models.Lesson, {
      foreignKey: "lesson_id",
      as: "section_lesson",
      allowNull: false,
    });
    this.belongsTo(models.Exercice, {
      foreignKey: "exercise_id",
      as: "section_exercice",
      allowNull: false,
    });
    this.belongsTo(models.Solution, {
      foreignKey: "solution_id",
      as: "section_solution",
      allowNull: false,
    });
  }
}
module.exports = Section;
