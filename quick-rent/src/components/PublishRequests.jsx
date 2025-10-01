import React from "react";

function PublishRequests({ requests, handleRequest }) {
  return (
    <>
      {requests.map((request) => (
        <div
          key={`publish-${request.id}`}
          className="flex flex-col md:flex-row bg-white shadow-md rounded-2xl p-3 m-3 w-full max-w-5xl"
        >
          <div className="w-full md:w-1/3 p-2 flex-shrink-0">
            <img
              className="rounded-md w-full h-60 object-contain"
              src={`http://localhost:5105${request.imageUrl}`}
              alt={request.name}
            />
          </div>

          <div className="flex-1 p-2 m-2 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col">
              <label className="text-xl font-bold text-gray-800">User:</label>
              <label className="text-lg text-gray-700">
                {request.ownerUsername}
              </label>

              <label className="text-xl font-bold text-gray-800 mt-2">
                Equipment name:
              </label>
              <label className="text-lg text-gray-700">{request.name}</label>

              <label className="text-xl font-bold text-gray-800 mt-2">
                Category:
              </label>
              <label className="text-lg text-gray-700">
                {request.category}
              </label>
              <label className="text-xl font-bold text-gray-800">
                Description:
              </label>
              <label className="text-lg text-gray-700">
                {request.description}
              </label>
            </div>

            <div className="flex flex-col">
              <label className="text-xl font-bold text-gray-800 mt-2">
                Price:
              </label>
              <label className="text-lg text-gray-700">{request.price}</label>

              <label className="text-xl font-bold text-gray-800 mt-2">
                Location:
              </label>
              <label className="text-lg text-gray-700">
                {request.location}
              </label>

              <label className="text-xl font-bold text-gray-800 mt-2">
                Request status:
              </label>
              <label className="text-lg text-gray-700">{request.status}</label>
            </div>

            {request.status === "Pending" && (
              <div className="flex justify-end col-span-2 mt-2">
                <button
                  onClick={() => handleRequest(request.id, "Approved")}
                  className="bg-green-600 text-xl text-white rounded-xl px-4 py-2 m-1 cursor-pointer hover:bg-green-500"
                >
                  Approve
                </button>
                <button
                  onClick={() => handleRequest(request.id, "Rejected")}
                  className="bg-red-600 text-xl text-white rounded-xl px-4 py-2 m-1 hover:bg-red-500 cursor-pointer"
                >
                  Reject
                </button>
              </div>
            )}
          </div>
        </div>
      ))}
    </>
  );
}

export default PublishRequests;
