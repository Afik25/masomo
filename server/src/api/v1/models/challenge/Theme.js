const { Model, DataTypes } = require("sequelize");

class Theme extends Model {
  static init(sequelize) {
    super.init(
      {
        title: DataTypes.STRING,
        description: DataTypes.TEXT,
        status: DataTypes.INTEGER,
        thumbnail: DataTypes.STRING,
      },
      {
        sequelize,
        freezeTableName: true,
        tableName: "themes",
      }
    );
  }
  static associate(models) {
    this.hasMany(models.Question, {
      foreignKey: "theme_id",
      as: "theme_question",
      allowNull: false,
    });
  }
}
module.exports = Theme;
