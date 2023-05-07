import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://35.79.23.41:3000",
});

const get = async (url: string) => {
  return await axiosInstance.get(url).then(handleResponse).catch(handleError);
};

const post = async (url: string, body: any) => {
  return await axiosInstance
    .post(url, body)
    .then(handleResponse)
    .catch(handleError);
};

const patch = async (url: string, body: any) => {
  return await axiosInstance
    .patch(url, body)
    .then(handleResponse)
    .catch(handleError);
};

const _delete = async (url: string) => {
  return await axiosInstance
    .delete(url)
    .then(handleResponse)
    .catch(handleError);
};

function handleResponse(response: any) {
  return { data: response.data, status: 200 };
}

function handleError(err: any) {
  return { data: "failed", status: err?.response?.status };
}

export const axiosWrapper = {
  get,
  post,
  patch,
  delete: _delete,
};
