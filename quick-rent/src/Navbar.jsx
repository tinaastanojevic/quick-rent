import React, { useContext, useState, useEffect } from 'react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { getAllCategories } from './services/EquipmentService';
import { AuthContext } from './context/AuthContext';
import { useNavigate } from 'react-router-dom';

function Navbar() {
  const { isLoggedIn, logout, user, roles } = useContext(AuthContext);
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      let data = await getAllCategories();
      setCategories(data);
    }
    fetchData();

  }, [])

  const selectCategory = async (category) => {
    console.log(category);
    navigate(`/category/${category}`)
  }

  const openProfile = async (username) => {
    navigate(`/profile/${username}`);
  }


  return (
    <div className='flex p-4 bg-[var(--primary)] '>
      <a href='/' className='text-white text-xl cursor-pointer'>Home</a>


      <div className='ml-auto'>

        <DropdownMenu >
          <DropdownMenuTrigger className='text-white text-xl cursor-pointer pl-3 pr-3'>Categories</DropdownMenuTrigger>
          <DropdownMenuContent>
            {categories.map((category, index) => (
              <DropdownMenuItem key={index}
                className='focus:outline-none text-xl cursor-pointer'
                onClick={() => selectCategory(category)}>
                {category}
              </DropdownMenuItem>
            ))}

          </DropdownMenuContent>
        </DropdownMenu>

        {!isLoggedIn ?
          <a href='/login' className='text-white text-xl cursor-pointer mr-2 ml-2'>Login</a>
          :
          <>
            {roles && roles.includes("Owner") || roles.includes("Admin") &&
              <a href='/addEquipment' className='text-white text-xl cursor-pointer mr-2 ml-2'>Add equipment</a>
            }
            <DropdownMenu >
              <DropdownMenuTrigger className='text-white text-xl cursor-pointer pl-2 pr-2'>{user.username || ""}</DropdownMenuTrigger>
              <DropdownMenuContent>
                {roles && roles.includes("Admin") ?
                  <DropdownMenuItem onClick={() => navigate('/admin')} className='text-xl cursor-pointer'>Admin page</DropdownMenuItem>
                  :
                  <DropdownMenuItem onClick={() => openProfile(user.username)} className='text-xl cursor-pointer'>My profile</DropdownMenuItem>
                }

                <DropdownMenuItem className='text-xl cursor-pointer' onClick={logout}>Logout</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </>
        }
      </div>

    </div>
  )
}

export default Navbar
