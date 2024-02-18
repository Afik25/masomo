import { PROGRAMS, LEVELS } from "../routes";

// Program
export function onCreatePrograms(axiosPrivate, data) {
  const _data = {
    country: data.program_country,
    language: data.program_language,
    title: data.program_type,
  };
  return new Promise(async (resolve, reject) => {
    await axiosPrivate
      .post(PROGRAMS, _data, {
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

export function getPrograms(axiosPrivate, signal) {
  return new Promise(async (resolve, reject) => {
    await axiosPrivate
      .get(PROGRAMS, {
        signal: signal,
      })
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
}
//
// Level
export function getLevels(axiosPrivate, signal) {
  return new Promise(async (resolve, reject) => {
    await axiosPrivate
      .get(LEVELS, {
        signal: signal,
      })
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
}
