const { Model, DataTypes } = require("sequelize");

class Lesson extends Model {
  static init(sequelize) {
    super.init(
      {
        course_id: DataTypes.INTEGER,
        code: DataTypes.STRING,
        title: DataTypes.STRING,
        type: DataTypes.STRING, // premium or freemium
        timing: DataTypes.INTEGER,
        version: DataTypes.STRING,
        description: DataTypes.TEXT,
        thumbnail: DataTypes.TEXT,
        audio: DataTypes.STRING,
        video: DataTypes.STRING,
        pdf: DataTypes.STRING,
        status: DataTypes.INTEGER,
        updated_at: DataTypes.DATE,
      },
      {
        sequelize,
        freezeTableName: true,
        tableName: "lessons",
      }
    );
  }
  static associate(models) {
    this.belongsTo(models.Course, {
      foreignKey: "course_id",
      as: "lesson_course",
      allowNull: false,
    });
    this.hasMany(models.Exercice, {
      foreignKey: "lesson_id",
      as: "lesson_exercice",
      allowNull: false,
    });
    this.hasMany(models.Section, {
      foreignKey: "lesson_id",
      as: "lesson_section",
      allowNull: false,
    });
  }
}
module.exports = Lesson;
