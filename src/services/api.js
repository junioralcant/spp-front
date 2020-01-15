import axios from "axios";
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL
});

// metodo auternativo para dar put ou post
api.postOrPut = (url, id, data, config = {}) => {
  const method = id ? "put" : "post";
  const apiUrl = id ? `${url}/${id}` : url;

  return api[method](apiUrl, data, config);
};

export default api;
