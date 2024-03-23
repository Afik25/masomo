const Program = require("../../models/inscription/Program");
const Level = require("../../models/course/Level");
const Course = require("../../models/course/Course");
const Lesson = require("../../models/course/Lesson");
const Section = require("../../models/course/Section");
const { Op } = require("sequelize");
const { isEmpty } = require("../../../../utils/utils");

module.exports = {
  async create(req, res) {
    try {
      const {
        course_id,
        title,
        type,
        language,
        description,
        thumbnails,
        fileSectionNames,
      } = req.body;

      const check_lesson = await Lesson.findOne({
        where: {
          [Op.and]: [{ title: title.toLowerCase() }, { course_id: course_id }],
        },
      });
      //
      if (isEmpty(check_lesson)) {
        const course_count = await Lesson.count({
          where: { course_id: course_id },
        });

        var code =
          "MCL" +
          course_id +
          course_count +
          "-" +
          (new Date().getMonth() + 1) +
          "" +
          new Date().getDate() +
          "" +
          new Date().getSeconds();

        const lesson = await Lesson.create({
          course_id,
          code,
          title,
          type,
          timing: 0.0,
          version: language,
          description,
        });

        for (let idx = 0; idx < thumbnails.length; idx++) {
          var _fileSectionNames = [];
          for (let j = 0; j < fileSectionNames.length; j++) {
            const section_number = fileSectionNames[j].split("#")[0];
            const section_file = fileSectionNames[j].split("#")[1];
            if (section_number == idx) {
              _fileSectionNames.push(section_file);
            }
          }
          await Section.create({
            lesson_id: lesson?.id,
            description: thumbnails[idx],
            thumbnails: `[${_fileSectionNames}]`,
          });
          _fileSectionNames = [];
        }

        return res.status(200).json({
          status: 1,
          message: `Lessons ${title.toUpperCase()} saved successfully`,
          lesson,
        });
      }

      return res.status(400).json({
        status: 0,
        message: `Saving lessons ${title.toUpperCase()} failed.`,
      });
    } catch (error) {
      console.log({ "Error create lesson ": error });
    }
  },
  async get(req, res) {
    try {
      const lessons = await Lesson.findAll();
      if (!lessons) {
        return res.status.json({
          status: 0,
          length: 0,
          message: "Aucune information disponible",
        });
      }

      return res
        .status(200)
        .json({ status: 1, length: lessons.length, lessons });
    } catch (error) {
      console.log({ "catch error get lesson ": error });
    }
  },
  async getCustomized(req, res) {
    try {
      const programs = await Program.findAll();
      const levels = await Level.findAll();
      const courses = await Course.findAll();
      const lessons = await Lesson.findAll();
      const sections = await Section.findAll();
      if (
        programs == "" ||
        programs == null ||
        levels == "" ||
        levels == null ||
        courses == "" ||
        courses == null ||
        lessons == "" ||
        lessons == null ||
        sections == "" ||
        sections == null
      ) {
        return res.status(200).json({
          status: 0,
          length: 0,
          message: "No information about lessons available.",
        });
      }
      const customizedCourses = [];
      var _programsLevels = [];
      var _levelsCourses = [];
      for (let i = 0; i < programs.length; i++) {
        const _levels = levels.filter((el) => el.program_id == programs[i].id);

        for (let j = 0; j < _levels.length; j++) {
          const _getCourses = courses.filter(
            (el) => el.level_id == _levels[j].id
          );
          _levelsCourses.push({ level: _levels[j], courses: _getCourses });
        }
        _programsLevels.push({
          program_id: programs[i].id,
          program_title: programs[i].title,
          program_language: programs[i].language,
          levels: _levelsCourses,
        });

        const isFound = customizedCourses?.some((element) => {
          if (element.country === programs[i].country) {
            return true;
          }
          return false;
        });
        //
        if (isFound) {
          const objIndex = customizedCourses.findIndex(
            (element) => element.country === programs[i].country
          );
          customizedCourses[objIndex].content.push(..._programsLevels);
        } else {
          customizedCourses.push({
            country: programs[i].country,
            content: _programsLevels,
          });
        }
        _programsLevels = [];
        _levelsCourses = [];
      }
      // sort the customized courses
      const _customizedCourses = customizedCourses.sort((a, b) => {
        if (a.country < b.country) return -1;
        if (a.country > b.country) return 1;

        return 0;
      });
      return res.status(200).json({
        status: 1,
        length: _customizedCourses.length,
        customizedCourses: _customizedCourses,
      });
    } catch (error) {
      console.log({ "catch error get customized course ": error });
    }
  },
  async getByKey(req, res) {
    try {
      const { key } = req.params;

      const lesson = await Lesson.findAll({ where: { id: key } });
      if (!lesson) {
        return res.status.json({
          status: 0,
          length: 0,
          message: `Aucune information disponible relative à la leçon sur ${key}.`,
        });
      }

      return res.status(200).json({ status: 1, length: lesson.length, lesson });
    } catch (error) {
      console.log({ "catch error get lesson by key ": error });
    }
  },
  async update(req, res) {
    try {
      const { code, title, type, description } = req.body;
      const thumbnails = req?.file?.filename || "user.png";
      const { lesson_id } = req.params;

      const check_title = await Lesson.findOne({
        where: { title: title },
      });
      if (check_title) {
        return res
          .status(400)
          .json({ status: 0, message: "La leçon renseignée existe déjà." });
      }

      const lessonUpdated = await Lesson.update(
        {
          code,
          title,
          type,
          description,
          thumbnails,
        },
        { where: { id: lesson_id } }
      );

      return res.status(200).json({
        status: 1,
        message: `Les informations relatives à la leçon sur ${title.toUpperCase()} ont bien étaient mise à jour.`,
        lessonUpdated,
      });
    } catch (error) {
      console.log({ "catch error update lesson ": error });
    }
  },
  async delete(req, res) {
    try {
      const { lesson_id } = req.params;
      await Lesson.destroy({ where: { id: lesson_id } });
      return res
        .status(200)
        .json({ status: 1, message: "La leçon a bien été supprimé." });
    } catch (error) {
      console.log({ "catch error delete lesson ": error });
    }
  },
};
