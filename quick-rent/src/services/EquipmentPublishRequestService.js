import axiosInstance from "../interceptor/axiosInstance";

export const getEquipmentPublishRequests = async () => {
    let res = await axiosInstance.get("/EquipmentPublishRequest");
    return res.data;
}

export const changeEquipmentPublishRequestStatus = async (id, status) => {
    let res = await axiosInstance.patch(`/EquipmentPublishRequest/changeStatus/${id}`, status);
    return res;
}

export const createEquipmentPublishRequest = async (id, FormData) => {
    let res = await axiosInstance.post(`/EquipmentPublishRequest/publish/${id}`, FormData);
    return res;
}