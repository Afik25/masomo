import {
  DASHBOARD_STUDENT
} from "../routes";

export function onGetStudentDashboard(
  student_id,
  axiosPrivate,
  signal
) {
  return new Promise(async (resolve, reject) => {
    await axiosPrivate
      .get(DASHBOARD_STUDENT + "/" + student_id, {
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
