const { Model, DataTypes } = require("sequelize");

class Answer extends Model {
  static init(sequelize) {
    super.init(
      {
        question_id: DataTypes.INTEGER,
        description: DataTypes.TEXT,
        type: DataTypes.BOOLEAN, // good or wrong
        thumbnail: DataTypes.STRING,
      },
      {
        sequelize,
        freezeTableName: true,
        tableName: "answers",
      }
    );
  }
  static associate(models) {
    this.belongsTo(models.Question, {
      foreignKey: "question_id",
      as: "answer_question",
      allowNull: false,
    });
  }
}
module.exports = Answer;
