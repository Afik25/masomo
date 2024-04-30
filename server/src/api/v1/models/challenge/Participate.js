const { Model, DataTypes } = require("sequelize");

class Participate extends Model {
  static init(sequelize) {
    super.init(
      {
        quiz_id: DataTypes.INTEGER,
        user_id: DataTypes.INTEGER,
        pseudo: DataTypes.STRING,
        request_dates: DataTypes.DATE,
        response_dates: DataTypes.DATE,
        status: DataTypes.BOOLEAN,
      },
      {
        sequelize,
        freezeTableName: true,
        tableName: "participates",
      }
    );
  }
  static associate(models) {
    this.belongsTo(models.Quiz, {
      foreignKey: "quiz_id",
      as: "participate_quiz",
      allowNull: false,
    });
    this.belongsTo(models.User, {
      foreignKey: "user_id",
      as: "participate_user",
      allowNull: false,
    });
    this.hasMany(models.Play, {
      foreignKey: "participate_id",
      as: "participate_play",
      allowNull: false,
    });
  }
}
module.exports = Participate;
