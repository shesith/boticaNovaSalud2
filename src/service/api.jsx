import Axios from "axios";

export const token = () => {
  return window.localStorage.getItem("token");
};

export const config = (
  formData = false,
  progressFuncion = () => {},
  progressFuncionDown = () => {}
) => {
  let token = window.localStorage.getItem("token");

  return {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": formData ? "multipart/form-data" : "application/json",
    },
    onUploadProgress: (progressEvent) => {
      progressFuncion(progressEvent);
    },

    onDownloadProgress: (progressEvent) => {
      progressFuncionDown(progressEvent);
    },
  };
};

const axiosInstance = Axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (
      (error.response && error.response.status === 401) ||
      error.response.status === 403
    ) {
      const exceptionMessages = ["Token está expirado", "No autenticado."];

      if (error.response.data.error === "Token inválido") {
        localStorage.clear();
        window.location.href = "/";
        return Promise.reject(error);
      }

      // if (exceptionMessages.includes(error.response.data.mensaje)) {
      //   await handleSessionExpiration(error, axiosInstance);
      // }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;

export const services = ({
  method,
  service,
  body,
  formData = false,

  progressFuncion = () => {},
  progressFuncionDown = () => {},
}) => {
  switch (method) {
    case "GET":
      return axiosInstance
        .get(service, config())
        .then((r) => {
          return response(r);
        })
        .catch((err) => {
          return response(err.response);
        });
    case "POST":
      return axiosInstance
        .post(
          `${service}`,
          body,
          config(formData, progressFuncion, progressFuncionDown)
        )
        .then((r) => {
          return response(r);
        })
        .catch((err) => {
          return response(err.response);
        });

    case "PUT":
      return axiosInstance
        .put(`${service}`, body, config())
        .then((r) => {
          return response(r);
        })
        .catch((err) => {
          return response(err.response);
        });

    case "DELETE":
      return axiosInstance
        .delete(`${service}`, config())
        .then((r) => {
          return response(r);
        })
        .catch((err) => {
          return response(err.response);
        });
    default:
      break;
  }
};

const arrayResponses = [
  400, 403, 404, 405, 406, 409, 410, 422, 423, 200, 201, 202, 500,
];
const response = (r) => {
  if (r === undefined) {
    return false;
  }

  if (r.status === 401) {
    if (
      window.location.pathname !== "/" &&
      window.location.pathname !== "/admin"
    ) {
      // alert("Tu sesión ha expirado");
      window.localStorage.clear();
      window.location.replace("/");
    }
    // return;
  }

  if (arrayResponses.includes(r.status)) {
    return { status: r.status, data: r.data };
  }

  if (r.status === 500) {
    return { status: r.status };
  }

  return { status: r.status, errors: r };
};
