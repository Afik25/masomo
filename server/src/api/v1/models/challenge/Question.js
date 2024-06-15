const { Model, DataTypes } = require("sequelize");

class Question extends Model {
  static init(sequelize) {
    super.init(
      {
        theme_id: DataTypes.INTEGER,
        description: DataTypes.TEXT,
        type: DataTypes.STRING,
        timing: DataTypes.INTEGER,
        grading: DataTypes.INTEGER,
        thumbnail: DataTypes.STRING,
      },
      {
        sequelize,
        freezeTableName: true,
        tableName: "questions",
      }
    );
  }
  static associate(models) {
    this.belongsTo(models.Theme, {
      foreignKey: "theme_id",
      as: "question_theme",
      allowNull: true,
    });
    this.hasMany(models.QuizDetails, {
      foreignKey: "question_id",
      as: "question_quiz-details",
      allowNull: false,
    });
    this.hasMany(models.Answer, {
      foreignKey: "question_id",
      as: "question_answer",
      allowNull: false,
    });
  }
}
module.exports = Question;
