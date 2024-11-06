import axios from "axios";

const API_URL = `${process.env.REACT_APP_API_URL}auth`;

export const loginapi = async ( data ) => {
  try {
    const response = await axios.post(`${API_URL}/login`, { data });
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const register = async (data) => {
  try {
    const response = await axios.post(`${API_URL}/register`, { data });
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};
