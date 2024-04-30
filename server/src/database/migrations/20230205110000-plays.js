"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("plays", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      participate_id: {
        type: Sequelize.INTEGER,
        references: { model: "participates", key: "id" },
        allowNull: false,
      },
      quiz_details_id: {
        type: Sequelize.INTEGER,
        references: { model: "quiz_details", key: "id" },
        allowNull: false,
      },
      answer_id: {
        type: Sequelize.INTEGER,
        references: { model: "answers", key: "id" },
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn("now"),
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn("now"),
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("plays");
  },
};
