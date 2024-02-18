const { Model, DataTypes } = require("sequelize");

class Book extends Model {
  static init(sequelize) {
    super.init(
      {
        book_category_id: DataTypes.INTEGER,
        code: DataTypes.STRING,
        title: DataTypes.STRING,
        type: DataTypes.STRING,
        description: DataTypes.TEXT,
        status: DataTypes.INTEGER,
        updated_at: DataTypes.DATE,
      },
      {
        sequelize,
        freezeTableName: true,
        tableName: "books",
      }
    );
  }
  static associate(models) {
    this.belongsTo(models.BookCategory, {
      foreignKey: "book_category_id",
      as: "book_category_book",
      allowNull: false,
    });
  }
}
module.exports = Book;
