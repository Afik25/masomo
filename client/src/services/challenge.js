import { THEMES, AVATARS, JOIN_QUIZ, JOIN_QUIZ_REQUEST_STATUS, QUIZ, QUIZ_LEADERBOARD, QUESTIONS_ANSWERS } from "../routes";

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
export function onGetAvatars(
  axiosPrivate,
  signal
) {
  return new Promise(async (resolve, reject) => {
    await axiosPrivate
      .get(AVATARS, {
        signal: signal,
        headers: { "Content-Type": "application/json" },
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
export function onGetThemes(
  axiosPrivate,
  signal
) {
  return new Promise(async (resolve, reject) => {
    await axiosPrivate
      .get(THEMES, {
        signal: signal,
        headers: { "Content-Type": "application/json" },
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
export function onGetQuizByUser(
  user_id,
  axiosPrivate,
  signal
) {
  return new Promise(async (resolve, reject) => {
    await axiosPrivate
      .get(QUIZ + "/" + user_id, {
        signal: signal,
        headers: { "Content-Type": "application/json" },
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
export function onGetQuizLeaderBoardById(
  quiz_id,
  axiosPrivate,
  signal
) {
  return new Promise(async (resolve, reject) => {
    await axiosPrivate
      .get(QUIZ_LEADERBOARD + "/" + quiz_id, {
        signal: signal,
        headers: { "Content-Type": "application/json" },
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
export function onCheckJoinChallenge(data, axiosPrivate) {
  return new Promise(async (resolve, reject) => {
    await axiosPrivate
      .get(JOIN_QUIZ+ "/" + data.quiz_code, {
        headers: { "Content-Type": "application/json" },
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
export function onJoinChallenge(data, axiosPrivate) {
  return new Promise(async (resolve, reject) => {
    await axiosPrivate
      .post(JOIN_QUIZ, data, {
        headers: { "Content-Type": "application/json" },
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
export function onJoinChallengePermission(data, axiosPrivate) {
  return new Promise(async (resolve, reject) => {
    await axiosPrivate
      .post(JOIN_QUIZ_REQUEST_STATUS, data, {
        headers: { "Content-Type": "application/json" },
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
export function onGetParticipationRequestStatusById(
  participation_id,
  axiosPrivate,
  signal
) {
  return new Promise(async (resolve, reject) => {
    await axiosPrivate
      .get(JOIN_QUIZ_REQUEST_STATUS + "/" + participation_id, {
        signal: signal,
        headers: { "Content-Type": "application/json" },
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
