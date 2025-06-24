import axios from 'axios';
import { GET_EQUIPMENTS_URL, GET_EQUIPMENTS_BY_CATEGORY_URL, GET_CATEGORIES } from '../urls';
import axiosInstance from '../interceptor/axiosInstance';

export const getAllEquipments = async () => {
    let res = await axios.get(GET_EQUIPMENTS_URL);
    console.log(res.data);
    return res.data;
}

export const getEquipmentsByCategory = async (category) => {
    let res = await axios.get(`${GET_EQUIPMENTS_BY_CATEGORY_URL}/${category}`);
    return res.data;
}

export const getAllCategories = async () => {
    let res = await axios.get(GET_CATEGORIES);
    return res.data;
}


export const getEquipmentById = async (id) => {
    let res = await axiosInstance.get(`/equipment/${id}`);
    return res.data;
}

export const sendRentalRequest = async (data) => {
    console.log(data);
    let res = await axiosInstance.post("/rentalRequest/sendRentalRequest", data);
    return res;
}

export const getRentalRequests = async (id) => {
    let res = await axiosInstance.get(`/rentalRequest/${id}`);
      console.log(res.data);
    return res.data;
}

