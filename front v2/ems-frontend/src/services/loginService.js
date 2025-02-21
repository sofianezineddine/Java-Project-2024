import axios from 'axios';


// JWT token management

export const getAuthToken = () => {
  return window.localStorage.getItem('auth_token');
};

export const setAuthHeader = (token) => {
  if (token !== null) {
    window.localStorage.setItem("auth_token", token);
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    window.localStorage.removeItem("auth_token");
    delete axios.defaults.headers.common['Authorization'];
  }
};


axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      console.error('Token expired or invalid. Redirecting to login...');
      setAuthHeader(null); // Clear the token
      window.location.href = '/login'; // Redirect to login
    }
    return Promise.reject(error);
  }
);


axios.defaults.baseURL = 'http://localhost:8080';
axios.defaults.headers.post['Content-Type'] = 'application/json';

export const request = (method, url, data) => {

  let headers = {};
  if (getAuthToken() !== null && getAuthToken() !== "null") {
    headers = { 'Authorization': `Bearer ${getAuthToken()}` };
  }

  return axios({
    method: method,
    url: url,
    headers: headers,
    data: data
  });
};