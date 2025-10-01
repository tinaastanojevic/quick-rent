import React from "react";
import CreateEquipmentForm from "../CreateEquipmentForm";

function CreateEquipmentPage() {
  return (
    <div className="flex flex-col items-center justify-center p-2 m-2">
      <h1 className="text-[var(--text)] text-2xl p-2">
        Publish new equipment for renting!
      </h1>
      <CreateEquipmentForm></CreateEquipmentForm>
    </div>
  );
}

export default CreateEquipmentPage;
