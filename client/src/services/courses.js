import { COURSES, COURSES_CUSTOMIZED } from "../routes";

export function onCreateCourse(axiosPrivate, data) {
  const _data = {
    level: data.level,
    title: data.title,
    description: data.description,
  };
  return new Promise(async (resolve, reject) => {
    await axiosPrivate
      .post(COURSES, _data, {
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
export function getCourses(axiosPrivate, signal) {
  return new Promise(async (resolve, reject) => {
    await axiosPrivate
      .get(COURSES, {
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
export function getCustomizedCourses(axiosPrivate, signal) {
  return new Promise(async (resolve, reject) => {
    await axiosPrivate
      .get(COURSES_CUSTOMIZED, {
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
// export function onActivateCourses(axiosPrivate, data) {
//   const _data = {
//     id: data.level_id,
//     status: data.level_status
//   };
//   return new Promise(async (resolve, reject) => {
//     await axiosPrivate
//       .post(LEVELS_ACTIVATION, _data, {
//         headers: { "Content-Type": "application/json" },
//         withCredentials: true,
//       })
//       .then((response) => {
//         resolve(response);
//       })
//       .catch((error) => {
//         reject(error);
//       });
//   });
// }
