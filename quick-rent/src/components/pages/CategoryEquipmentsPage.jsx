import React, { useEffect, useState } from "react";
import { getEquipmentsByCategory } from "../../services/EquipmentService";
import { useParams } from "react-router-dom";
import EquipmentCard from "../EquipmentCard";

function CategoryEquipmentsPage() {
  const { category } = useParams();
  const [equipments, setEquipments] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      let data = await getEquipmentsByCategory(category);
      setEquipments(data);
    };
    fetchData();
  }, [category]);

  return (
    <div className="m-2">
      <a className="p-2 m-3 text-2xl" href="">
        {category}
      </a>
      <EquipmentCard equipments={equipments}></EquipmentCard>
    </div>
  );
}

export default CategoryEquipmentsPage;
