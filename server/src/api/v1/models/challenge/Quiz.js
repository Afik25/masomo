const { Model, DataTypes } = require("sequelize");

class Quiz extends Model {
  static init(sequelize) {
    super.init(
      {
        user_id: DataTypes.INTEGER,
        code: DataTypes.STRING,
        title: DataTypes.STRING,
        visibility: DataTypes.STRING,
        mode: DataTypes.STRING,
        timing: DataTypes.STRING,
        description: DataTypes.TEXT,
        start: DataTypes.DATE,
        end: DataTypes.DATE,
        random_order_questions: DataTypes.BOOLEAN,
        random_order_answers: DataTypes.BOOLEAN,
        auto_move_questions: DataTypes.BOOLEAN,
        player_anonymat: DataTypes.BOOLEAN,
        thumbnail: DataTypes.STRING,
        is_completed: DataTypes.BOOLEAN,
        status: DataTypes.INTEGER,
        updated_at: DataTypes.DATE,
      },
      {
        sequelize,
        freezeTableName: true,
        tableName: "quiz",
      }
    );
  }
  static associate(models) {
    this.belongsTo(models.User, {
      foreignKey: "user_id",
      as: "quiz_user",
      allowNull: false,
    });
    this.hasMany(models.QuizDetails, {
      foreignKey: "quiz_id",
      as: "quiz_quiz-details",
      allowNull: false,
    });
    this.hasMany(models.Participate, {
      foreignKey: "quiz_id",
      as: "quiz_participate",
      allowNull: false,
    });
  }
}
module.exports = Quiz;
