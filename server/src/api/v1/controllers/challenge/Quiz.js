const Quiz = require("../../models/challenge/Quiz");
const QuizDetails = require("../../models/challenge/QuizDetails");
const Participate = require("../../models/challenge/Participate");
const Play = require("../../models/challenge/Play");
const AccumulatedPoints = require("../../models/challenge/AccumulatedPoints");
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
        return res.status(200).json({
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
  async getCurrentById(req, res) {
    try {
      const { id } = req.params;

      const totalQuestions = await QuizDetails.count({
        where: { quiz_id: id },
      });
      const participates = await Participate.findAll({
        where: { quiz_id: id },
      });
      if (isEmpty(participates)) {
        return res.status(200).json({
          status: 0,
          length: 0,
          message: "No Participant yet.",
        });
      }
      var participations = [];
      for (let i = 0; i < participates.length; i++) {
        score = 0;
        const plays = await Play.findAll({
          where: { participate_id: participates[i].id },
        });
        const remainQuestions = totalQuestions - plays.length;
        for (let j = 0; j < plays.length; j++) {
          const accumulatedPoints = await AccumulatedPoints.findOne({
            where: { play_id: plays[i].id },
          });
          score = score + accumulatedPoints.points;
        }
        participations.push({
          participation_id: participates[i].id,
          participation_status: participates[i].status,
          response_dates: participates[i].response_dates,
          player: participates[i].pseudo,
          thumbnail: participates[i].thumbnail,
          score,
          remainQuestions,
        });
      }
      return res
        .status(200)
        .json({ status: 1, length: participations.length, participations });
    } catch (error) {
      console.log({ "Error get current Quiz by id ": error });
      return res.status(400).json({
        status: 0,
        message: "Error get cureent Quiz by id.",
      });
    }
  },
  async getCheckJoinQuiz(req, res) {
    try {
      const { code } = req.params;

      const quiz = await Quiz.findOne({ where: { code: code } });
      if (isEmpty(quiz)) {
        return res.status(200).json({
          status: false,
          length: 0,
          message: "No Quiz not found.",
        });
      }
      return res.status(200).json({ status: true, quiz });
    } catch (error) {
      console.log({ "Error get check Join Quiz": error });
      return res.status(400).json({
        status: false,
        message: "Error get check Join Quiz",
      });
    }
  },
  async onJoinQuiz(req, res) {
    try {
      const { quiz_id, user_id, names, avatar, request_dates } = req.body;

      const participate = await Participate.create({
        quiz_id,
        user_id,
        pseudo: names,
        thumbnail: avatar,
        request_dates,
      });
      return res.status(200).json({ status: true, participate });
    } catch (error) {
      console.log({ "Error on Join Quiz": error });
      return res.status(400).json({
        status: 0,
        message: "Error on Join Quiz",
      });
    }
  },
  async getParticipationRequestStatusById(req, res) {
    try {
      const { participation_id } = req.params;

      const joinRequest = await Participate.findOne({
        where: { id: participation_id },
      });
      return res.status(200).json({ status: true, joinRequest });
    } catch (error) {
      console.log({ "Error get check Join Request": error });
      return res.status(400).json({
        status: false,
        message: "Error get check Join Request",
      });
    }
  },
  async joinChallengePermission(req, res) {
    try {
      const { participation_id, response_dates, status } = req.body;

      const joinRequestPermission = await Participate.update(
        { response_dates, status },
        { where: { id: participation_id } }
      );

      return res.status(200).json({
        status: true,
        message: `The request permission is ${status ? "accepted" : "denied"}.`,
        joinRequestPermission,
      });
    } catch (error) {
      console.log({ "Error Join Request Permission": error });
      return res.status(400).json({
        status: false,
        message: "Error Join Request Permission",
      });
    }
  },
};
