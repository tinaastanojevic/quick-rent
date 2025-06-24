import React, { useEffect, useState } from 'react'
import { getEquipmentPublishRequests, changeEquipmentPublishRequestStatus } from './services/EquipmentPublishRequestService'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

function AdminRequests() {
    const [requests, setRequests] = useState([]);
    const [requestType, setRequestType] = useState('publish');

    useEffect(() => {
        const fetchData = async () => {
            let data = await getEquipmentPublishRequests();
            setRequests(data);
            console.log(data);
        }
        fetchData();
    }, [])

    const handleRequest = async (id, status) => {
        let data = await changeEquipmentPublishRequestStatus(id, { status: status });
        console.log(data);
        window.location.reload();

    }

    const handleRequestView = (requestType) => {
        setRequestType(requestType);
    }


    return (
        <div className='flex items-center justify-center flex-col border-t'>
            <Tabs defaultValue="publish" className='flex p-2 bg-[var(--primary)]  w-full'>
                <TabsList className='p-6 w-full bg-[var(--primary)]'>
                    <TabsTrigger className='text-2xl p-5 cursor-pointer text-[var(--text)]' onClick={() => { handleRequestView("publish") }} value="publish">  Publish requests</TabsTrigger>
                    <TabsTrigger className='text-2xl p-5 cursor-pointer text-[var(--text)]' onClick={() => { handleRequestView("owner") }} value="owner">  Owner requests</TabsTrigger>
                </TabsList>
            </Tabs>


            {requestType === "owner" ? (
                <div>

                    <h2 className="text-2xl text-green-700 m-5">Showing owner requests</h2>
                </div>
            ) : (
                <>
                    {requests &&
                        requests.map((request) => (
                            <div className='flex flex-wrap md:flex-nowrap items-start justify-start flex-row p-5 m-3 border-[var(--secondary)] border-1 rounded-2xl w-full max-w-7xl' key={request.id}>

                                <div className='w-full h-full md:max-w-1/3'>
                                    <img
                                        className='rounded-md w-full object-cover'
                                        src={`http://localhost:5105${request.imageUrl}`}
                                        alt={request.name}
                                    />
                                    
                                </div>

                                <div className='flex flex-col p-2 m-2'>
                                    <label className=' text-2xl font-bold text-[var(--text)]'>
                                        User:
                                    </label>
                                    <label className=' text-[var(--text)] text-xl'>{request.ownerUsername}</label>

                                     <label className='text-2xl font-bold text-[var(--text)]'>
                                        Name:

                                    </label> <label className=' text-[var(--text)] text-xl'>{request.name}</label>
                                </div>

                                <div className='flex flex-col p-2 m-2'>
                                    <label className='text-2xl font-bold text-[var(--text)]'>
                                        Description:

                                    </label> <label className=' text-[var(--text)] text-xl'>{request.description}</label>

                                        <label className='text-2xl font-bold text-[var(--text)]'>
                                        Category:

                                    </label><label className=' text-[var(--text)] text-xl'>{request.category}</label>
                                </div>

                                <div className='flex flex-col p-2 m-2'>
                                    <label className='text-2xl font-bold text-[var(--text)]'>
                                        Price:
                                    </label>
                                     <label className='text-[var(--text)] text-xl'>{request.price}</label>

                                    <label className='text-2xl font-bold text-[var(--text)]'>
                                        Location:

                                    </label> <label className='text-[var(--text)] text-xl'>{request.location}</label>
                                </div>

                                <div className='flex justify-end items-end w-1/3'>
                                    <button
                                        onClick={() => handleRequest(request.id, "Approved")}
                                        className='bg-green-600 text-2xl p-3 m-2 text-white rounded-2xl cursor-pointer hover:bg-green-500'>
                                        Approve
                                    </button>
                                    <button
                                        onClick={() => handleRequest(request.id, "Rejected")}
                                        className='bg-red-600 text-2xl p-3 m-2 text-white rounded-2xl cursor-pointer hover:bg-red-500'>
                                        Reject
                                    </button>
                                </div>
                            </div>
                        ))
                    }
                </>
            )}
        </div>
    );
}

export default AdminRequests