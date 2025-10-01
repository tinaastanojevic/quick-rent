import React from "react";
import EquipmentCard from "../EquipmentCard.jsx";
import Search from "../Search.jsx";
import Sort from "../Sort.jsx";
import { useState, useMemo } from "react";
import { getAllEquipments } from "../../services/EquipmentService.js";
import { useQuery } from "@tanstack/react-query";

function HomePage() {
  const [search, setSearch] = useState("");

  const { data: equipments, isLoading } = useQuery({
    queryKey: ["getEquipments"],
    queryFn: getAllEquipments,
  });

  const filteredEquipment = useMemo(() => {
    if (equipments)
      return equipments.filter(
        (eq) =>
          eq.name.toLowerCase().includes(search.toLowerCase()) ||
          eq.description.toLowerCase().includes(search.toLowerCase())
      );
  }, [equipments, search]);

  return (
    <>
      <div className="flex flex-col justify-center items-center m-4 mt-5 p-2 bg-gray-100 rounded-4xl shadow-md">
        <Search search={search} setSearch={setSearch} />
        <Sort />
        {isLoading ? (
          <div>Loading data...</div>
        ) : (
          <EquipmentCard equipments={filteredEquipment} />
        )}
      </div>
    </>
  );
}

export default HomePage;
