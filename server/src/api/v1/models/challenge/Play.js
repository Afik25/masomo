const { Model, DataTypes } = require("sequelize");

class Play extends Model {
  static init(sequelize) {
    super.init(
      {
        participate_id: DataTypes.INTEGER,
        quiz_details_id: DataTypes.INTEGER,
        answer_id: DataTypes.INTEGER,
      },
      {
        sequelize,
        freezeTableName: true,
        tableName: "plays",
      }
    );
  }
  static associate(models) {
    this.belongsTo(models.Participate, {
      foreignKey: "participate_id",
      as: "play_participate",
      allowNull: false,
    });
    this.belongsTo(models.QuizDetails, {
      foreignKey: "quiz_details_id",
      as: "play_quiz-details",
      allowNull: false,
    });
    this.belongsTo(models.Answer, {
      foreignKey: "answer_id",
      as: "play_answer",
      allowNull: false,
    });
    this.hasMany(models.AccumulatedPoints, {
      foreignKey: "play_id",
      as: "play_accumulated-points",
      allowNull: false,
    });
  }
}
module.exports = Play;
