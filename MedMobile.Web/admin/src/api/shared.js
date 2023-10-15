import axios from "axios";

const env = import.meta.env;

function createInstance(baseURL, type, authorization = true) {
  const headers = {
    Accept: "application/json",
    "Content-Type": type,
  };
  const axiosInstance = axios.create({ baseURL, headers });

  axiosInstance.interceptors.request.use(
    (config) => {
      if (authorization && config.headers) {
        config.headers.accessToken = `Bearer ${JSON.parse(localStorage.getItem("accessToken")) ?? ""}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  axiosInstance.interceptors.response.use(
    async (res) => res,
    (error) => {
      console.log("ERROR", { error });
      if (error?.response?.status === 401) {
        const refreshToken = localStorage.getItem("refreshToken");
        if (refreshToken) {
          axios
            .post(
              env.VITE_APP_API_URL + "/auth/token/refresh",
              { refresh_token: refreshToken },
              {
                headers: {
                  Accept: "application/json",
                  "Content-Type": "application/json",
                  accessToken: `Bearer + ${refreshToken}`,
                },
              }
            )
            .then(({ data }) => {
              localStorage.setItem("accessToken", data.access_token);
              window.location.reload();
            })
            .catch(() => {
              localStorage.clear();
              window.location.reload();
            });
        }
      }
      return Promise.reject(error);
    }
  );

  return axiosInstance;
}

export const baseUrlInstance = createInstance(
  env.VITE_APP_API_URL,
  "application/json",
  false
);

const authInstance = (authorization = true) =>
  createInstance(env.VITE_APP_API_URL, "application/json", authorization);
const mediaInstance = createInstance(
  env.VITE_APP_API_URL,
  "multipart/form-data",
  true,
  false
);

export const useGet = ({ url, params, authorization, type }) => {
  if (type === "auth") return baseUrlInstance.get(url, { params });
  return authInstance(authorization).get(url, { params });
};

export const usePost = ({ url, data, authorization, type }) => {
  switch (type) {
    case "auth_post":
      return baseUrlInstance.post(url, data);
    case "media":
      return mediaInstance.post(url, data);
    default:
      return authInstance(authorization).post(url, data);
  }
};

export const usePatch = ({ url, data, authorization, type }) => {
  if (type === "media") {
    return mediaInstance.patch(url, data);
  } else {
    return authInstance(authorization).patch(url, data);
  }
};

export const useDelete = ({ url, data, authorization, type }) => {
  if (type === "media") {
    return mediaInstance.delete(url, data);
  } else {
    return authInstance(authorization).delete(url, data);
  }
};
