const sequelize = require("sequelize");
const database = require("../config/database");
const connection = new sequelize(database);
//
const User = require("../api/v1/models/inscription/User");
const Program = require("../api/v1/models/inscription/Program");
const Level = require("../api/v1/models/course/Level");
const Inscription = require("../api/v1/models/inscription/Inscription");
const Login = require("../api/v1/models/login/Login");
const Course = require("../api/v1/models/course/Course");
const Lesson = require("../api/v1/models/course/Lesson");
const Exercice = require("../api/v1/models/course/Exercice");
const Solution = require("../api/v1/models/course/Solution");
const Section = require("../api/v1/models/course/Section");
const Subscription = require("../api/v1/models/subscription/Subscription");
const Quiz = require("../api/v1/models/challenge/Quiz");
const Question = require("../api/v1/models/challenge/Question");
const Answers = require("../api/v1/models/challenge/Answers");
const QuizDetails = require("../api/v1/models/challenge/QuizDetails");
const Participate = require("../api/v1/models/challenge/Participate");
const Play = require("../api/v1/models/challenge/Play");
const AccumulatedPoints = require("../api/v1/models/challenge/AccumulatedPoints");
//
// Models connection links
//
User.init(connection);
Program.init(connection);
Level.init(connection);
Inscription.init(connection);
Login.init(connection);
Course.init(connection);
Lesson.init(connection);
Exercice.init(connection);
Solution.init(connection);
Section.init(connection);
Subscription.init(connection);
Quiz.init(connection);
Question.init(connection);
Answers.init(connection);
QuizDetails.init(connection);
Participate.init(connection);
Play.init(connection);
AccumulatedPoints.init(connection);

module.exports = connection;
