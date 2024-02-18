const Exercice = require("../../models/course/Exercice");
const { Op } = require("sequelize");

module.exports = {
  async create(req, res) {
    try {
      const { lesson_id, title, type, version, description, thumbnails } =
        req.body;

      const exercice_count = await Exercice.count();
      var code =
        "MCLE" +
        (exercice_count + 1) +
        "-" +
        (new Date().getMonth() + 1) +
        "" +
        new Date().getDate() +
        "" +
        new Date().getSeconds();

      const exercice = await Exercice.create({
        lesson_id,
        code,
        title,
        type,
        version,
        description,
        thumbnails,
      });

      if (exercice) {
        return res.status(200).json({
          status: 1,
          message: `Execice on ${title.toUpperCase()} added successfully.`,
        });
      }

      return res.status(400).json({
        status: 0,
        message: `Execice on ${title.toUpperCase()} add process failed.`,
      });
    } catch (error) {
      console.log({ "catch error create exercice ": error });
    }
  },
  async get(req, res) {
    try {
      const exercices = await Exercice.findAll();
      if (!lessons) {
        return res.status.json({
          status: 0,
          length: 0,
          message: "Aucune information disponible",
        });
      }

      return res
        .status(200)
        .json({ status: 1, length: exercices.length, exercices });
    } catch (error) {
      console.log({ "catch error get exercice ": error });
    }
  },
  async getByKey(req, res) {
    try {
      const { key } = req.params;

      const exercice = await Exercice.findAll({ where: { id: key } });
      if (!exercice) {
        return res.status.json({
          status: 0,
          length: 0,
          message: `Aucune information disponible relative à l'exercise sur ${key}.`,
        });
      }

      return res
        .status(200)
        .json({ status: 1, length: exercice.length, exercice });
    } catch (error) {
      console.log({ "catch error get exercice by key ": error });
    }
  },
  async update(req, res) {
    try {
      const { code, title, type, description } = req.body;
      const thumbnails = req?.file?.filename || "user.png";
      const { exercice_id } = req.params;

      const check_title = await Exercice.findOne({
        where: { title: title },
      });
      if (check_title) {
        return res
          .status(400)
          .json({ status: 0, message: "L'exercice renseigné existe déjà." });
      }

      const exerciceUpdated = await Exercice.update(
        {
          code,
          title,
          type,
          description,
          thumbnails,
        },
        { where: { id: exercice_id } }
      );

      return res.status(200).json({
        status: 1,
        message: `Les informations relatives à l'exercise sur ${title.toUpperCase()} ont bien étaient mise à jour.`,
        exerciceUpdated,
      });
    } catch (error) {
      console.log({ "catch error update exercice ": error });
    }
  },
  async delete(req, res) {
    try {
      const { exercice_id } = req.params;
      await Exercice.destroy({ where: { id: exercice_id } });
      return res
        .status(200)
        .json({ status: 1, message: "L'exercise a bien été supprimé." });
    } catch (error) {
      console.log({ "catch error delete exercice ": error });
    }
  },
};
