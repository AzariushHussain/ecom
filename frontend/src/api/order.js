import axios from "axios";

const API_URL = `${process.env.REACT_APP_API_URL}order`;

export const createOrder = async (token, data) => {
    console.log("token", token);
    try {
        const response = await axios.post(
            API_URL,
            data,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        return response.data;
    } catch (error) {
        return error.response?.data || { message: "An error occurred" };
    }
};

export const getOrders = async (token) => {
    try {
        const response = await axios.get(API_URL, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        return error.response?.data || { message: "An error occurred" };
    }
};

export const getOrder = async (token, id) => { 
    try {
        const response = await axios.get(`${API_URL}/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        return error.response?.data || { message: "An error occurred" };
    }
};