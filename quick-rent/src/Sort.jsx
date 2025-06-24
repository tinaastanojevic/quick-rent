import React,{useState} from 'react'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useNavigate } from 'react-router-dom';

function Sort() {
    const [sortName,setSortName]=useState("Sort");
  const navigate = useNavigate();

    const sort = async (sortBy) => {
        console.log(sortBy);
        setSortName(sortBy);
        navigate(`/?sort=${sortBy}`);
    }


    return (
        <div className='p-2 mt-5 mr-10 border-1 border-[var(--primary)]  rounded-md bg-[var(--primary)] hover:bg-[var(--secondary)] outline:none self-end min-w-1/10'>
            <DropdownMenu>
                <DropdownMenuTrigger className='text-white w-full text-xl cursor-pointer pl-2 pr-2'>{sortName}</DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuItem className='text-xl cursor-pointer' onClick={() => sort("lowest to highest price")}>Lowest to highest price</DropdownMenuItem>
                 <DropdownMenuItem className='text-xl cursor-pointer' onClick={() => sort("highest to lowest price")}>Highest to lowest price</DropdownMenuItem>
                    <DropdownMenuItem className='text-xl cursor-pointer' onClick={() => sort("by date ascending")}>By date ascending</DropdownMenuItem>
                     <DropdownMenuItem className='text-xl cursor-pointer' onClick={() => sort("by date descending")}>By date descending </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    )
}

export default Sort