const User = require("../../models/inscription/User");
const Inscription = require("../../models/inscription/Inscription");
const Subscription = require("../../models/subscription/Subscription");
//
const { generateOTP, capitalize } = require("../../../../utils/utils");
const bcrypt = require("bcrypt");
const moment = require("moment");
const uuid = require("uuid");

module.exports = {
  async create(req, res) {
    try {
      const { prename, name, sys_role, username, password } = req.body;

      const check_username = await User.findOne({
        where: { username: username.toLowerCase() },
      });
      if (check_username) {
        return res.status(400).json({
          status: 0,
          message: "The username is already used!",
        });
      }
      const sys_id = uuid.v1();
      const user = await User.create({
        prename: prename.toLowerCase(),
        name: name.toLowerCase(),
        sys_role,
        sys_id,
        username: username.toLowerCase(),
        password,
        is_completed: false,
      });

      if (user) {
        return res.status(200).json({
          status: 1,
          message: `Inscription process for ${capitalize(prename)} ${capitalize(
            name
          )} successfully.`,
          user,
        });
      }

      return res.status(400).json({
        status: 0,
        message: `Inscription process for ${capitalize(prename)} ${capitalize(
          name
        )} failed.`,
      });
    } catch (error) {
      console.log({ "Error create inscription ": error });
    }
  },
  async complete(req, res) {
    try {
      const {
        id,
        gender,
        sys_role,
        telephone,
        mail,
        birth,
        birth_location,
        nationality,
      } = req.body;
      const {
        dates,
        location,
        latitude,
        longitude,
        device,
        ip_address,
        operating_system,
        navigator,
        end_date,
      } = req.body;

      const getUser = await User.findOne({ where: { id: id } });
      const phone = telephone || null;
      if (getUser.telephone != null && !getUser.telephone.includes(phone)) {
        const check_phone = await User.findOne({
          where: { telephone: String(telephone) },
        });
        if (check_phone) {
          return res
            .status(400)
            .json({ status: 0, message: "The phone number is already used!" });
        }
      }
      const email = mail || null;
      if (
        getUser.mail != null &&
        email != getUser.mail &&
        (email != null || email == "")
      ) {
        const check_mail = await User.findOne({ where: { mail: mail } });
        if (check_mail) {
          return res
            .status(400)
            .json({ status: 0, message: "The mail is already used!" });
        }
      }

      const user = await User.update(
        {
          gender,
          telephone,
          mail,
          birth,
          birth_location,
          nationality,
          sys_role,
          status: 1,
        },
        { where: { id: id }, individualHooks: true }
      );
      const user_id = id;
      const inscription = await Inscription.create({
        user_id,
        dates,
        location,
        latitude,
        longitude,
        device,
        ip_address,
        operating_system,
        navigator,
      });
      if (inscription) {
        const code = generateOTP();
        await Subscription.create({
          student_id: user_id,
          dates_sub: dates,
          type_sub: "initial",
          package_sub: "Week",
          amount: 0.0,
          currency: "USD",
          reference_transaction: code,
          transaction_status: "approved",
          pay_method: "initial",
          end_sub: end_date,
        });
        return res.status(200).json({
          status: 1,
          message: `Completion first step for ${getUser.prename.toUpperCase()} ${getUser.name.toUpperCase()} successfully.`,
          user,
          code,
          inscription_id: inscription.id,
        });
      }

      return res.status(400).json({
        status: 0,
        message: `Completion first step for ${getUser.prename.toUpperCase()} ${getUser.name.toUpperCase()} failed.`,
      });
    } catch (error) {
      console.log({ "Error create inscription(completion) ": error });
    }
  },
  async completeProgram(req, res) {
    try {
      const { inscription_id, level_id } = req.body;

      const _inscription = await Inscription.update(
        { level_id },
        { where: { id: inscription_id } }
      );
      if (_inscription) {
        const inscription = await Inscription.findOne({
          where: { id: inscription_id },
        });
        return res.status(200).json({
          status: 1,
          message: "Completion's program done successfully.",
          inscription,
        });
      }

      return res.status(400).json({
        status: 0,
        message: "Completion's program failed.",
      });
    } catch (error) {
      console.log({ "Error on Completion's program ": error });
    }
  },
  async resendActivationCode(req, res) {
    try {
      const { student_id, old_code } = req.body;

      const subscriptionFindout = await Subscription.findAll({
        limit: 1,
        where: { student_id: student_id, reference_transaction: old_code },
        order: [["id", "DESC"]],
      });

      if (subscriptionFindout) {
        const code = generateOTP();
        await Subscription.update(
          { reference_transaction: code },
          { where: { id: subscriptionFindout[0].id } }
        );
        return res.status(200).json({
          status: 1,
          message: "New code generated successfully.",
          code,
        });
      }

      return res.status(400).json({
        status: 0,
        message: "generation process of the new confirmation code failed.",
      });
    } catch (error) {
      console.log({ "Error resend activation code ": error });
    }
  },
  async activateCompletion(req, res) {
    try {
      const { id, confirmation_code, is_completed } = req.body;

      const check_subscription = await Subscription.findOne({
        where: { reference_transaction: confirmation_code },
      });

      if (check_subscription) {
        const user = await User.update({ is_completed }, { where: { id: id } });
        return res.status(200).json({
          status: 1,
          message: "Account confirmed and activated successfully.",
          user,
        });
      }

      return res.status(400).json({
        status: 0,
        message: "Account confirmation failed.",
      });
    } catch (error) {
      console.log({ "Error confirmation account ": error });
    }
  },
};
