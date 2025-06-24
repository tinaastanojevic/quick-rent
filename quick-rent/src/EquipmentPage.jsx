import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import { getEquipmentById } from './services/EquipmentService'
import { formatDistanceToNow, parseISO, format, compareAsc } from 'date-fns';
import { sendRentalRequest } from './services/EquipmentService'
import { cn } from "@/lib/utils"
import { CalendarIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { useContext } from 'react'
import { AuthContext } from './context/AuthContext';


function EquipmentPage() {
    const { id } = useParams();
    const [equipment, setEquipment] = useState(null)
    const [showDatePicker, setShowDatePicker] = useState(false)
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const { getUserId,getUsername } = useContext(AuthContext);

    const today = new Date();


    const navigate = useNavigate();


    useEffect(() => {

        const fetchData = async () => {
            if (id) {
                let equipment = await getEquipmentById(id);
                console.log(equipment);
                setEquipment(equipment);
            }

        }
        fetchData();
    }, [id])

    const openOwnerProfile = async (ownerUsername) => {
        console.log(ownerUsername);
        navigate(`/profile/${ownerUsername}`);

    }

    const rentEquipment = async () => {
        setShowDatePicker(true);
    }

    const sendRentRequest = async () => {
        if (startDate !== null && endDate !== null)
            if (compareAsc(startDate, endDate) <= 0) {
                let requestData = {
                    equipmentID: id,
                    userID: getUserId(),
                    startDate: startDate.toISOString(),
                    endDate: endDate.toISOString()
                }
                let res = await sendRentalRequest(requestData);
                console.log(res);
                alert("Request for renting " + equipment.name + " is sent");
                setEndDate('');
                setStartDate('');
                setShowDatePicker(false);
            }
            else
                alert("Invalid date. End date can't be before start date!");
        else
            alert("PICK A DATE BEFORE SENDING REQUEST!");

    }

    const openCategoy = async (category) => {
        navigate(`/category/${category}`)
    }

    return (
        <div className='flex w-full items-center justify-center'>
            {equipment &&
                <div className='flex flex-wrap  md:flex-nowrap border-l-1 border-r-1 border-[var(--primary)] text-[var(--text)] p-10 m-10 items-stretch'>

                    <div className='w-full h-full md:max-w-5xl flex flex-col'>

                        <img className="rounded-md w-full max-h-[40rem] object-contain" src={`http://localhost:5105${equipment.imageUrl}`} alt={equipment.name}></img>
                        <div className='p-4 m-3 flex flex-col'>
                            <label className='flex text-3xl text-blue-500 '>
                                {equipment.name}
                            </label>
                            <label onClick={() => { openCategoy(equipment.category) }} className='flex text-2xl mt-3 cursor-pointer'>
                                {equipment.category}
                            </label>

                            <label className='text-red-700 text-3xl  mt-3'>
                                {equipment.price} $
                            </label>
                            <label className='text-2xl mt-3'>
                                {equipment.description}
                            </label>

                        </div>
                    </div>


                    <div className='p-2 m-2 flex flex-col justify-center items-center'>

                        <div className='flex flex-col'>

                            <label className={`flex text-3xl text-[var(--text)] ${equipment.isAvailable ? "text-green-600" : "text-red-600"}`} >{equipment.isAvailable ? "Available" : "Not Available"}</label>
                            <label className='text-2xl text-gray-500'>
                                {`Posted ${formatDistanceToNow(parseISO(equipment.createdAt), { addSuffix: true })}`}

                            </label>

                            <label onClick={() => openOwnerProfile(equipment.ownerUsername)} className='text-2xl text-blue-500 cursor-pointer hover:text-blue-400'>{equipment.ownerUsername}</label>
                            <label className='text-2xl'>
                                {equipment.location}
                            </label>
                        </div>


                        <div className='mt-auto'>

                            {equipment.isAvailable && equipment.ownerUsername!==getUsername() &&
                                <div className=''>


                                    <button onClick={rentEquipment} className='p-4 m-2 w-2/3 border-1 border-solid border-[var(--secondary)] bg-[var(--primary)] text-xl rounded-lg text-white hover:bg-[var(--secondary)] cursor-pointer '>Rent this</button>

                                    {showDatePicker &&
                                        <div className='p-2 m-2 flex '>
                                            <div className='p-2 m-2'>
                                                <Popover >
                                                    <PopoverTrigger className='mb-4' asChild>
                                                        <Button
                                                            variant={"outline"}
                                                            className={cn(
                                                                "w-[240px] justify-start text-left font-normal",
                                                                !startDate && "text-muted-foreground"
                                                            )}
                                                        >
                                                            <CalendarIcon />
                                                            {startDate ? format(startDate, "PPP") : <span>Pick a start date</span>}
                                                        </Button>
                                                    </PopoverTrigger>
                                                    <PopoverContent className="w-auto p-0" align="start">
                                                        <Calendar
                                                            mode="single"
                                                            selected={startDate}
                                                            onSelect={setStartDate}
                                                            initialFocus
                                                            disabled={{ before: today }}
                                                        />
                                                    </PopoverContent>
                                                </Popover>


                                                <Popover>
                                                    <PopoverTrigger asChild>
                                                        <Button
                                                            variant={"outline"}
                                                            className={cn(
                                                                "w-[240px] justify-start text-left font-normal",
                                                                !endDate && "text-muted-foreground"
                                                            )}
                                                        >
                                                            <CalendarIcon />
                                                            {endDate ? format(endDate, "PPP") : <span>Pick an end date</span>}
                                                        </Button>
                                                    </PopoverTrigger>
                                                    <PopoverContent className="w-auto p-0" align="start">
                                                        <Calendar
                                                            mode="single"
                                                            selected={endDate}
                                                            onSelect={setEndDate}
                                                            initialFocus
                                                            disabled={{ before: today }}
                                                        />
                                                    </PopoverContent>
                                                </Popover>
                                            </div>

                                            <div className=''>
                                                <button onClick={sendRentRequest} className='p-4 m-2 border-1 border-solid border-blue-600 bg-blue-600 self-end text-xl rounded-lg text-white hover:bg-blue-500 cursor-pointer w-full '>Send rent request</button>

                                            </div>

                                        </div>



                                    }
                                </div>
                            }
                        </div>

                    </div>


                </div>


            }

        </div>
    )
}

export default EquipmentPage