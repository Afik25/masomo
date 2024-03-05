const Lesson = require("../../models/course/Lesson");
const { Op } = require("sequelize");

module.exports = {
  async create(req, res) {
    try {
      const {
        course_id,
        level_id,
        title,
        type,
        version,
        description,
        thumbnail,
        audio,
        video,
        pdf,
      } = req.body;

      var check_lessons = [];
      var levels_arr = [];

      for (let index = 0; index < level_id.length; index++) {
        const check = await Lesson.findOne({
          where: {
            [Op.and]: [{ title: title }, { level_id: level_id[index].value }],
          },
        });
        //
        if (check != null) {
          check_lessons.push(level_id[index].label);
        } else {
          const course_count = await Lesson.count({
            where: {
              [Op.and]: [
                { course_id: course_id },
                { level_id: level_id[index].value },
              ],
            },
          });

          var code =
            "MCL" +
            level_id[index].value +
            course_count +
            "-" +
            (new Date().getMonth() + 1) +
            "" +
            new Date().getDate() +
            "" +
            new Date().getSeconds();

          await Lesson.create({
            course_id,
            level_id: level_id[index].value,
            code,
            title,
            type,
            version,
            description,
            thumbnails,
          });
          //
          levels_arr.push(level_id[index].label);
        }
      }

      return res.status(200).json({
        status: 1,
        message: `Lessons ${title.toUpperCase()} ${
          levels_arr.length > 0
            ? "added successfully for level(s) : " + levels_arr
            : "did not added"
        } ${
          check_lessons.length > 0
            ? "; it exists already for level(s) : " + check_lessons
            : "."
        }`,
      });
    } catch (error) {
      console.log({ "catch error create lesson ": error });
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
