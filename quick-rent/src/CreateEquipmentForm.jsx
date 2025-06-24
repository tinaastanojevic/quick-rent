import React, { useState, useContext } from 'react'
import { Input } from "@/components/ui/input"
import { useForm } from 'react-hook-form';
import { Textarea } from "@/components/ui/textarea"
import { createEquipmentPublishRequest } from "./services/EquipmentPublishRequestService"
import { AuthContext } from './context/AuthContext';

function CreateEquipmentForm() {
    const { register, handleSubmit, reset } = useForm();
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
        setImageFile('');
    }

    const handleImageChange = (e) => {

        const file = e.target.files[0];
        if (file) {
            console.log(file)
            setImageFile(file);
        }
    }

    return (
        <form onSubmit={handleSubmit(submit)} className='flex flex-col justify-center items-center p-10 m-2 border border-[var(--primary)] rounded-md min-w-1/3 max-w-2/3'>

            {imageFile &&

                <img src={URL.createObjectURL(imageFile)}
                    alt="Preview"
                    className="w-40 h-40 object-cover rounded border">
                </img>
            }

            <Input
                className='text-[var(--secondary)] file:text-[var(--text)]'
                onChange={handleImageChange}
                accept="image/*"
                type="file"
            >

            </Input>




            <Input
                {...register("name", {
                    required: true,
                    minLength: 4
                })}
                type="text"
                className='p-2 m-2'
                placeholder="Name">
            </Input>

            <Input
                {...register("category", {
                    required: true,
                    minLength: 4
                })}
                type="text"
                className='p-2 m-2'
                placeholder="Category">
            </Input>

            <Textarea
                {...register("description", {
                    required: true,
                    minLength: 10
                })}

                type="text"

                className='p-2 m-2'
                placeholder="Description">
            </Textarea>

            <Input {...register("location", {
                required: true,
                minLength: 4
            })}
                type="text"
                className='p-2 m-2'
                placeholder="Location">
            </Input>

            <Input {...register("price", {
                required: true,

            })}
                type="number"
                className='p-2 m-2'
                placeholder="Price">
            </Input>

            <button className='flex self-end p-3 m-2 mt-4 bg-[var(--primary)] text-xl text-white rounded-md cursor-pointer hover:bg-[var(--secondary)]'>Submit</button>
        </form>
    )
}

export default CreateEquipmentForm