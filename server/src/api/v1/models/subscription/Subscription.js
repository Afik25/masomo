const { Model, DataTypes } = require("sequelize");

class Subscription extends Model {
  static init(sequelize) {
    super.init(
      {
        student_id: DataTypes.INTEGER,
        dates_sub: DataTypes.DATE,
        type_sub: DataTypes.STRING,
        package_sub: DataTypes.STRING,
        amount: DataTypes.DOUBLE,
        currency: DataTypes.STRING,
        reference_transaction: DataTypes.STRING,
        transaction_status: DataTypes.STRING,
        pay_method: DataTypes.STRING,
        end_sub: DataTypes.DATE,
        updated_at: DataTypes.DATE,
      },
      {
        sequelize,
        freezeTableName: true,
        tableName: "subscriptions",
      }
    );
  }
  static associate(models) {
    this.belongsTo(models.User, {
      foreignKey: "user_id",
      as: "user_subscription",
      allowNull: false,
    });
  }
}
module.exports = Subscription;
