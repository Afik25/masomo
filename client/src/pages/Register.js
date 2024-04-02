import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { Link, useNavigate } from "react-router-dom";
import ControlLanguage from "../components/languages/ControlLanguage";
//
import { BsEyeSlash, BsEye } from "../middlewares/icons";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { validationSchemaRegister, wait } from "../utils/utils";
//
import { inscription } from "../services/authentication";

const Register = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [showPwd, setShowPwd] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");
  const [classNameMsg, setClassNameMsg] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    mode: "onTouched",
    resolver: yupResolver(validationSchemaRegister),
    defaultValues: { gcu: false },
  });

  const onSubmit = async (data) => {
    setIsSending(true);
    await wait(1000);
    inscription(data)
      .then((response) => {
        if (response?.data?.status === 1) {
          setIsSending(false);
          setClassNameMsg("msg-box msg-box-success fade-in");
          setResponseMessage(response?.data?.message);
          reset();
        }
        const timer = setTimeout(() => {
          setClassNameMsg("display-none");
          navigate("/login", { replace: true });
        }, 4000);
        return () => clearTimeout(timer);
      })
      .catch((error) => {
        setIsSending(false);
        setClassNameMsg("msg-box msg-box-failed fade-in");
        if (!error?.response) {
          setResponseMessage("No server response");
        } else {
          setResponseMessage(error?.response?.data?.message);
        }
        const timer = setTimeout(() => {
          setClassNameMsg("display-none");
        }, 4000);
        return () => clearTimeout(timer);
      });
  };

  return (
    <React.Fragment>
      <Helmet>
        <title>MASOMO - {t("register.text-1")}</title>
        <meta
          name="description"
          content="Inscrivez-vous afin d'Étudier avec le contenu éducatif de qualité basé sur le programme d'étude national relatif à chaque niveau."
        />
        <meta
          name="keywords"
          content="École, School, Masomo, Étudier, Éducation"
        />
      </Helmet>
      <div className="sign-in">
        <div className="left col-l-6 col-s-12">
          <div className="head display-flex justify-content-space-between">
            <Link to="/" className="link">
              <img
                src={process.env.PUBLIC_URL + "/logo.png"}
                alt="register-logo"
                className="logo"
              />
            </Link>
            <ControlLanguage />
          </div>
          <form onSubmit={handleSubmit(onSubmit)} className="body m-auto">
            <h1 className="title t-1">{t("register.text-1")}</h1>
            <p className="title t-2">{t("register.text-2")}</p>
            <div className={classNameMsg}>
              <span>{responseMessage}</span>
            </div>
            <div className="input-div">
              <div className="display-flex justify-content-space-between containers">
                <div className="container-48">
                  <div className="input-div">
                    <input
                      type="text"
                      className="input-form"
                      autoComplete="none"
                      placeholder=" "
                      {...register("prename")}
                    />
                    <label htmlFor="prename" className="label-form">
                      {t("register.text-3")}
                    </label>
                    {errors.prename && (
                      <span className="fade-in">{errors.prename.message}</span>
                    )}
                  </div>
                </div>
                <div className="container-48">
                  <div className="input-div">
                    <input
                      type="text"
                      className="input-form"
                      autoComplete="none"
                      placeholder=" "
                      {...register("name")}
                    />
                    <label htmlFor="name" className="label-form">
                      {t("register.text-4")}
                    </label>
                    {errors.name && (
                      <span className="fade-in">{errors.name.message}</span>
                    )}
                  </div>
                </div>
              </div>
              <div className="input-div">
                <input
                  type="text"
                  name="username"
                  className="input-form"
                  autoComplete="none"
                  placeholder=" "
                  {...register("username")}
                />
                <label htmlFor="username" className="label-form">
                  {t("register.text-5")}
                </label>
                {errors.username && (
                  <span className="fade-in">{errors.username.message}</span>
                )}
              </div>
              <div className="input-div">
                <input
                  type={showPwd ? "text" : "password"}
                  className="input-form"
                  autoComplete="none"
                  placeholder=" "
                  {...register("password")}
                />
                <label htmlFor="password" className="label-form">
                  {t("register.text-6")}
                </label>
                <label htmlFor="password" className="label-icon">
                  {showPwd ? (
                    <BsEye
                      style={{ cursor: "pointer" }}
                      onClick={() => setShowPwd(!showPwd)}
                    />
                  ) : (
                    <BsEyeSlash
                      style={{ cursor: "pointer" }}
                      onClick={() => setShowPwd(!showPwd)}
                    />
                  )}
                </label>
                {errors.password && (
                  <span className="fade-in">{errors.password.message}</span>
                )}
              </div>
              <div className="input-div">
                <input
                  type={showPwd ? "text" : "password"}
                  className="input-form"
                  autoComplete="none"
                  placeholder=" "
                  {...register("confirm_password")}
                />
                <label htmlFor="confirm_password" className="label-form">
                  {t("register.text-7")}
                </label>
                <label htmlFor="confirm_password" className="label-icon">
                  {showPwd ? (
                    <BsEye
                      style={{ cursor: "pointer" }}
                      onClick={() => setShowPwd(!showPwd)}
                    />
                  ) : (
                    <BsEyeSlash
                      style={{ cursor: "pointer" }}
                      onClick={() => setShowPwd(!showPwd)}
                    />
                  )}
                </label>
                {errors.confirm_password && (
                  <span className="fade-in">
                    {errors.confirm_password.message}
                  </span>
                )}
              </div>
              <div>
                <div className="input-div display-flex justify-content-flex-start align-items-center">
                  <input type="checkbox" name="gcu" {...register("gcu")} />
                  <label htmlFor="gcu" style={{ fontSize: "0.9rem" }}>
                    {t("terms.agree")}
                    <Link
                      to=""
                      style={{ textDecoration: "none", marginLeft: "0.5rem" }}
                    >
                      {t("terms.term")}
                    </Link>
                    <Link
                      to=""
                      style={{ textDecoration: "none", marginLeft: "0.3rem" }}
                    >
                      {t("terms.privacy")}
                    </Link>
                  </label>
                </div>
                {errors.gcu && (
                  <span className="fade-in">{errors.gcu.message}</span>
                )}
              </div>
            </div>
            <button
              type={isSending ? "button" : "submit"}
              className={isSending ? "button normal" : "button validate"}
            >
              {isSending ? "Inscription..." : t("register.text-8")}
            </button>
          </form>
          <div
            className="foot width display-flex justify-content-center align-items-center"
            style={{ marginTop: "0.60rem" }}
          >
            <span>{t("register.text-9")}</span>
            <Link to="/login" className="link">
              {t("register.text-10")}
            </Link>
          </div>
        </div>
        <div className="right col-l-6 col-s-12">
          <div className="banner m-auto">
            <div className="circle circle-1">
              <img
                src={process.env.PUBLIC_URL + "/notebook-and-pencil.png"}
                alt="login-banner"
                className="image"
              />
            </div>
            <div className="circle circle-2">
              <img
                src={process.env.PUBLIC_URL + "/book-and-pencil.png"}
                alt="login-banner"
                className="image"
              />
            </div>
            <p className="title t-1">
              {t("register.text-11")}
            </p>
            <img
              src={process.env.PUBLIC_URL + "/register.png"}
              alt="login-banner"
              className="image fade-in"
            />
          </div>
          <div className="foot">
            <span>
              &copy; {new Date().getFullYear()} MASOMO. {t("register.text-12")}
            </span>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};
export default Register;
