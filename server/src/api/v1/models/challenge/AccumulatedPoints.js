const { Model, DataTypes } = require("sequelize");

class AccumulatedPoints extends Model {
  static init(sequelize) {
    super.init(
      {
        play_id: DataTypes.INTEGER,
        points: DataTypes.INTEGER,
      },
      {
        sequelize,
        freezeTableName: true,
        tableName: "accumulated_points",
      }
    );
  }
  static associate(models) {
    this.belongsTo(models.Play, {
      foreignKey: "play_id",
      as: "accumulated-points_play",
      allowNull: false,
    });
  }
}
module.exports = AccumulatedPoints;
