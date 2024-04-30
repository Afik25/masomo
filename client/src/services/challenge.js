import { QUIZ, QUESTIONS_ANSWERS } from "../routes";

// Challenge
export function onCreateChallenge(axiosPrivate, data) {
  return new Promise(async (resolve, reject) => {
    await axiosPrivate
      .post(QUIZ, data, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      })
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
}
export function onCreateQuestionsAnswers(axiosPrivate, data) {
  return new Promise(async (resolve, reject) => {
    await axiosPrivate
      .post(QUESTIONS_ANSWERS, data, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      })
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
}
