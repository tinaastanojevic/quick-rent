import React, { useState, useContext } from "react";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { Textarea } from "@/components/ui/textarea";
import { createEquipmentPublishRequest } from "../services/EquipmentPublishRequestService";
import { AuthContext } from "../context/AuthContext";

function CreateEquipmentForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    mode: "onChange",
  });
  const [imageFile, setImageFile] = useState(null);
  const { getUserId } = useContext(AuthContext);

  const submit = async (data) => {
    console.log(data);
    const formData = new FormData();
    formData.append("image", imageFile);
    formData.append("name", data.name);
    formData.append("category", data.category);
    formData.append("description", data.description);
    formData.append("price", data.price);
    formData.append("location", data.location);

    let userID = getUserId();
    formData.append("userID", userID);
    console.log(userID);

    let res = await createEquipmentPublishRequest(userID, formData);
    console.log(res);
    alert(res.data);

    reset();
    setImageFile("");
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      console.log(file);
      setImageFile(file);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(submit)}
      className="flex flex-col justify-center items-center p-10 m-2 bg-white shadow-md rounded-2xl w-full max-w-2xl"
    >
      {imageFile && (
        <img
          src={URL.createObjectURL(imageFile)}
          alt="Preview"
          className="w-40 h-40 object-cover rounded-lg border mb-4"
        />
      )}

      <Input
        className="mb-4 text-[var(--text)] file:text-[var(--text)]"
        onChange={handleImageChange}
        accept="image/*"
        type="file"
      />

      <Input
        {...register("name", {
          required: "Name is required!",
          minLength: {
            value: 4,
            message: "Name must be at least 4 characters",
          },
        })}
        type="text"
        className="mb-2 p-2 w-full rounded-lg border border-gray-300 shadow-sm"
        placeholder="Name"
      />
      {errors.name && (
        <p className="text-red-500 mb-2">{errors.name.message}</p>
      )}

      <Input
        {...register("category", {
          required: "Category is required!",
          minLength: {
            value: 4,
            message: "Category must be at least 4 characters",
          },
        })}
        type="text"
        className="mb-2 p-2 w-full rounded-lg border border-gray-300 shadow-sm"
        placeholder="Category"
      />
      {errors.category && (
        <p className="text-red-500 mb-2">{errors.category.message}</p>
      )}

      <Textarea
        {...register("description", {
          required: "Description is required!",
          minLength: {
            value: 10,
            message: "Description must be at least 10 characters",
          },
        })}
        className="mb-2 p-2 w-full rounded-lg border border-gray-300 shadow-sm"
        placeholder="Description"
      />
      {errors.description && (
        <p className="text-red-500 mb-2">{errors.description.message}</p>
      )}

      <Input
        {...register("location", {
          required: "Location is required!",
          minLength: {
            value: 3,
            message: "Location must be at least 3 characters",
          },
        })}
        type="text"
        className="mb-2 p-2 w-full rounded-lg border border-gray-300 shadow-sm"
        placeholder="Location"
      />
      {errors.location && (
        <p className="text-red-500 mb-2">{errors.location.message}</p>
      )}

      <Input
        {...register("price", { required: "Price is required!" })}
        type="number"
        className="mb-4 p-2 w-full rounded-lg border border-gray-300 shadow-sm"
        placeholder="Price"
      />
      {errors.price && (
        <p className="text-red-500 mb-2">{errors.price.message}</p>
      )}

      <button className="flex self-end p-3 mt-4 bg-blue-500 text-white text-xl cursor-pointer rounded-lg shadow-md hover:bg-blue-600 transition-colors">
        Publish
      </button>
    </form>
  );
}

export default CreateEquipmentForm;
