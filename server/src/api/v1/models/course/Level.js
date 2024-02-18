const { Model, DataTypes } = require("sequelize");

class Level extends Model {
  static init(sequelize) {
    super.init(
      {
        program_id: DataTypes.INTEGER,
        code: DataTypes.STRING,
        title: DataTypes.STRING,
        description: DataTypes.TEXT,
        status: DataTypes.INTEGER,
        updated_at: DataTypes.DATE,
      },
      {
        sequelize,
        freezeTableName: true,
        tableName: "levels",
      }
    );
  }
  static associate(models) {
    this.belongsTo(models.Program, {
      foreignKey: "program_id",
      as: "program_level",
      allowNull: false,
    });
    this.hasMany(models.Inscription, {
      foreignKey: "level_id",
      as: "level_inscription",
      allowNull: false,
    });
    this.hasMany(models.Course, {
      foreignKey: "level_id",
      as: "level_course",
      allowNull: false,
    });
  }
}
module.exports = Level;
