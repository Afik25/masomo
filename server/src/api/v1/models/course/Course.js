const { Model, DataTypes } = require("sequelize");

class Course extends Model {
  static init(sequelize) {
    super.init(
      {
        level_id: DataTypes.INTEGER,
        code: DataTypes.STRING,
        title: DataTypes.STRING,
        timing: DataTypes.INTEGER,
        description: DataTypes.TEXT,
        status: DataTypes.INTEGER,
        updated_at: DataTypes.DATE,
      },
      {
        sequelize,
        freezeTableName: true,
        tableName: "courses",
      }
    );
  }
  static associate(models) {
    this.belongsTo(models.Level, {
      foreignKey: "level_id",
      as: "course_level",
      allowNull: false,
    });
    this.hasMany(models.Lesson, {
      foreignKey: "course_id",
      as: "course_lesson",
      allowNull: false,
    });
  }
}
module.exports = Course;
