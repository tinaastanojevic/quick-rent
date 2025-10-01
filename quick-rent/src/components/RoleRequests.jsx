import React from "react";
import { format } from "date-fns";

function RoleRequests({ requests, handleRoleRequest }) {
  return (
    <>
      {requests?.map((request) => (
        <div
          key={`owner-${request.id}`}
          className="flex flex-col md:flex-row bg-white rounded-2xl shadow-md p-4 m-3 w-full max-w-7xl "
        >
          <div className="flex flex-col p-2 m-2">
            <label className="text-2xl font-bold text-gray-800">User:</label>
            <label className="text-xl text-gray-700">{request.username}</label>

            <label className="text-2xl font-bold text-gray-800 mt-2">
              Request date:
            </label>
            <label className="text-xl text-gray-700">
              {format(new Date(request.requestDate), "PPP")}
            </label>

            <label className="text-2xl font-bold text-gray-800 mt-2">
              Status:
            </label>
            <label className="text-xl text-gray-700">{request.status}</label>
          </div>

          {request.status === "pending" && (
            <div className="flex mt-auto ml-auto">
              <button
                onClick={() => handleRoleRequest(request.id, "Approved")}
                className="bg-green-600 text-white text-xl rounded-xl px-4 py-2 m-1 hover:bg-green-500 cursor-pointer"
              >
                Approve
              </button>
              <button
                onClick={() => handleRoleRequest(request.id, "Rejected")}
                className="bg-red-600 text-white text-xl rounded-xl px-4 py-2 m-1 hover:bg-red-500 cursor-pointer"
              >
                Reject
              </button>
            </div>
          )}
        </div>
      ))}
    </>
  );
}

export default RoleRequests;
