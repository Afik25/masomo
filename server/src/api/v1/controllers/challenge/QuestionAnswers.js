const Question = require("../../models/challenge/Question");
const Answers = require("../../models/challenge/Answers");
const QuizDetails = require("../../models/challenge/QuizDetails");
const { Op } = require("sequelize");
const { isEmpty, generateOTP } = require("../../../../utils/utils");

module.exports = {
  async create(req, res) {
    try {
      const {
        quiz_id,
        question_cover_name,
        question_description,
        question_grading,
        question_timing,
        question_type,
        answers,
        answer_cover_name,
        answer_text,
        answer_isGoodOne,
      } = req.body;

      console.log({ "1. Check req.body ": req.body });
      if (typeof question_type === "object"){

      }else{
        if(question_type === "tf"){}
      }

      // for (let idx = 0; idx < question_type.length; idx++) {
      //   const question = await Question.create({
      //     quiz_id: parseInt(quiz_id),
      //     description: question_description[idx],
      //     type: question_type[idx],
      //     timing: parseInt(question_timing[idx]),
      //     grading: parseInt(question_grading[idx]),
      //     thumbnail: question_cover_name[idx],
      //   });
      //   if (!isEmpty(answers)) {
      //     if (typeof answers === "string") {
      //       const _currentAnswer = answers.split("#")[1];
      //       await Answers.create({
      //         question_id: question.id,
      //         description: _currentAnswer,
      //         type: true,
      //       });
      //     }
      //     if (typeof answers === "object") {
      //       for (let j = 0; j < answers.length; j++) {
      //         const _currentAnswer = answers[j].split("#")[1];
      //         await Answers.create({
      //           question_id: question.id,
      //           description: _currentAnswer,
      //           type: true,
      //           thumbnail,
      //         });
      //       }
      //     }
      //   } else {
      //     for (let k = 0; k < answer_text.length; k++) {
      //       const _currentCover = answer_cover_name[k].split("#")[1];
      //       const _currentText = answer_text[k].split("#")[1];
      //       const _currentIsGoodOne = answer_isGoodOne[k].split("#")[1];
      //       await Answers.create({
      //         question_id: question.id,
      //         description: _currentText,
      //         type: _currentIsGoodOne,
      //         thumbnail:_currentCover,
      //       });
      //     }
      //   }
      // }
      // return res.status(200).json({
      //   success: true,
      //   message: `The quiz questions-answers set have been successfully created.`,
      // });
    } catch (error) {
      // console.log({ "Error create quiz ": error });
      res.json(error)
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