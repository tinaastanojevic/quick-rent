import React from 'react'
import { format, formatDistanceToNow, parseISO } from 'date-fns';
import {approveOrRejectRequest} from './services/RentalService'


function RequestCard({ requests, isRentalRequest }) {


    const handleRequest = (id, status) => {
        console.log(id + status);
        let data= approveOrRejectRequest(id,status);
        alert(data);
    }

    return (
        <div className='flex flex-col justify-center items-center p-2'>
            {requests && requests.map((request) => (
                <div
                    className='flex flex-wrap md:flex-nowrap items-start justify-start flex-row p-5 m-3 border-[var(--secondary)] border-1 rounded-2xl w-full max-w-7xl'
                    key={request.id}
                >
                    <div className='w-full h-full md:max-w-1/3'>
                        <img
                            className='rounded-md w-full object-cover'
                            src={`http://localhost:5105${request.equipment.imageUrl}`}
                            alt={request.equipment.name}
                        />
                    </div>

                    <div className='flex flex-col p-2 m-2'>
                        <label className='text-2xl font-bold text-[var(--text)]'>User:</label>
                        <label className='text-[var(--text)] text-xl'>{request.requestedBy}</label>

                        <label className='text-2xl font-bold text-[var(--text)]'>Name:</label>
                        <label className='text-[var(--text)] text-xl'>{request.equipment.name}</label>
                    </div>

                    <div className='flex flex-col p-2 m-2'>
                        <label className='text-2xl font-bold text-[var(--text)]'>Description:</label>
                        <label className='text-[var(--text)] text-xl'>{request.equipment.description}</label>

                        <label className='text-2xl font-bold text-[var(--text)]'>Category:</label>
                        <label className='text-[var(--text)] text-xl'>{request.equipment.category}</label>
                    </div>

                    <div className='flex flex-col p-2 m-2'>
                        <label className='text-2xl font-bold text-[var(--text)]'>Price:</label>
                        <label className='text-[var(--text)] text-xl'>{request.equipment.price}</label>

                        <label className='text-2xl font-bold text-[var(--text)]'>Location:</label>
                        <label className='text-[var(--text)] text-xl'>{request.equipment.location}</label>
                    </div>

                    {isRentalRequest && (
                        <div className='flex flex-col w-full p-2 m-2 text-[var(--text)]'>
                            <label className='text-2xl font-bold'>Start date:</label>
                            <label className='text-xl'>{format(request.startDate, "PPP")}</label>

                            <label className='text-2xl font-bold'>End date:</label>
                            <label className='text-xl'>{format(request.endDate, "PPP")}</label>
                        </div>
                    )}

                    <div className='flex flex-col h-64'>
                        <div className='flex'>

                            <button
                                onClick={() => handleRequest(request.id, "Approved")}
                                className='bg-green-600 text-2xl p-3 m-2 text-white rounded-2xl cursor-pointer hover:bg-green-500'
                            >
                                Approve
                            </button>
                            <button
                                onClick={() => handleRequest(request.id, "Rejected")}
                                className='bg-red-600 text-2xl p-3 m-2 text-white rounded-2xl cursor-pointer hover:bg-red-500'
                            >
                                Reject
                            </button>
                        </div>
                        <div className='text-[var(--text)] self-end mt-auto'>

                            <label >
                                {`${formatDistanceToNow(parseISO(request.requestDate), { addSuffix: true })}`}
                            </label>

                        </div>

                    </div>


                </div>

            ))}
        </div>
    );

}

export default RequestCard