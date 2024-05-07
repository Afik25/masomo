"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("quiz", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      user_id: {
        type: Sequelize.INTEGER,
        references: { model: "users", key: "id" },
        allowNull: false,
      },
      code: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      title: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      visibility: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      mode: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      timing: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      start: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      end: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      random_order_questions: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
      },
      random_order_answers: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
      },
      auto_move_questions: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
      },
      player_anonymat: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
      },
      thumbnail: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      is_completed: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      status: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
        validate: {
          isIn: [[0, 1]],
        },
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
    await queryInterface.dropTable("quiz");
  },
};
