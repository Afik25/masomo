const Solution = require("../../models/course/Solution");

module.exports = {
  async create(req, res) {
    try {
      const { exercice_id, title, type, version, description, thumbnails } =
        req.body;

      console.log({ "from sol ": req.body });

      const solution_count = await Solution.count();
      var code =
        "MCLES" +
        (solution_count + 1) +
        "-" +
        (new Date().getMonth() + 1) +
        "" +
        new Date().getDate() +
        "" +
        new Date().getSeconds();

      const solution = await Solution.create({
        exercice_id,
        code,
        title,
        type,
        version,
        description,
        thumbnails,
      });

      if (solution) {
        return res.status(200).json({
          status: 1,
          message: `Solution on ${title.toUpperCase()} added successfully.`,
        });
      }

      return res.status(400).json({
        status: 0,
        message: `Solution on ${title.toUpperCase()} add process failed.`,
      });
    } catch (error) {
      console.log({ "catch error create Solution ": error });
    }
  },
  async get(req, res) {
    try {
      const solutions = await Solution.findAll();
      if (!lessons) {
        return res.status.json({
          status: 0,
          length: 0,
          message: "Aucune information disponible",
        });
      }

      return res
        .status(200)
        .json({ status: 1, length: solutions.length, solutions });
    } catch (error) {
      console.log({ "catch error get solution ": error });
    }
  },
  async getByKey(req, res) {
    try {
      const { key } = req.params;

      const solution = await Solution.findAll({ where: { id: key } });
      if (!solution) {
        return res.status.json({
          status: 0,
          length: 0,
          message: `Aucune information disponible relative à la solution sur ${key}.`,
        });
      }

      return res
        .status(200)
        .json({ status: 1, length: solution.length, solution });
    } catch (error) {
      console.log({ "catch error get solution by key ": error });
    }
  },
  async update(req, res) {
    try {
      const { code, title, type, description } = req.body;
      const thumbnails = req?.file?.filename || "user.png";
      const { solution_id } = req.params;

      const check_title = await Solution.findOne({
        where: { title: title },
      });
      if (check_title) {
        return res
          .status(400)
          .json({ status: 0, message: "La solution fournie existe déjà." });
      }

      const solutionUpdated = await Solution.update(
        {
          code,
          title,
          type,
          description,
          thumbnails,
        },
        { where: { id: solution_id } }
      );

      return res.status(200).json({
        status: 1,
        message: `Les informations relatives à la solution sur ${title.toUpperCase()} ont bien étaient mise à jour.`,
        solutionUpdated,
      });
    } catch (error) {
      console.log({ "catch error update solution ": error });
    }
  },
  async delete(req, res) {
    try {
      const { solution_id } = req.params;
      await Solution.destroy({ where: { id: solution_id } });
      return res
        .status(200)
        .json({ status: 1, message: "La solution a bien été supprimé." });
    } catch (error) {
      console.log({ "catch error delete solution ": error });
    }
  },
};
