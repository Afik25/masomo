import React, { useState, useEffect } from "react";
import { FiUpload } from "../../../middlewares/icons";
//
import useAuth from "../../../hooks/context/state/useAuth";
import useAxiosPrivate from "../../../hooks/context/state/useAxiosPrivate";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { isEmpty, wait, validationAddingContent } from "../../../utils/utils";
import { onCreateContent } from "../../../services/courses";
import swal from "sweetalert";
//
// katex
import "katex/dist/katex.min.css";
import Latex from "react-latex-next";
//

const AddContent = () => {
  const { keys } = useAuth();
  const axiosPrivate = useAxiosPrivate();
  const [latexContent, setLatexContent] = useState("");
  const [sectionImages, setSectionImages] = useState([]);
  const [sectionUpload, setSectionUpload] = useState([]);
  // $$\\sum_{n=1}^{\\infty} 2^{-n} = 1$$
  // \\int_0^\\infty x^2 dx
  // \sum_{n=1}^{\infty} 2^{-n} = 1 (un seul slash pour la saisie)

  const {
    register,
    setValue,
    resetField,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "all",
    resolver: yupResolver(validationAddingContent),
  });

  const onAdd = async (data) => {
    await wait(300);
    //
    console.log({ "test data ": sectionUpload });
    // 
    setSectionUpload([
      ...sectionUpload,
      {
        description: data.description,
        keyId: data.keyId,
        keyTitle: data.keyTitle,
        language: data.language,
        section_files: sectionImages,
        thumbnail: data.thumbnail,
        title: data.title,
        type: data.type,
      },
    ]);
    swal({
      title: "Processing Section Content",
      icon: "success",
      text: "Section added",
    });
    resetField('thumbnail');
    resetField('section_files');
    setLatexContent("");
    setSectionImages([]);
  };

  const onSubmit = async () => {
    await wait(300);
    //
    const data = {
      keyId: keys?.keyId,
      keyTitle: keys?.keyTitle,
      content: sectionUpload,
    };
    //
    onCreateContent(axiosPrivate, data)
      .then((response) => {
        if (response?.data?.status === 1) {
          swal({
            title: "Uploading content",
            icon: "success",
            text: response?.data?.message,
          });
        }
      })
      .catch((error) => {
        if (!error?.response) {
          swal({
            title: "Uploading content",
            icon: "error",
            text: error?.response?.data?.message,
          });
        } else {
          swal({
            title: "Uploading content",
            icon: "error",
            text: error?.response?.data?.message,
          });
        }
      });
  };

  useEffect(() => {
    setValue("keyId", keys?.keyId);
    setValue("keyTitle", keys?.keyTitle);
  }, []);

  return (
    <div className="add-content">
      <h2 className="title t-1">
        Adding new{" "}
        {keys.keyTitle === "isLesson"
          ? "lesson"
          : keys.keyTitle === "isExercise"
          ? "exercise"
          : "solution"}
      </h2>
      <div className="container">
        <form className="left" onSubmit={handleSubmit(onAdd)}>
          <input type="hidden" {...register("keyId")} />
          <input type="hidden" {...register("keyTitle")} />
          <div className="input-div">
            <input
              type="text"
              className="input-form"
              autoComplete="none"
              placeholder=" "
              {...register("title")}
            />
            <label htmlFor="title" className="label-form">
              Leson's/Exercise's/Solution's title
            </label>
            {errors.title && (
              <span className="fade-in">{errors.title.message}</span>
            )}
          </div>
          <div className="input-div">
            <select className="input-form" {...register("type")}>
              <option value="" style={{ color: "grey" }}>
                Type of accessibility
              </option>
              <option value="freemium">Freemium</option>
              <option value="premium">Premium</option>
            </select>
            {errors.type && (
              <span className="fade-in">{errors.type.message}</span>
            )}
          </div>
          <div className="input-div">
            <select className="input-form" {...register("language")}>
              <option value="" style={{ color: "grey" }}>
                Version (Language)
              </option>
              <option value="en">English</option>
              <option value="fr">French</option>
            </select>
            {errors.language && (
              <span className="fade-in">{errors.language.message}</span>
            )}
          </div>
          <div className="input-div">
            <textarea
              type="text"
              className="input-textarea"
              autoComplete="none"
              placeholder=" "
              {...register("description")}
              rows={10}
            ></textarea>
            <label htmlFor="description" className="label-form">
              Description (Resume)
            </label>
            {errors.description && (
              <span className="fade-in">{errors.description.message}</span>
            )}
          </div>
          <div className="input-div">
            <textarea
              type="text"
              className="input-textarea"
              autoComplete="none"
              placeholder=" "
              {...register("thumbnail", {
                onChange: (e) => setLatexContent(e.target.value),
              })}
              rows={20}
            ></textarea>
            <label htmlFor="thumbnail" className="label-form">
              Content lesson/ exercise/ solution
            </label>
            {errors.thumbnail && (
              <span className="fade-in">{errors.thumbnail.message}</span>
            )}
          </div>
          <div className="input-files">
            <div className="file-wrapper">
              <div className="files">
                <input
                  type="file"
                  id="section_files"
                  {...register("section_files", {
                    onChange: (e) => {
                      const selectedFiles = e.target.files;
                      const selectedFilesToArray = Array.from(selectedFiles);

                      const imagesArray = selectedFilesToArray.map((file) => {
                        return {
                          name: file.name,
                          blob: URL.createObjectURL(file),
                        };
                      });
                      setSectionImages(imagesArray);
                    },
                  })}
                  multiple
                  accept="image/png, image/PNG, image/jpg, image/JPG, image/jpeg, image/JPEG"
                />
                <label htmlFor="section_files" className="label">
                  <div>
                    <FiUpload />
                    <p className="title t-3">Browse or Drug and Drop Files</p>
                  </div>
                </label>
              </div>
              <div className="files-container">
                {isEmpty(sectionImages) ? (
                  <div>No section files yet!</div>
                ) : (
                  sectionImages.map((file, i) => {
                    return (
                      <div className="file-item" key={i}>
                        <h3 className="title t-3">{file.name}</h3>
                        <span
                          onClick={() =>
                            setSectionImages(
                              sectionImages.filter((e) => e.blob !== file.blob)
                            )
                          }
                        >
                          &times;
                        </span>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
            <button className="button">Process</button>
          </div>
        </form>
        <div className="middle">
          <span>{sectionUpload.length} sections added.</span>
          <div className="content">
            <div className="section">
              {latexContent && (
                <Latex>{"$$" + latexContent.toString() + "$$"}</Latex>
              )}
            </div>
            <div className="images">
              {!isEmpty(sectionImages) &&
                sectionImages.map((file) => {
                  return <img src={file.blob} alt={file.blob} />;
                })}
            </div>
          </div>
        </div>
        <div className="right">
          {sectionUpload.length !== 0 && (
            <button className="button" onClick={onSubmit}>
              Validate and Upload
            </button>
          )}
          <div className="view-body">
            {sectionUpload.length !== 0 &&
              sectionUpload.map((item, i) => {
                return (
                  <div key={i} className="view-item">
                    <div className="section">
                      <Latex>{"$$" + item.thumbnail + "$$"}</Latex>
                    </div>
                    <div className="images">
                      {!isEmpty(item.section_files) &&
                        item.section_files.map((file) => {
                          return <img src={file.blob} alt={file.blob} />;
                        })}
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddContent;
