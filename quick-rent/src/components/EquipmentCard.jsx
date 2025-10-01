import React, { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { formatDistanceToNow, parseISO } from "date-fns";

function EquipmentCard({ equipments }) {
  const [searchParams] = useSearchParams();
  const [sortedEquipments, setSortedEquipments] = useState(null);

  const navigate = useNavigate();
  const sort = searchParams.get("sort");

  useEffect(() => {
    const sortItems = () => {
      if (equipments) {
        if (sort === "lowest to highest price")
          setSortedEquipments(
            [...equipments].sort((a, b) => a.price - b.price)
          );
        else if (sort === "highest to lowest price")
          setSortedEquipments(
            [...equipments].sort((a, b) => b.price - a.price)
          );
        else if (sort === "by date ascending")
          setSortedEquipments(
            [...equipments].sort(
              (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
            )
          );
        else if (sort === "by date descending")
          setSortedEquipments(
            [...equipments].sort(
              (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
            )
          );
        else setSortedEquipments([...equipments]);
      }
    };
    sortItems();
  }, [sort, equipments]);

  useEffect(() => {
    if (equipments && equipments.length > 0) {
      setSortedEquipments(equipments);
    }
  }, [equipments]);

  const openOwnerProfile = (ownerUsername) => {
    navigate(`/profile/${ownerUsername}`);
  };

  return (
    <div className="flex flex-col justify-center items-center p-2 w-full rounded-2xl">
      {sortedEquipments &&
        sortedEquipments.map((el) => (
          <div
            onClick={() => navigate(`/equipment/${el.id}`)}
            key={el.id}
            className="relative bg-card text-card-foreground p-4 mt-6 mb-6 rounded-2xl w-full max-w-5xl shadow-md hover:bg-secondary hover:text-secondary-foreground cursor-pointer grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-4 transition-colors"
          >
            <img
              // className="rounded-md w-full h-full object-cover max-h-60"
              className="rounded-md w-full h-60 object-contain"
              src={`http://localhost:5105${el.imageUrl}`}
              alt={el.name}
            />
            <div className="flex flex-col justify-between relative">
              <span
                className={`absolute top-0 right-0 mt-2 mr-2 text-xl font-bold ${
                  el.isAvailable ? "text-green-600" : "text-red-600"
                }`}
              >
                {el.isAvailable ? "Available" : "Not Available"}
              </span>

              <h2 className="text-xl font-bold">{el.name}</h2>

              <p className="mt-2 text-muted-foreground">{el.description}</p>

              <span className="text-destructive font-semibold text-2xl mt-2">
                {el.price}$
              </span>

              <div className="text-muted-foreground text-sm mt-2">
                {`Posted ${formatDistanceToNow(parseISO(el.createdAt), {
                  addSuffix: true,
                })} by `}
                <span
                  onClick={(e) => {
                    e.stopPropagation();
                    openOwnerProfile(el.ownerUsername);
                  }}
                  className="text-primary cursor-pointer hover:underline"
                >
                  {el.ownerUsername}
                </span>
              </div>
              <div className="text-muted-foreground text-sm mt-1">
                {el.location}
              </div>
            </div>
          </div>
        ))}
    </div>
  );
}

export default EquipmentCard;
