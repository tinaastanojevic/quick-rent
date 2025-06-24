import axios from 'axios';
import { LOGIN_URL, REGISTER_URL } from '../urls'
import axiosInstance from '../interceptor/axiosInstance';

export const loginUser = async (email, password) => {
    try {
        const data = {
            email: email,
            password: password
        };

        const res = await axios.post(LOGIN_URL, data);
        const userData = res.data;
        return userData;
    }
    catch (error) {
        console.error('Login error: ', error);
    }
}

export const getToken = () => {
    return localStorage.getItem('jwt_token');
};

export const setToken = (token) => {
    localStorage.setItem("jwt_token", token);
}

export const logout = () => {
    localStorage.removeItem('jwt_token');
};

export const registerUser = async (data) => {
    try {
        const res = await axios.post(REGISTER_URL, data);
        const userData = res.data;
        return userData;
    }
    catch (error) {
        console.error('Login error: ', error);
    }
}


export const getOwnersPosts = async (username) => {
    let res = await axiosInstance.get(`/User/profile/${username}`);
    return res.data;

}