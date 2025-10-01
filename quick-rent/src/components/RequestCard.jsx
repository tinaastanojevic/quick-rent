import React from "react";
import { format, formatDistanceToNow, parseISO } from "date-fns";
import { approveOrRejectRequest } from "../services/RentalService";

function RequestCard({ requests }) {
  const handleRequest = async (id, status) => {
    console.log(id + status);
    let data = await approveOrRejectRequest(id, status);

    alert(data);
  };

  return (
    <div className="flex flex-col justify-center items-center p-2">
      {requests &&
        requests.map((request) => (
          <div
            key={request.id}
            className="flex flex-wrap md:flex-nowrap items-start justify-start flex-row bg-card text-foreground shadow-md rounded-2xl p-5 m-3 w-full max-w-7xl transition-all hover:shadow-lg"
          >
            <div className="w-full md:w-1/3 h-full">
              <img
                //className="rounded-md w-full h-full object-cover"
                className="rounded-md w-full h-60 object-contain"
                src={`http://localhost:5105${request.equipment.imageUrl}`}
                alt={request.equipment.name}
              />
            </div>

            <div className="flex flex-col p-2 m-2 flex-1">
              <label className="text-2xl font-bold">User:</label>
              <label className="text-xl">{request.requestedBy}</label>

              <label className="text-2xl font-bold mt-2">Equipment:</label>
              <label className="text-xl">{request.equipment.name}</label>
            </div>

            <div className="flex flex-col p-2 m-2">
              <label className="text-2xl font-bold">Price:</label>
              <label className="text-xl">{request.equipment.price} $</label>

              <label className="text-2xl font-bold mt-2">Status:</label>
              <label className="text-xl">{request.status}</label>
            </div>

            <div className="flex flex-col p-2 m-2">
              <label className="text-2xl font-bold">Start date:</label>
              <label className="text-xl">
                {format(new Date(request.startDate), "PPP")}
              </label>

              <label className="text-2xl font-bold mt-2">End date:</label>
              <label className="text-xl">
                {format(new Date(request.endDate), "PPP")}
              </label>
            </div>
            {request.status === "pending" && (
              <div className="flex flex-col h-full justify-between p-2">
                <div className="flex gap-2">
                  <button
                    onClick={() => handleRequest(request.id, "Approved")}
                    className="bg-green-600 text-white text-xl p-2 rounded-lg hover:bg-green-500 transition-colors cursor-pointer"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => handleRequest(request.id, "Rejected")}
                    className="bg-red-600 text-white text-xl p-2 rounded-lg hover:bg-red-500 transition-colors cursor-pointer"
                  >
                    Reject
                  </button>
                </div>

                <div className="text-sm text-gray-500 mt-2">
                  {formatDistanceToNow(parseISO(request.requestDate), {
                    addSuffix: true,
                  })}
                </div>
              </div>
            )}
          </div>
        ))}
    </div>
  );
}

export default RequestCard;
