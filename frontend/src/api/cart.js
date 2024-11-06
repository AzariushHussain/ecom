import axios from "axios";

const API_URL = `${process.env.REACT_APP_API_URL}cart`;

export const createUpdateCart = async (token, data) => {
    try {
        console.log(`token: ${token}, data: ${JSON.stringify(data)}`);
        const response = await axios.put(
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

export const getCart = async (token) => {
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