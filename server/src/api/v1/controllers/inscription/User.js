const User = require("../../models/inscription/User");
const Inscription = require("../../models/inscription/Inscription");
const Program = require("../../models/inscription/Program");
const Level = require("../../models/course/Level");
const Subscription = require("../../models/subscription/Subscription");
const Login = require("../../models/login/Login");
const Course = require("../../models/course/Course");
const Lesson = require("../../models/course/Lesson");
const Exercice = require("../../models/course/Exercice");
const Participate = require("../../models/challenge/Participate");
//
const { Op } = require("sequelize");
const uuid = require("uuid");

const { generatePassword } = require("../../../../utils/utils");

module.exports = {
  async create(req, res) {
    try {
      const {
        prename,
        name,
        gender,
        telephone,
        mail,
        birth,
        birth_location,
        nationality,
        sys_role,
        username,
      } = req.body;

      const thumbnails = req?.file?.filename || "";

      const phone = telephone || null;
      if (phone) {
        const check_phone = await User.findOne({
          where: {
            telephone: {
              [Op.like]: `%${telephone.toString()}%`,
            },
          },
        });
        if (check_phone) {
          return res
            .status(400)
            .json({ status: 0, message: "The phone number is already used!" });
        }
      }

      const email = mail || null;
      if (email) {
        const check_mail = await User.findOne({ where: { mail: mail } });
        if (check_mail) {
          return res
            .status(400)
            .json({ status: 0, message: "The mail is already used!" });
        }
      }

      const check_username = await User.findOne({
        where: { username: username },
      });
      if (check_username) {
        return res.status(400).json({
          status: 0,
          message: `The username ${username} is already used!`,
        });
      }
      const sys_id = uuid.v1();
      const password = generatePassword(6);
      const user = await User.create({
        prename,
        name,
        gender,
        telephone,
        mail,
        birth,
        birth_location,
        nationality,
        sys_role,
        sys_id,
        username,
        password,
        thumbnails,
        is_completed: false,
      });

      if (user) {
        return res.status(200).json({
          status: 1,
          password,
          message: `The registration of ${
            prename.charAt(0).toUpperCase() + prename.slice(1).toLowerCase()
          } ${name.toUpperCase()} has been successfully done.`,
          user,
        });
      }
      return res.status(400).json({
        status: 0,
        message: `The registration of ${
          prename.charAt(0).toUpperCase() + prename.slice(1).toLowerCase()
        } ${name.toUpperCase()} failed.`,
        user,
      });
    } catch (error) {
      console.log({ "catch error create User : ": error });
    }
  },
  async get(req, res) {
    try {
      const users = await User.findAll();
      if (users == "" || users == null) {
        return res.status(200).json({
          status: 0,
          length: 0,
          message: "No information available.",
        });
      }

      return res.status(200).json({ status: 1, length: users.length, users });
    } catch (error) {
      console.log({ "catch error get Users ": error });
    }
  },
  async getByKey(req, res) {
    try {
      const { key } = req.params;

      const user = await User.findAll({ where: { id: key } });
      if (!user) {
        return res.status.json({
          status: 0,
          length: 0,
          message: `No information available.`,
        });
      }

      return res.status(200).json({ status: 1, length: user.length, user });
    } catch (error) {
      console.log({ "catch error get User by key ": error });
    }
  },
  async update(req, res) {
    try {
      const {
        prename,
        name,
        gender,
        telephone,
        mail,
        birth,
        birth_location,
        role,
        username,
        password,
      } = req.body;
      const { id } = req.params;

      const thumbnails = req?.file?.filename || "";

      const phone = telephone || null;
      if (phone) {
        const check_phone = await User.findOne({
          where: { telephone: telephone },
        });
        if (check_phone) {
          return res.status(400).json({
            status: 0,
            message: "The phone number is already used!",
          });
        }
      }

      const email = mail || null;
      if (email) {
        const check_mail = await User.findOne({ where: { mail: mail } });
        if (check_mail) {
          return res
            .status(400)
            .json({ status: 0, message: "The mail is already used!" });
        }
      }

      const check_username = await User.findOne({
        where: { username: username },
      });
      if (check_username) {
        return res.status(400).json({
          status: 0,
          message: `The username ${username} is already used!`,
        });
      }

      const user = await User.update(
        {
          prename,
          name,
          gender,
          telephone,
          mail,
          birth,
          birth_location,
          role,
          username,
          password,
          thumbnails,
        },
        { where: { id: id } }
      );

      if (user) {
        return res.status(200).json({
          status: 1,
          message: `The update of ${
            prename.charAt(0).toUpperCase() + prename.slice(1).toLowerCase()
          } ${name.toUpperCase()} has been successfully done.`,
          user,
        });
      }
      return res.status(400).json({
        status: 0,
        message: `The update of ${
          prename.charAt(0).toUpperCase() + prename.slice(1).toLowerCase()
        } ${name.toUpperCase()} failed.`,
        user,
      });
    } catch (error) {
      console.log({ "catch error update User ": error });
    }
  },
  async delete(req, res) {
    try {
      const { id } = req.params;
      await User.destroy({ where: { id: id } });
      return res
        .status(200)
        .json({ status: 1, message: "The user has been deleted." });
    } catch (error) {
      console.log({ "Error delete User ": error });
    }
  },
  async config(req, res) {
    try {
      // Initial configurations
      //
      const prename = "System";
      const name = "Admin";
      const telephone = "+243 977202072";
      const mail = "admin@masomo.edu";
      const username = "admin";
      const password = "root@1";
      const sys_id = uuid.v1();
      const sys_role = "admin";
      const is_completed = false;

      const check_mail = await User.findOne({ where: { mail: mail } });
      if (check_mail) {
        return res.status(200).json({
          status: 1,
          message: "The initial config have been already done.",
        });
      }

      const user = await User.create({
        prename,
        name,
        telephone,
        mail,
        sys_role,
        sys_id,
        username,
        password,
        is_completed,
      });

      if (user) {
        return res.status(200).json({
          status: 1,
          message: "The initial setup process have successfully done.",
          user,
        });
      }

      return res.status(400).json({
        status: 0,
        message: "The root setup process have failed.",
        user,
      });
    } catch (error) {
      console.log({ "Error initial configure process ": error });
    }
  },
  async dashboardAdmin(req, res) {
    try {
      // student id
      const { key } = req.params;

      console.log({ "req.params": req.params });

      const inscription = await Inscription.findOne({
        where: { user_id: parseInt(key) },
      });
      if (!inscription) {
        return res.status.json({
          status: false,
          message: "The student is not inscribed.",
        });
      }
      const level = await Level.findOne({
        where: { id: parseInt(inscription.level_id) },
      });
      const program = await Program.findOne({
        where: { id: parseInt(level.program_id) },
      });
      const subscription = await Subscription.findAll({
        limit: 1,
        where: { student_id: parseInt(key) },
        order: [["id", "DESC"]],
      });
      const logins = await Login.findAll({
        where: { user_id: parseInt(key) },
      });
      //
      const { count, rows } = await Course.findAndCountAll({
        where: { level_id: level.id },
      });
      var total_lesson = 0;
      var total_exercise = 0;
      for (let i = 0; i < rows.length; i++) {
        const lessons = await Lesson.findAndCountAll({
          where: { course_id: parseInt(rows[i].id) },
        });
        total_lesson = total_lesson + lessons.count;

        for (let j = 0; j < lessons.rows.length; j++) {
          const _countExercises = await Exercice.count({
            where: { lesson_id: parseInt(lessons.rows[j].id) },
          });
          total_exercise = total_exercise + _countExercises;
        }
      }

      const total_challenge = await Participate.count({
        where: {
          [Op.and]: [{ user_id: parseInt(key) }, { status: true }],
        },
      });

      const dashboardData = {
        level: level.title,
        program_country: program.country,
        program_language: program.language,
        program_title: program.title,
        subscription_end: subscription.end_sub,
        last_login: logins[logins.length - 1],
        logins: logins,
        total_course: count,
        courses: rows,
        total_lesson: total_lesson,
        total_exercise: total_exercise,
        total_challenge: total_challenge,
      };

      return res.status(200).json({ status: true, dashboardData });
    } catch (error) {
      console.log({ "catch error get Student Dashboard ": error });
      return res.status(400).json({ status: false, error });
    }
  },
  async dashboardStudent(req, res) {
    try {
      // student id
      const { key } = req.params;

      const inscription = await Inscription.findAll({
        limit:1,
        where: { user_id: parseInt(key) },
        order: [["id", "DESC"]],
      });
      if (!inscription) {
        return res.status.json({
          status: false,
          message: "The student is not inscribed.",
        });
      }
      const level = await Level.findOne({
        where: { id: parseInt(inscription[0].level_id) },
      });
      const program = await Program.findOne({
        where: { id: parseInt(level.program_id) },
      });
      const subscription = await Subscription.findAll({
        limit: 1,
        where: { student_id: parseInt(key) },
        order: [["id", "DESC"]],
      });
      const logins = await Login.findAll({
        where: { user_id: parseInt(key) },
      });
      //
      const { count, rows } = await Course.findAndCountAll({
        where: { level_id: level.id },
      });
      var total_lesson = 0;
      var total_exercise = 0;
      for (let i = 0; i < rows.length; i++) {
        const lessons = await Lesson.findAndCountAll({
          where: { course_id: parseInt(rows[i].id) },
        });
        total_lesson = total_lesson + lessons.count;

        for (let j = 0; j < lessons.rows.length; j++) {
          const _countExercises = await Exercice.count({
            where: { lesson_id: parseInt(lessons.rows[j].id) },
          });
          total_exercise = total_exercise + _countExercises;
        }
      }

      const total_challenge = await Participate.count({
        where: {
          [Op.and]: [{ user_id: parseInt(key) }, { status: true }],
        },
      });

      const dashboardData = {
        level: level.title,
        program_country: program.country,
        program_language: program.language,
        program_title: program.title,
        subscription_end: subscription[0].end_sub,
        lastLogin: logins[logins.length - 1],
        logins: logins,
        totalCourse: count,
        courses: rows,
        totalLesson: total_lesson,
        totalExercise: total_exercise,
        totalChallenge: total_challenge,
      };

      return res.status(200).json({ status: true, dashboardData });
    } catch (error) {
      console.log({ "catch error get Student Dashboard ": error });
      return res.status(400).json({ status: false, error });
    }
  },
};
