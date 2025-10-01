import axiosInstance from '../interceptor/axiosInstance';

export const getAllEquipments = async () => {
    let res = await axiosInstance.get(`/equipment`);
    return res.data;
}

export const getEquipmentsByCategory = async (category) => {
    let res = await axiosInstance.get(`/equipment/category/${category}`)
    return res.data;
}

export const getAllCategories = async () => {
    let res = await axiosInstance.get(`/equipment/category`);
    return res.data;
}


export const getEquipmentById = async (id) => {
    let res = await axiosInstance.get(`/equipment/${id}`);
    return res.data;
}



