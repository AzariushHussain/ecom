import axios from "axios";

const API_URL = `${process.env.REACT_APP_API_URL}product`;

export const getHomeProducts = async () => {
  try {
    const response = await axios.get(`${API_URL}/home`);
    return response.data.data;
  } catch (error) {
    return error.response.data;
  }
}

export const getProducts = async () => {
  try {
    const response = await axios.get(`${API_URL}/`);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
}