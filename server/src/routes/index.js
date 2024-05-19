const express = require("express");
const router = express.Router();
const verifyJWT = require("../middlewares/verifyJWT");
const uploadFiles = require("../middlewares/uploadFiles");
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
const Quiz = require("../api/v1/controllers/challenge/Quiz");
const QuestionAnswers = require("../api/v1/controllers/challenge/QuestionAnswers");
//
// root configure and setup
router.get("/auth/config", User.config);
//
router.get("/countries", function (req, res) {
  res.status(200).json({ countries });
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
  .post(
    "/learning/challenge/quiz",
    uploadFiles.upload.single("thumbnail"),
    Quiz.create
  )
  .get("/learning/challenge/quiz", () => console.log("get quiz"));
router
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

{
  /* <svg
  width="1179"
  height="1152"
  viewBox="0 0 1179 1152"
  fill="none"
  xmlns="http://www.w3.org/2000/svg"
>
  <path
    d="M334.326 882.433C286.784 840.832 249.565 788.747 225.608 730.292C201.651 671.837 191.612 608.613 196.284 545.613C200.956 482.612 220.21 421.56 252.528 367.279C284.845 312.997 329.339 266.972 382.497 232.838C435.656 198.704 496.022 177.396 558.828 170.597C621.635 163.798 685.162 171.694 744.393 193.661C803.625 215.629 856.938 251.066 900.123 297.174C943.307 343.282 975.181 398.799 993.227 459.34"
    stroke="black"
  ></path>{" "}
  <path
    d="M1004.79 648.64C1013.37 664.833 1015.93 679.803 1012.64 693.203C1009.34 706.602 1000.18 718.513 985.151 728.551C955.073 748.642 902.782 760.368 833.826 762.389C764.893 764.409 681.994 756.653 594.053 739.949C506.113 723.245 416.474 698.228 334.785 667.593C253.093 636.957 182.462 601.867 130.485 566.107C104.497 548.227 83.6757 530.526 68.4327 513.478C53.1864 496.426 43.5431 480.052 39.8701 464.829C36.2015 449.624 38.5536 435.84 46.684 423.775C54.8252 411.694 68.7879 401.296 88.4086 392.947C127.656 376.246 187.89 368.446 262.665 370.429"
    stroke="#050505"
  ></path>{" "}
  <path
    d="M744.537 203.285C799.611 142.519 849.675 104 888.524 92.3818C907.933 86.5773 924.054 87.6324 936.552 95.1925C949.055 102.756 958.037 116.891 963.03 137.469C973.02 178.646 966.532 243.539 944.284 324.159C922.042 404.757 885.047 497.461 837.876 590.785C790.707 684.108 735.44 773.941 678.925 849.156C622.405 924.378 567.139 981.646 519.979 1013.9C496.398 1030.02 475.396 1039.52 457.537 1042.34C439.696 1045.16 425.016 1041.31 413.989 1030.79C402.942 1020.24 395.739 1003.16 392.55 980.179C389.362 957.207 390.194 928.403 395.163 894.489"
    stroke="#050505"
  ></path>{" "}
  <path
    d="M838.407 907.01C820.956 952.118 791.357 980.223 752.688 988.55C713.993 996.883 667.503 985.135 617.98 954.392C568.464 923.652 517.759 875.063 471.093 813.609C424.428 752.157 383.499 680.076 352.52 604.785C321.541 529.492 301.636 453.721 294.846 385.27C288.056 316.813 294.634 258.189 313.854 215.404C333.065 172.639 364.201 147.259 404.047 141.774C443.925 136.285 491.182 150.907 540.967 184.251"
    stroke="#050505"
  ></path>
</svg>; */
}
