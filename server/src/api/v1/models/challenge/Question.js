const { Model, DataTypes } = require("sequelize");

class Question extends Model {
  static init(sequelize) {
    super.init(
      {
        quiz_id: DataTypes.INTEGER,
        description: DataTypes.TEXT,
        type: DataTypes.STRING,
        timing: DataTypes.INTEGER,
        grading: DataTypes.INTEGER,
        isCompleted: DataTypes.BOOLEAN,
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
    this.belongsTo(models.Quiz, {
      foreignKey: "quiz_id",
      as: "question_quiz",
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
