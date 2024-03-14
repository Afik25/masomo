"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("sections", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      lesson_id: {
        type: Sequelize.INTEGER,
        references: { model: "lessons", key: "id" },
        allowNull: true,
      },
      exercise_id: {
        type: Sequelize.INTEGER,
        references: { model: "exercices", key: "id" },
        allowNull: true,
      },
      solution_id: {
        type: Sequelize.INTEGER,
        references: { model: "solutions", key: "id" },
        allowNull: true,
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      thumbnails: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn("now"),
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("sections");
  },
};
