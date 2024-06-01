const Quiz = require("../../models/challenge/Quiz");
const { Op } = require("sequelize");
const { isEmpty, generateOTP } = require("../../../../utils/utils");

module.exports = {
  async create(req, res) {
    try {
      const {
        user_id,
        quiz_title,
        visibility,
        mode,
        timing,
        description,
        start,
        end,
        random_order_questions,
        random_order_answers,
        auto_move_questions,
        player_anonymat,
      } = req.body;
      const thumbnail = req?.file?.filename;

      const quiz_count = await Quiz.count();
      //
      var code = generateOTP(6) + "" + (quiz_count + 1);
      //
      const quiz = await Quiz.create({
        user_id,
        code,
        title: quiz_title.toLowerCase(),
        visibility,
        mode,
        timing,
        description: description.toLowerCase(),
        start,
        end,
        random_order_questions,
        random_order_answers,
        auto_move_questions,
        player_anonymat,
        thumbnail: thumbnail,
      });
      return res.status(200).json({
        success: true,
        message: `The quiz based on ${quiz_title.toLowerCase()} have been successfully created.`,
        quiz,
      });
    } catch (error) {
      console.log({ "Error create quiz ": error });
    }
  },
  async get(req, res) {
    try {
      const quiz = await Quiz.findAll();
      if (isEmpty(quiz)) {
        return res.status(200).json({
          status: 0,
          length: 0,
          message: "No information about quiz available.",
        });
      }
      return res.status(200).json({ status: 1, length: quiz.length, quiz });
    } catch (error) {
      console.log({ "Error get quiz ": error });
    }
  },
  async getByKey(req, res) {
    try {
      const { key } = req.params;

      const quiz = await Quiz.findAll({ where: { id: key } });
      if (isEmpty(quiz)) {
        return res.status.json({
          status: 0,
          length: 0,
          message: `No information available about the Quiz with the key ${key}.`,
        });
      }

      return res.status(200).json({ status: 1, length: quiz.length, quiz });
    } catch (error) {
      console.log({ "Error get Quiz by key ": error });
    }
  },
  async getByUser(req, res) {
    try {
      const { key } = req.params;

      const quiz = await Quiz.findAll({ where: { user_id: key } });
      if (isEmpty(quiz)) {
        return res.status(400).json({
          status: 0,
          length: 0,
          message: "No Quiz available for the specified user.",
        });
      }
      return res.status(200).json({ status: 1, length: quiz.length, quiz });
    } catch (error) {
      console.log({ "Error get Quiz by user ": error });
      return res.status(400).json({
        status: 0,
        message: "Error get Quiz by user.",
      });
    }
  },
  async update(req, res) {
    try {
      const {
        user_id,
        code,
        quiz_title,
        visibility,
        mode,
        timing,
        description,
        start,
        end,
        random_order_questions,
        random_order_answers,
        auto_move_questions,
        player_anonymat,
      } = req.body;
      const thumbnail = req?.file?.filename;
      const { quiz_id } = req.params;

      const quiz = await Quiz.update(
        {
          user_id,
          code,
          title: quiz_title.toLowerCase(),
          visibility,
          mode,
          timing,
          description: description.toLowerCase(),
          start,
          end,
          random_order_questions,
          random_order_answers,
          auto_move_questions,
          player_anonymat,
          thumbnail,
        },
        { where: { id: quiz_id } }
      );

      return res.status(200).json({
        status: 1,
        message: `The quiz based on ${quiz_title.toLowerCase()} have been successfully updated.`,
        quiz,
      });
    } catch (error) {
      console.log({ "Error update Quiz ": error });
    }
  },
  async activation(req, res) {
    try {
      const { id, status } = req.body;

      const course = await Quiz.update(
        { status: status === 1 ? 0 : 1 },
        { where: { id: id } }
      );

      if (course) {
        return res.status(200).json({
          status: 1,
          message: `The related status of quiz is successfully updated.`,
          course,
        });
      }
      return res.status(400).json({
        status: 0,
        message: `The related status of quiz (${
          status === 1 ? "unstarting" : "starting"
        }) is not updated.`,
      });
    } catch (error) {
      console.log({
        "Error update activation/desactivation process of quiz ": error,
      });
    }
  },
  async delete(req, res) {
    try {
      const { quiz_id } = req.params;
      await Quiz.destroy({ where: { id: quiz_id } });
      return res.status(200).json({
        status: 1,
        message: "The quiz have been successfully deleted.",
      });
    } catch (error) {
      console.log({ "Error delete quiz ": error });
    }
  },
};
