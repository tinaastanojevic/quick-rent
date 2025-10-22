import React, { useState, useEffect, useContext, useMemo } from "react";
import { useParams } from "react-router-dom";
import { getUserInfo } from "../../services/UserService";
import { getRentalRequests,approveOrRejectRequest } from "../../services/RentalService";
import { sendRoleChangeRequest } from "../../services/RoleChangeRequest";
import EquipmentCard from "../EquipmentCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AuthContext } from "../../context/AuthContext";
import RequestCard from "../RequestCard";
import RequestsFilter from "../RequestsFilter";

import { useQuery,useQueryClient } from "@tanstack/react-query";


function ProfilePage() {
  const [userInfo, setUserInfo] = useState({});
  const [isOwnProfile, setIsOwnProfile] = useState(false);
  const [showEquipments, setShowEquipments] = useState(true);
  const [requestsStatus, setRequestsStatus] = useState("All");
  const { getUserId, getUsername, roles } = useContext(AuthContext);
  const { username } = useParams();

  const queryClient = useQueryClient();
  const isCustomerProfile = roles.includes("Customer");

  useEffect(() => {
    const fetchData = async () => {
      //profile username is same as logged in, open profile page for that specific user
      if (getUsername() === username) {
        setIsOwnProfile(true);
      }

      //if it's not the profile that is logged in, show posts from that owner
      try {
        let user = await getUserInfo(username);
        setUserInfo(user);
      } catch (error) {
        console.error("Cant get user info: ", error);
      }
    };
    fetchData();
  }, [username]);

  const { data: rentalRequests = [], isPending } = useQuery({
    queryKey: ["rentalRequests", getUserId()],
    queryFn: () => getRentalRequests(getUserId()),
    enabled: !isCustomerProfile,
  });

   const handleRentalRequest = async (id, status) => {
       let data = await approveOrRejectRequest(id, status);
       queryClient.invalidateQueries(["rentalRequests", getUserId()]);
          alert(data);
    };

  const filteredRequests = useMemo(() => {
    if (requestsStatus === "All") return rentalRequests;
    return rentalRequests.filter(
      (r) => r.status?.toLowerCase() === requestsStatus.toLowerCase()
    );
  }, [rentalRequests, requestsStatus]);

  const showRequestsWithSpecificStatus = async (status) => {
    setRequestsStatus(status);
  };

  const sendRequestToBecomeAnOwner = async () => {
    try {
      const response = await sendRoleChangeRequest(userInfo.id);
      alert("Request for role change is succesfully sent!");
      console.log(response);
    } catch (error) {
      alert(error.response?.data || error.message);
    }
  };

  if (!userInfo) return <div>User not found</div>;

  return (
    <>
      {userInfo && userInfo.length !== 0 && (
        <div className="bg-card rounded-2xl shadow-md p-6 my-4 w-full flex items-center gap-10">
          <div className="flex flex-col">
            <label className="text-2xl font-bold text-foreground mb-1">
              Username:
            </label>
            <span className="text-xl text-foreground">{userInfo.username}</span>
          </div>

          <div className="flex flex-col">
            <label className="text-2xl font-bold text-foreground mb-1">
              Email:
            </label>
            <span className="text-xl text-foreground">{userInfo.email}</span>
          </div>

          {!isCustomerProfile && (
            <div className="flex flex-col">
              <label className="text-2xl font-bold text-foreground mb-1">
                Number of items:
              </label>
              <span className="text-xl text-foreground">
                {userInfo.equipments ? userInfo.equipments.length : 0}
              </span>
            </div>
          )}
        </div>
      )}
      {isOwnProfile && !isCustomerProfile ? (
        <>
          <Tabs
            defaultValue="equipments"
            className="flex w-full bg-card p-2 rounded-2xl shadow-md"
          >
            <TabsList className="flex w-full bg-card p-2 rounded-2xl">
              <TabsTrigger
                className="text-xl p-4 cursor-pointer text-foreground hover:text-blue-500 transition-colors"
                onClick={() => setShowEquipments(true)}
                value="equipments"
              >
                My equipments
              </TabsTrigger>
              <TabsTrigger
                className="text-xl p-4 cursor-pointer text-foreground hover:text-blue-500 transition-colors"
                onClick={() => setShowEquipments(false)}
                value="requests"
              >
                Rental requests
              </TabsTrigger>
            </TabsList>
          </Tabs>

          {userInfo && userInfo.equipments && showEquipments && (
            <EquipmentCard equipments={userInfo.equipments} />
          )}

          {isPending && <div>Loading...</div>}

          {!showEquipments && !isPending && (
            <>
              <RequestsFilter
                requestsStatus={requestsStatus}
                showRequestsWithSpecificStatus={showRequestsWithSpecificStatus}
              />
              <RequestCard requests={filteredRequests} handleRentalRequest={handleRentalRequest} />
            </>
          )}
        </>
      ) : isCustomerProfile && userInfo ? (
        <div className="w-full flex flex-col justify-center items-center bg-card p-4 rounded-2xl shadow-md text-foreground">
          <button
            onClick={sendRequestToBecomeAnOwner}
            className="p-3 m-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg text-lg shadow transition-all"
          >
            Become owner
          </button>
          <label className="mt-2 text-xl text-foreground">My requests</label>
        </div>
      ) : (
        <EquipmentCard equipments={userInfo.equipments} />
      )}
    </>
  );
}

export default ProfilePage;
