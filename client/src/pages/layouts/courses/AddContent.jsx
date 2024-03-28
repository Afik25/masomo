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
  const [sectionCount, setSectionCount] = useState(0);
  //
  // $$\\sum_{n=1}^{\\infty} 2^{-n} = 1$$
  // \\int_0^\\infty x^2 dx
  // \sum_{n=1}^{\infty} 2^{-n} = 1 (un seul slash pour la saisie)

  const {
    register,
    setValue,
    reset,
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
        section: sectionCount,
      },
    ]);
    swal({
      title: "Processing Section Content",
      icon: "success",
      text: "Section added",
    });
    resetField("thumbnail");
    resetField("section_files");
    setLatexContent("");
    setSectionImages([]);
    setSectionCount((prev) => prev + 1);
  };

  const onSubmit = async () => {
    await wait(300);
    //
    const formData = new FormData();
    let key_id = "";
    let title = "";
    let type = "";
    let language = "";
    let desc = "";
    //
    sectionUpload.map((sectionUploadItem, i) => {
      sectionUploadItem?.section_files?.map((fileItem) => {
        const ext = fileItem?.file?.name.split(".").pop();
        const newName = `mf-img-${
          fileItem?.file?.name?.split(".")[0]
        }-${Date.now()}.${ext}`;
        const newFile = new File([fileItem?.file], newName, {
          type: fileItem?.file?.type,
        });

        formData.append("thumbnailsImages", newFile);
        formData.append(
          "fileSectionNames",
          `${sectionUploadItem?.section}#${newFile?.name}`
        );
      });
      key_id = sectionUploadItem?.keyId;
      title = sectionUploadItem?.title;
      type = sectionUploadItem?.type;
      language = sectionUploadItem?.language;
      desc = sectionUploadItem?.description;
      formData.append("thumbnails", sectionUploadItem?.thumbnail);
    });
    //
    formData.append("key_id", key_id); // key_id : course_id/ lesson_id/ exercise_id/ solution_id
    formData.append("title", title);
    formData.append("type", type);
    formData.append("language", language);
    formData.append("description", desc);
    //
    onCreateContent(axiosPrivate, keys?.keyTitle, formData)
      .then((response) => {
        if (response?.data?.status === 1) {
          swal({
            title: "Uploading content",
            icon: "success",
            text: response?.data?.message,
          });
        }
        reset();
        setSectionCount(0);
        setSectionUpload([]);
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
      <div className="add-content-head">
        <h2 className="title t-1">
          Adding New{" "}
          {keys.keyTitle === "isLesson"
            ? "Lesson"
            : keys.keyTitle === "isExercise"
            ? "Exercise"
            : "Solution"}
        </h2>
        <p className="title t-3">
          {keys.keyTitle === "isLesson"
            ? `Course and Level : ${keys.keyDetails + " / " + keys.keyLevel}`
            : keys.keyTitle === "isExercise"
            ? `Course/ Lesson/ Level : ${keys.keyCourse + " / " + keys.keyDetails + " / " + keys.keyLevel}`
            : `Course/ Lesson/ Exercise/ Level : ${keys.keyCourse + " / " + keys.keyLesson + " / " + keys.keyDetails + " / " + keys.keyLevel}`}
        </p>
        <p className="title t-3">Program : {keys.keyProgram}</p>
        <p className="title t-3">Country : {keys.keyCountry}</p>
      </div>
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
                          file: file,
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
            <button type="submit" className="button">
              Process
            </button>
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
                sectionImages.map((file, k) => {
                  return <img src={file.blob} alt={file.blob} key={k + 1} />;
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
