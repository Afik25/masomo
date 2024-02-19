import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { Link, useNavigate } from "react-router-dom";
import { BsEyeSlash, BsEye } from "../middlewares/icons";
import ControlLanguage from "../components/languages/ControlLanguage";
//
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { validationSchemaLogin, wait } from "../utils/utils";
//
import { login } from "../services/authentication";
import useAuth from "../hooks/context/state/useAuth";
//
const Login = () => {
  const { t } = useTranslation();
  const { setAuth } = useAuth();
  const navigate = useNavigate();
  const [showPwd, setShowPwd] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");
  const [classNameMsg, setClassNameMsg] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onTouched",
    resolver: yupResolver(validationSchemaLogin),
  });

  const onSubmit = async (data) => {
    setIsSending(true);
    await wait(500);
    //
    login(data)
      .then((response) => {
        if (response?.data?.isLogged) {
          setIsSending(false);
        }
        const accessToken = response?.data?.accessToken;
        const sys_role = response?.data?.sys_role;
        const to = "/" + sys_role;
        setAuth({ sys_role, accessToken });
        navigate(to, { replace: true });
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
        <title>MASOMO - Sign In.</title>
        <meta
          name="description"
          content="Connectez-vous afin d'Étudier avec le contenu éducatif de qualité basé sur le programme d'étude national relatif à chaque niveau."
        />
        <meta
          name="keywords"
          content="École, School, Masomo, Étudier, Éducation, Se connecter, Login, Connexion"
        />
      </Helmet>
      <div className="sign-in">
        <div className="left col-l-6 col-s-12">
          <div className="head display-flex justify-content-space-between">
            <Link to="/" className="link">
              <img
                src={process.env.PUBLIC_URL + "/logo.png"}
                alt="log-app"
                className="logo"
              />
            </Link>
            <ControlLanguage />
          </div>
          <form className="body m-auto" onSubmit={handleSubmit(onSubmit)}>
            <h1 className="title t-1">Hey, welcome back!</h1>
            <p className="title t-2">Please enter your details to log in...</p>
            <div className={classNameMsg}>
              <span>{responseMessage}</span>
            </div>
            <div className="input-div">
              <input
                type="text"
                className="input-form"
                autoComplete="none"
                placeholder=" "
                {...register("username")}
              />
              <label htmlFor="username" className="label-form">
                Nom d'utilisateur ou E-mail ou Téléphone
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
                Mot de passe
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
            <div
              className="display-flex justify-content-flex-end"
              style={{ marginBottom: "0.7rem" }}
            >
              <Link to="" className="link">
                Mot de passe oublié ?
              </Link>
            </div>
            <button
              type={isSending ? "button" : "submit"}
              className={isSending ? "button normal" : "button validate"}
            >
              {isSending ? "Connexion..." : "Sign in"}
            </button>
          </form>
          <div className="foot display-flex justify-content-center align-items-center">
            <span>Don't you have an account yet?</span>
            <Link to="/register" className="link">
              Sign Up at
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
              L'école à votre portée, quand vous voulez, où vous voulez!
            </p>
            <img
              src={process.env.PUBLIC_URL + "/pic-1.png"}
              alt="login-banner"
              className="image fade-in"
            />
          </div>
          <div className="foot">
            <span>
              &copy; {new Date().getFullYear()} MASOMO. {t("login.text-8")}
            </span>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};
export default Login;
