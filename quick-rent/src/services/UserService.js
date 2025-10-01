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

export const getUserInfo = async (username) => {
    try {
        let res = await axiosInstance.get(`/User/profile/${username}`);
        return res.data;
    }
    catch (error) {
        console.error('Cant get user info: ', error);
    }

}