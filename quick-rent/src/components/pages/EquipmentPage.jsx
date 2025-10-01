import React, { useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { formatDistanceToNow, parseISO, compareAsc } from "date-fns";
import { getEquipmentById } from "../../services/EquipmentService";
import { sendRentalRequest } from "../../services/RentalService";
import { AuthContext } from "../../context/AuthContext";
import DatePicker from "../DatePicker";
import { useQuery } from "@tanstack/react-query";

function EquipmentPage() {
  const { id } = useParams();
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const { getUserId, getUsername } = useContext(AuthContext);

  const navigate = useNavigate();

  const { data: equipment, isLoading } = useQuery({
    queryKey: ["getEquipemntById", id],
    queryFn: () => getEquipmentById(id),
    enabled: !!id,
  });

  if (isLoading) return <div>Loading...</div>;

  const openOwnerProfile = async (ownerUsername) => {
    console.log(ownerUsername);
    navigate(`/profile/${ownerUsername}`);
  };

  const rentEquipment = async () => {
    setShowDatePicker(true);
    let rentThisButton = document.getElementById("rentThisButton");
    rentThisButton.style.visibility = "hidden";
  };

  const sendRentRequest = async () => {
    if (startDate !== null && endDate !== null)
      if (compareAsc(startDate, endDate) <= 0) {
        let requestData = {
          equipmentID: id,
          userID: getUserId(),
          startDate: startDate.toISOString(),
          endDate: endDate.toISOString(),
        };

        let res = await sendRentalRequest(requestData);
        alert(res.data);
        clearDates();
      } else alert("Invalid date. End date can't be before start date!");
    else alert("Pick a date before sending a request!");
  };

  const openCategoy = async (category) => {
    navigate(`/category/${category}`);
  };

  function clearDates() {
    setEndDate("");
    setStartDate("");
    setShowDatePicker(false);
    document.getElementById("rentThisButton").style.visibility = "visible";
  }

  return (
    <div className="flex justify-center p-10 w-full min-h-screen bg-background">
      {equipment && (
        <div className="grid grid-cols-1 md:grid-cols-[2fr_3fr] gap-8 bg-card p-6 rounded-2xl shadow-md w-full max-w-7xl">
          <div className="flex justify-center items-start">
            <img
              className="rounded-lg object-contain max-h-[35rem] w-full"
              src={`http://localhost:5105${equipment.imageUrl}`}
              alt={equipment.name}
            />
          </div>
          <div className="flex flex-col justify-start gap-4 text-foreground">
            <div className="flex justify-between items-start">
              <h2 className="text-4xl font-bold text-blue-500">
                {equipment.name}
              </h2>
              <span
                className={`text-xl font-semibold mt-1 ${
                  equipment.isAvailable ? "text-green-600" : "text-red-600"
                }`}
              >
                {equipment.isAvailable ? "Available" : "Not Available"}
              </span>
            </div>

            <h3
              onClick={() => openCategoy(equipment.category)}
              className="text-2xl cursor-pointer hover:text-blue-400"
            >
              {equipment.category}
            </h3>

            <p className="text-2xl text-red-700 font-semibold">
              {equipment.price} $
            </p>
            <p className="text-lg">{equipment.description}</p>

            <p className="text-gray-500">
              {`Posted ${formatDistanceToNow(parseISO(equipment.createdAt), {
                addSuffix: true,
              })} by `}
              <span
                onClick={() => openOwnerProfile(equipment.ownerUsername)}
                className="text-blue-500 cursor-pointer hover:text-blue-400"
              >
                {equipment.ownerUsername}
              </span>
            </p>

            <p className="text-gray-500">{equipment.location}</p>
            {equipment.isAvailable &&
              equipment.ownerUsername !== getUsername() && (
                <div className="flex flex-col gap-3 mt-4">
                  <button
                    id="rentThisButton"
                    onClick={rentEquipment}
                    className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg shadow transition-all text-lg w-max"
                  >
                    Rent this
                  </button>

                  {showDatePicker && (
                    <div className="flex flex-col gap-3">
                      <DatePicker
                        date={startDate}
                        setDate={setStartDate}
                        startOrEndDate={"Start date"}
                      />
                      <DatePicker
                        date={endDate}
                        setDate={setEndDate}
                        startOrEndDate={"End date"}
                      />
                      <button
                        onClick={sendRentRequest}
                        className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg shadow transition-all text-lg self-end"
                      >
                        Rent
                      </button>
                    </div>
                  )}
                </div>
              )}
          </div>
        </div>
      )}
    </div>
  );
}

export default EquipmentPage;
