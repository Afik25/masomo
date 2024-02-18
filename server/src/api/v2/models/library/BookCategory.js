const { Model, DataTypes } = require("sequelize");

class BookCategory extends Model {
  static init(sequelize) {
    super.init(
      {
        code: DataTypes.STRING,
        title: DataTypes.STRING,
        description: DataTypes.TEXT,
        status: DataTypes.INTEGER,
        updated_at: DataTypes.DATE,
      },
      {
        sequelize,
        freezeTableName: true,
        tableName: "book_categories",
      }
    );
  }
  static associate(models) {
    this.hasMany(models.Book, {
      foreignKey: "book_category_id",
      as: "book_category_book",
      allowNull: false,
    });
  }
}
module.exports = BookCategory;
