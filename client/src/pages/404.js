import React from "react";
import { Link } from "react-router-dom";
import { IoArrowBack } from "../middlewares/icons";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
import { Helmet } from "react-helmet";
import { useTranslation } from "react-i18next";

const NotFound = () => {
  const { t } = useTranslation();
  return (
    <React.Fragment>
      <Helmet>
        <title>MASOMO - L'école à votre portée.</title>
        <meta
          name="description"
          content="Étudier avec le contenu éducatif de qualité basé sur le programme d'étude national relatif à chaque niveau."
        />
        <meta
          name="keywords"
          content="École, School, Masomo, Étudier, Éducation"
        />
      </Helmet>
      <div className="not-found">
        <Header />
        <div className="containers">
          <h1 className="title t-1">404</h1>
          <h1 className="title t-2">{t("notFound.text-1")}</h1>
          <h1 className="title t-3">
          {t("notFound.text-2")}
          </h1>
          <div>
            <Link to="/" className="link">
              <IoArrowBack />
              <span>{t("notFound.text-3")}</span>
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    </React.Fragment>
  );
};

export default NotFound;
