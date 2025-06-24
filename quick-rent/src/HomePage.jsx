import React from 'react'
import EquipmentCard from './EquipmentCard.jsx'
import Search from './Search.jsx'
import Sort from './Sort.jsx'
import { useState, useEffect } from 'react'
import { getAllEquipments } from './services/EquipmentService';

function HomePage() {

    const [search, setSearch] = useState('');
    const [equipments, setEquipments] = useState([])

    useEffect(() => {

        const fetchData = async () => {
            let data = await getAllEquipments();
            setEquipments(data.filter((eq) => (eq.name).toLowerCase().includes(search.toLowerCase()) || (eq.description).toLowerCase().includes(search.toLowerCase())));
        }

        fetchData();

    }, [search]);

    return (
        <main className='flex flex-col justify-center items-center m-2 p-2'>
            <Search
                search={search}
                setSearch={setSearch}
            />

            <Sort/>

           
            <EquipmentCard
                equipments={equipments}
            />
        </main>
    )
}

export default HomePage