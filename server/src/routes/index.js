const express = require("express");
const router = express.Router();
const verifyJWT = require("../middlewares/verifyJWT");
const uploadFiles = require("../middlewares/uploadFiles");
const countries = require("../middlewares/countries.json");
const fs = require("fs");
const path = require("path");
//
const User = require("../api/v1/controllers/inscription/User");
const Program = require("../api/v1/controllers/inscription/Program");
const Level = require("../api/v1/controllers/inscription/Level");
const Inscription = require("../api/v1/controllers/inscription/Inscription");
const Course = require("../api/v1/controllers/course/Course");
const Lesson = require("../api/v1/controllers/course/Lesson");
const Exercice = require("../api/v1/controllers/course/Exercice");
const Solution = require("../api/v1/controllers/course/Solution");
const Login = require("../api/v1/controllers/login/Login");
const Theme = require("../api/v1/controllers/challenge/Theme");
const Quiz = require("../api/v1/controllers/challenge/Quiz");
const QuestionAnswers = require("../api/v1/controllers/challenge/QuestionAnswers");
//
// root configure and setup
router.get("/auth/config", User.config);
//
router.get("/countries", function (req, res) {
  res.status(200).json({ countries });
});

router.get("/avatars", function (req, res) {
  let directory_path = path.join(__dirname, "..","files","avatars");

  fs.readdir(directory_path, function (err, avatars) {
    if (err) {
      res.status(200).json({ status: false, message: "avatars unavailable!" });
    }
    res.status(200).json({ status: true, avatars });
  });
});
//
// User
router.get("/user/dashboard/student/:key", User.dashboardStudent);
//
// Inscription
router.post("/auth/register", Inscription.create);
router.post("/auth/complete", Inscription.complete);
router.post("/auth/complete/program", Inscription.completeProgram);
router.post("/auth/resend/activation/code", Inscription.resendActivationCode);
router.post("/auth/activation", Inscription.activateCompletion);
//
// login
router.post("/auth/login", Login.login);
router.get("/auth/refresh", Login.refreshToken);
router.get("/auth/logout", Login.logout);
//
// program and levels
router
  .post("/programs", Program.create)
  .post("/programs/activation", Program.activation)
  .get("/programs", Program.get)
  .get("/programs/customized", Program.getCustomized);
router
  .post("/levels", Level.create)
  .post("/levels/activation", Level.activation)
  .get("/levels", Level.get)
  .get("/levels/customized", Level.getCustomized);
//
// course
router
  .post("/courses", Course.create)
  .post("/courses/activation", Course.activation)
  .get("/courses", Course.get);
router.get("/courses/customized", Course.getCustomized);
router.get("/courses/customized/by/levels", Course.getCustomizedByLevels);
router.get("/courses/all", Course.getAll);
//
// Lesson
router
  .post(
    "/courses/lessons",
    uploadFiles.upload.array("thumbnailsImages"),
    Lesson.create
  )
  .post("/courses/lessons/activation", Lesson.activation)
  .get("/courses/lessons", Lesson.get);
router.get("/courses/lessons/customized", Lesson.getCustomized);
//
// Exercises
router
  .post(
    "/courses/lessons/exercises",
    uploadFiles.upload.array("thumbnailsImages"),
    Exercice.create
  )
  .post("/courses/lessons/exercises/activation", Exercice.activation)
  .get("/courses/lessons/exercises", Exercice.get);
router.get("/courses/lessons/exercises/customized", Exercice.getCustomized);
//
// Solutions
router
  .post(
    "/courses/lessons/exercises/solutions",
    uploadFiles.upload.array("thumbnailsImages"),
    Solution.create
  )
  .post("/courses/lessons/exercises/solutions/activation", Solution.activation)
  .get("/courses/lessons/exercises/solutions", Solution.get);
router.get(
  "/courses/lessons/exercises/solutions/customized",
  Solution.getCustomized
);
//
// Challenge
router
  .get("/learning/challenge/themes", Theme.get)
  .get("/learning/challenge/quiz/join/:code", Quiz.getCheckJoinQuiz)
  .get("/learning/challenge/quiz/join/request/status/:participation_id", Quiz.getParticipationRequestStatusById)
  .post("/learning/challenge/quiz/join/request/status", Quiz.joinChallengePermission)
  .post("/learning/challenge/quiz/join", Quiz.onJoinQuiz)
  .get("/learning/challenge/quiz/:key", Quiz.getByUser)
  .get("/learning/challenge/quiz/leaderboard/:id", Quiz.getCurrentById)
  .post(
    "/learning/challenge/quiz",
    uploadFiles.upload.single("thumbnail"),
    Quiz.create
  )
  .post(
    "/learning/challenge/quiz/question_answers",
    uploadFiles.upload.fields([
      { name: "question_cover" },
      { name: "answer_cover" },
    ]),
    QuestionAnswers.create
  )
  .get("/learning/challenge/quiz/question_answers", () =>
    console.log("get question_answers")
  );
module.exports = router;

