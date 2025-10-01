import axiosInstance from '../interceptor/axiosInstance';

export const sendRoleChangeRequest = async (id) => {
    try {
        const res = await axiosInstance.post(
            "/roleChangeRequest/sendRoleChangeRequest",
            { userID: id }
        );
        return res.data;
    } catch (error) {
        console.error(error.response?.data || error.message);

        throw error;
    }
};

export const getAllRoleChangeRequests = async () => {
    try {
        const res = await axiosInstance.get(
            "/roleChangeRequest"
        );
        return res.data;
    } catch (error) {
        console.error(error.response?.data || error.message);

        throw error;
    }
}

export const changeRole = async (id, status) => {
    try {
        const res = await axiosInstance.patch(
            "/roleChangeRequest", { requestId: id, status: status }
        );
        return res.data;
    } catch (error) {
        console.error(error.response?.data || error.message);

        throw error;
    }
}