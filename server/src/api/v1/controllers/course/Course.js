const Level = require("../../models/course/Level");
const Course = require("../../models/course/Course");
const Lesson = require("../../models/course/Lesson");
const Exercice = require("../../models/course/Exercice");
const Solution = require("../../models/course/Solution");
const { Op } = require("sequelize");

module.exports = {
  async create(req, res) {
    try {
      const { title, type, description } = req.body;

      const check_title = await Course.findOne({
        where: { title: title },
      });
      if (check_title) {
        return res
          .status(400)
          .json({ status: 0, message: "Le course exists already." });
      }

      const course_count = await Course.count();

      var code =
        "MC" +
        course_count +
        "-" +
        (new Date().getMonth() + 1) +
        "" +
        new Date().getDate() +
        "" +
        new Date().getSeconds();

      const course = await Course.create({
        code,
        title: title.toLowerCase(),
        type,
        description: description.toLowerCase(),
      });

      return res.status(200).json({
        status: 1,
        message: `The course of ${title.toUpperCase()} have been successfully saved.`,
        course,
      });
    } catch (error) {
      console.log({ "catch error create course ": error });
    }
  },
  async get(req, res) {
    try {
      const courses = await Course.findAll();
      if (courses == "" || courses == null) {
        return res.status(200).json({
          status: 0,
          length: 0,
          message: "No information about course available.",
        });
      }
      // sort the levels
      const _courses = courses.sort((a, b) => {
        if (a.title < b.title) return -1;
        if (a.title > b.title) return 1;

        return 0;
      });
      return res
        .status(200)
        .json({ status: 1, length: courses.length, courses: _courses });
    } catch (error) {
      console.log({ "catch error get course ": error });
    }
  },
  async getAll(req, res) {
    try {
      const levels = await Level.findAll();
      const courses = await Course.findAll();
      const lessons = await Lesson.findAll();
      const exercices = await Exercice.findAll();
      const solutions = await Solution.findAll();

      let distinc_lessons_arr = [];
      for (let i = 0; i < lessons.length; i++) {
        let obj = distinc_lessons_arr.find(
          (el) =>
            el?.course_id === lessons[i].course_id &&
            el?.level_id === lessons[i].level_id
        );

        if (!obj) {
          distinc_lessons_arr.push(lessons[i]);
        }
      }

      let allcourses = [];
      let arr_courses = [];
      for (let i = 0; i < levels.length; i++) {
        for (let j = 0; j < distinc_lessons_arr.length; j++) {
          if (levels[i].id === distinc_lessons_arr[j].level_id) {
            let obj_course = courses.find(
              (el) => el.id === distinc_lessons_arr[j].course_id
            );
            //
            const countLessons = await Lesson.count({
              where: {
                [Op.and]: [
                  { course_id: distinc_lessons_arr[j].course_id },
                  { level_id: distinc_lessons_arr[j].level_id },
                ],
              },
            });
            const countExercices = await Exercice.count({
              where: {
                lesson_id: distinc_lessons_arr[j].id,
              },
            });
            //
            arr_courses.push({
              level_id: distinc_lessons_arr[j].level_id,
              id: obj_course.id,
              code: obj_course.code,
              title: obj_course.title,
              total_lessons: countLessons,
              total_exercices: countExercices,
              status: obj_course.status,
              description: obj_course.description,
            });
          }
        }
        //
        allcourses.push({
          id: levels[i].id,
          title: levels[i].title,
          courses: arr_courses,
        });
        //
        arr_courses = [];
      }

      return res
        .status(200)
        .json({ allcourses, levels, courses, lessons, exercices, solutions });
    } catch (error) {
      console.log({ "catch error get all courses ": error });
    }
  },
  async getByKey(req, res) {
    try {
      const { key } = req.params;

      const course = await Course.findAll({ where: { id: key } });
      if (!course) {
        return res.status.json({
          status: 0,
          length: 0,
          message: `No information available about the course key ${key}.`,
        });
      }

      return res.status(200).json({ status: 1, length: course.length, course });
    } catch (error) {
      console.log({ "catch error get course by key ": error });
    }
  },
  async update(req, res) {
    try {
      const { code, title, type, description } = req.body;
      const thumbnails = req?.file?.filename || "user.png";
      const { course_id } = req.params;

      const check_title = await Course.findOne({
        where: { title: title },
      });
      if (check_title) {
        return res
          .status(400)
          .json({ status: 0, message: "Le cours renseigné existe déjà." });
      }

      const courseUpdated = await CourseModel.update(
        {
          code,
          title,
          type,
          description,
          thumbnails,
        },
        { where: { id: course_id } }
      );

      return res.status(200).json({
        status: 1,
        message: `Les informations relatives au cours de ${title.toUpperCase()} ont bien étaient mise à jour.`,
        courseUpdated,
      });
    } catch (error) {
      console.log({ "catch error update course ": error });
    }
  },
  async delete(req, res) {
    try {
      const { course_id } = req.params;
      await Course.destroy({ where: { id: course_id } });
      return res
        .status(200)
        .json({ status: 1, message: "Le cours a bien été supprimé." });
    } catch (error) {
      console.log({ "catch error delete course ": error });
    }
  },
};
