import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { getOwnersPosts } from './services/UserService'
import { getRentalRequests } from './services/EquipmentService'
import EquipmentCard from './EquipmentCard';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useContext } from 'react'
import { AuthContext } from './context/AuthContext';
import RequestCard from './RequestCard';

function OwnerProfile() {

  const [ownerInfo, setOwnerInfo] = useState({});
  const [isOwnProfile, setIsOwnProfile] = useState(false);
  const [showEquipments, setShowEquipments] = useState(true);
  const [rentalRequests, setRentalRequests] = useState([]);
  const { getUserId, getUsername, roles } = useContext(AuthContext);
  const { ownerUsername } = useParams();

  const isCustomerProfile = roles.includes("Customer");

  useEffect(() => {

    const fetchData = async () => {
      if (getUsername() === ownerUsername) {
        setIsOwnProfile(true);

        if (!isCustomerProfile) {
          let requests = await getRentalRequests(getUserId());
          setRentalRequests(requests);
        }
        else {
          console.log("Customer profile");
        }

      }

      let user = await getOwnersPosts(ownerUsername);
      setOwnerInfo(user);
    }
    fetchData();

  }, [ownerUsername])


  const handleView = (showEquipments) => {
    setShowEquipments(showEquipments);

  }

  return (
    <>
      {
        ownerInfo && (
          <div className='flex p-2 m-2 border-1 flex-col border-solid justify-start items-start'>

            <div>
              <label className='m-2 text-[var(--text)] text-2xl font-bold'>
                Username:
              </label>
              <label className='text-[var(--text)] text-xl'>{ownerInfo.username}</label>
            </div>

            <div>
              <label className='text-[var(--text)] m-2 text-2xl font-bold'>
                Email:
              </label>
              <label className='text-[var(--text)] text-xl'>{ownerInfo.email}</label>
            </div>

            {!isCustomerProfile && (
              <div>
                <label className='m-2 text-2xl font-bold text-[var(--text)]'>
                  Number of items:
                </label>
                <label className='text-[var(--text)] text-xl'>
                  {ownerInfo.equipments ? ownerInfo.equipments.length : 0}
                </label>
              </div>
            )}

          </div>
        )
      }

      {isOwnProfile && !isCustomerProfile ?
        <>

          <Tabs defaultValue="equipments" className='flex p-2 bg-[var(--primary)]  w-full'>
            <TabsList className='p-6 w-full bg-[var(--primary)]'>
              <TabsTrigger className='text-2xl p-5 cursor-pointer text-[var(--text)]' onClick={() => { handleView(true) }} value="equipments">My equipments</TabsTrigger>
              <TabsTrigger className='text-2xl p-5 cursor-pointer text-[var(--text)]' onClick={() => { handleView(false) }} value="requests">Rental requests</TabsTrigger>
            </TabsList>
          </Tabs>
          {ownerInfo.equipments && showEquipments &&
            <EquipmentCard equipments={ownerInfo.equipments} ></EquipmentCard>
          }
          {
            !showEquipments && rentalRequests &&
            <RequestCard requests={rentalRequests} isRentalRequest={true}></RequestCard>
          }
        </>
        :
        isCustomerProfile && isCustomerProfile ?
          <div className='w-full flex flex-col justify-center text-3xl text-[var(--text)] '>
            <div>
              <button className='p-4 m-2 border-1 border-solid border-[var(--secondary)] bg-[var(--primary)] self-end text-xl rounded-lg text-white hover:bg-[var(--secondary)] cursor-pointer'>Become owner</button>
            </div>
            <label className='self-center'>My requests</label>
          </div>
          :

          <EquipmentCard equipments={ownerInfo.equipments} ></EquipmentCard>

      }

    </>
  )
}

export default OwnerProfile