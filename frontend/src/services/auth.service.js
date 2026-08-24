// import axios from "axios";

// const API_URL = `${import.meta.env.VITE_API_URL}/auth`;

// export const loginUser = async (loginData) => {
//   const response = await axios.post(`${API_URL}/login`, loginData);

//   return response.data;
// };

import axios from "axios";

const API_URL = `${import.meta.env.VITE_API_URL}/auth`;

export const loginUser = async (loginData) => {
  const response = await axios.post(
    `${API_URL}/login`,
    loginData
  );

  return response.data;
};