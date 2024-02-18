const express = require("express");
const router = express.Router();
const verifyJWT = require("../middlewares/verifyJWT");
const countries = require("../middlewares/countries.json");
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
//
// root configure
router.get("/auth/config", User.config);
//
router.get("/countries", function (req, res) {
  res.status(200).json({ countries });
});
//
// Inscription
router.post("/auth/register", Inscription.create);
router.post("/auth/complete", Inscription.complete);
router.post("/auth/complete/program", Inscription.completeProgram);
router.post("/auth/activation", Inscription.activateCompletion);
//
// login
router.post("/auth/login", Login.login);
router.get("/auth/refresh", Login.refreshToken);
router.get("/auth/logout", Login.logout);
//
// program and levels
router
  .post("/program", Program.create)
  .post("/program/activation", Program.activation)
  .get("/program", Program.get)
  .get("/program/customized", Program.getCustomized);
router
  .post("/level", Level.create)
  .post("/level/activation", Level.activation)
  .get("/level", Level.get)
  .get("/level/customized", Level.getCustomized);
//
// course
router.post("/course", Course.create).get("/course", Course.get);
router.get("/allcourses", Course.getAll);
//
// Lesson
router.post("/lesson", Lesson.create).get("/lesson", Lesson.get);
router.post("/exercice", Exercice.create).get("/exercice", Exercice.get);
router.post("/solution", Solution.create).get("/solution", Solution.get);

module.exports = router;
