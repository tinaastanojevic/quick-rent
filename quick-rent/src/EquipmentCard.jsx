import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { formatDistanceToNow, parseISO } from 'date-fns';
import { useSearchParams } from 'react-router-dom';
import { useState } from 'react';



function EquipmentCard({ equipments }) {

  const [searchParams, setSearchParams] = useSearchParams();
  const [sortedEquipments, setSortedEquipments] = useState(null);

  const navigate = useNavigate();
  const sort = searchParams.get('sort');

  useEffect(() => {
    const sortItems = () => {

      if (equipments) {

        if (sort === "lowest to highest price")
          setSortedEquipments([...equipments].sort((a, b) => a.price - b.price));
        else if (sort === "highest to lowest price")
          setSortedEquipments([...equipments].sort((a, b) => b.price - a.price));
        else if (sort === "by date ascending")
          setSortedEquipments([...equipments].sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt)));
        else if (sort === "by date descending")
          setSortedEquipments([...equipments].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));
        else
          setSortedEquipments([...equipments]);
      }
    }
    sortItems();
  }, [sort]);

  useEffect(() => {
    if (equipments && equipments.length > 0) {
      setSortedEquipments(equipments);
    }
  }, [equipments]);


  const openOwnerProfile = async (ownerUsername) => {
    console.log(ownerUsername);
    navigate(`/profile/${ownerUsername}`);

  }

  return (
    <div className='flex flex-col justify-center items-center p-2'>

      {
        sortedEquipments &&
        sortedEquipments
          .map((el) => (
            <div key={el.id} className='flex flex-col border-solid border border-[var(--primary)] p-10 mt-6 rounded-md w-full max-w-5xl'>
              <div className='flex flex-wrap md:flex-nowrap justify-start'>


                <div className='w-full h-full md:max-w-1/3'>
                  <Link to={`/equipment/${el.id}`}>
                    <img className="rounded-md w-full h-full object-cover" src={`http://localhost:5105${el.imageUrl}`} alt={el.name}></img>
                  </Link>
                </div>

                <div className='flex flex-col p-2 m-2 justify-around'>
                  <label className='flex text-2xl text-blue-500 p-2 hover:text-blue-400 hover:underline'>
                    <Link to={`/equipment/${el.id}`}>
                      {el.name}
                    </Link>
                  </label>
                  <label className='text-xl p-2 text-[var(--text)]'>{el.description}</label>
                </div>


                <div className='p-2 m-2 text-3xl flex items-center'>
                  <label className='text-red-700'>{el.price}$</label>
                </div>

                <div className='p-2 m-2 flex flex-col justify-around'>
                  <label className={`flex text-xl p-2 text-[var(--text)] ${el.isAvailable ? "text-green-600" : "text-red-600"}`} >{el.isAvailable ? "Available" : "Not Available"}</label>
                  <label className='text-xl p-2 text-gray-500'>
                    {`Posted ${formatDistanceToNow(parseISO(el.createdAt), { addSuffix: true })} by`}
                    <label onClick={() => openOwnerProfile(el.ownerUsername)} className='text-xl ml-1 text-blue-500 cursor-pointer hover:text-blue-400'>{el.ownerUsername}</label>
                  </label>

                </div>

                <div className='m-2 flex flex-col'>

                  <label className='text-xl p-2 text-gray-500 self-end'>{el.location}</label>
                </div>



              </div>
              {/* <div className='self-end'>
                {el.isAvailable &&
                  <button onClick={() => { openEquipmentPage(el.id) }} className='p-4 m-2 border-1 border-solid border-[var(--secondary)] bg-[var(--primary)] self-end text-xl rounded-lg text-white hover:bg-[var(--secondary)] cursor-pointer w-full '>Rent this</button>
                }
              </div> */}
            </div>

          )
          )}

    </div>

  )
}

export default EquipmentCard