const { Model, DataTypes } = require("sequelize");

class QuizDetails extends Model {
  static init(sequelize) {
    super.init(
      {
        quiz_id: DataTypes.INTEGER,
        question_id: DataTypes.INTEGER,
        is_completed: DataTypes.BOOLEAN,
        status: DataTypes.INTEGER,
        updated_at: DataTypes.DATE,
      },
      {
        sequelize,
        freezeTableName: true,
        tableName: "quiz_details",
      }
    );
  }
  static associate(models) {
    this.belongsTo(models.Quiz, {
      foreignKey: "quiz_id",
      as: "quiz-details_quiz",
      allowNull: false,
    });
    this.belongsTo(models.Question, {
      foreignKey: "question_id",
      as: "quiz-details_question",
      allowNull: false,
    });
  }
}
module.exports = QuizDetails;
