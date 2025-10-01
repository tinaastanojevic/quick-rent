import axiosInstance from '../interceptor/axiosInstance';


export const approveOrRejectRequest = async (id, status) => {
    let res = await axiosInstance.patch(`/rentalRequest/${id}`, { status: status });
    return res.data;
}

export const sendRentalRequest = async (data) => {
    let res = await axiosInstance.post("/rentalRequest/sendRentalRequest", data);
    return res;
}

export const getRentalRequests = async (id) => {
    let res = await axiosInstance.get(`/rentalRequest/${id}`);
    return res.data;
}

export const getRentalRequestsWithSpecificStatus = async (id, status) => {
    let res = await axiosInstance.get(`/rentalRequest/getWithSpecificStatus/${id}?status=${encodeURIComponent(status)}`);
    return res.data;
}