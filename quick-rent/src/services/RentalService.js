import axiosInstance from '../interceptor/axiosInstance';


export const approveOrRejectRequest = async (id,status) => {
    let res = await axiosInstance.patch(`/rentalRequest/${id}`,{ status: status });
      console.log(res.data);
    return res.data;
}
