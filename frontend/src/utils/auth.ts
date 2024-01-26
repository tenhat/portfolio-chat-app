import axios from 'axios';

const API_URL = 'http://localhost:5000/auth/';

export const login = async (username: string, password:string) => {
    const response = await axios.post(`${API_URL}login`, { username, password });
    return response.data;
};

export const register = async (username: string, password: string, email: string) => {
    const response = await axios.post(`${API_URL}register`, { username, password, email });
    return response.data;
};
