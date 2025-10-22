import React, { useState, useContext, useMemo } from "react";
import { AuthContext } from "../context/AuthContext";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getEquipmentPublishRequests,
  changeEquipmentPublishRequestStatus,
} from "../services/EquipmentPublishRequestService";
import {
  getAllRoleChangeRequests,
  changeRole,
} from "../services/RoleChangeRequest";
import { getRentalRequests,approveOrRejectRequest } from "../services/RentalService";
import RequestCard from "./RequestCard";
import RequestsFilter from "./RequestsFilter";
import PublishRequests from "./PublishRequests";
import RoleRequests from "./RoleRequests";
import AdminTabs from "./AdminTabs";

function AdminRequests() {
  const { getUserId } = useContext(AuthContext);
  const [requestType, setRequestType] = useState("role");
  const [requestsStatus, setRequestsStatus] = useState("All");
  const queryClient = useQueryClient();

  const { data: requests = [], isLoading } = useQuery({
    queryKey: ["requests", requestType],
    queryFn: () => getRequestsByType(requestType),
    enabled: !!requestType,
    keepPreviousData: true,
  });

  const handlePublishRequest = async (id, status) => {
    const data = await changeEquipmentPublishRequestStatus(id, {
      status: status,
    });
    queryClient.invalidateQueries(["requests", requestType]);
    alert(data.data);
  };

  const handleRoleRequest = async (id, status) => {
    await changeRole(id, status);
    queryClient.invalidateQueries(["requests", requestType]);
  };

  const handleRentalRequest = async (id, status) => {
     let data = await approveOrRejectRequest(id, status);
     queryClient.invalidateQueries(["requests", requestType]);
        alert(data);
  };

  const getRequestsByType = (type) => {
    if (type === "rental") return getRentalRequests(getUserId());
    if (type === "publish") return getEquipmentPublishRequests();
    return getAllRoleChangeRequests();
  };

  const filteredRequests = useMemo(() => {
    if (requestsStatus === "All") return requests;
    return requests.filter(
      (r) => r.status?.toLowerCase() === requestsStatus.toLowerCase()
    );
  }, [requests, requestsStatus]);

  const showRequestsWithSpecificStatus = (text) => {
    setRequestsStatus(text);
  };

  return (
    <div className="flex flex-col items-center  bg-gray-100 min-h-screen p-4 ">
      <AdminTabs setRequestType={setRequestType} />

      {isLoading ? (
        <label className="text-2xl font-bold text-gray-700 mt-6">
          Loading...
        </label>
      ) : (
        <>
          {/* ROLE REQUESTS */}
          {requestType === "role" && (
            <div className="w-full flex flex-col items-center mt-4 ">
              <RequestsFilter
                requestsStatus={requestsStatus}
                showRequestsWithSpecificStatus={showRequestsWithSpecificStatus}
              />
              {filteredRequests.length === 0 ? (
                <label className="text-2xl font-bold text-green-600 p-2">
                  No role requests!
                </label>
              ) : (
                <RoleRequests
                  requests={filteredRequests}
                  handleRoleRequest={handleRoleRequest}
                />
              )}
            </div>
          )}

          {/* RENTAL REQUESTS */}
          {requestType === "rental" && (
            <div className="w-full flex flex-col items-center mt-4">
              <RequestsFilter
                requestsStatus={requestsStatus}
                showRequestsWithSpecificStatus={showRequestsWithSpecificStatus}
              />
              {filteredRequests.length === 0 ? (
                <label className="text-2xl font-bold text-gray-700">
                  No rental requests!
                </label>
              ) : (
                <RequestCard requests={filteredRequests}  handleRentalRequest={handleRentalRequest}/>
              )}
            </div>
          )}

          {/* PUBLISH REQUESTS */}
          {requestType === "publish" && (
            <div className="w-full flex flex-col items-center mt-4">
              <RequestsFilter
                requestsStatus={requestsStatus}
                showRequestsWithSpecificStatus={showRequestsWithSpecificStatus}
              />
              {filteredRequests.length === 0 ? (
                <label className="text-2xl font-bold text-green-600 p-2">
                  No equipment publish requests!
                </label>
              ) : (
                <PublishRequests
                  requests={filteredRequests}
                  handleRequest={handlePublishRequest}
                />
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default AdminRequests;
