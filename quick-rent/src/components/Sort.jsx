import React, { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useNavigate } from "react-router-dom";

function Sort() {
  const [sortName, setSortName] = useState("Sort");
  const navigate = useNavigate();

  const sort = (sortBy) => {
    setSortName(sortBy);
    navigate(`/?sort=${sortBy}`);
  };

  return (
    <div 
    className="rounded-lg bg-blue-500 hover:bg-blue-600 self-end min-w-[10%] border-0 outline-none focus:ring-0">
      <DropdownMenu>
        <DropdownMenuTrigger className="text-white text-xl font-semibold  transition-colors w-full cursor-pointer p-2 border-none outline-none focus:outline-none focus:ring-0">
          {sortName}
        </DropdownMenuTrigger>
        <DropdownMenuContent className="bg-card shadow-md rounded-md ">
          <DropdownMenuItem
            className="text-foreground text-xl cursor-pointer hover:bg-muted/20"
            onClick={() => sort("lowest to highest price")}
          >
            Lowest to highest price
          </DropdownMenuItem>
          <DropdownMenuItem
            className="text-foreground text-xl cursor-pointer hover:bg-muted/20"
            onClick={() => sort("highest to lowest price")}
          >
            Highest to lowest price
          </DropdownMenuItem>
          <DropdownMenuItem
            className="text-foreground text-xl cursor-pointer hover:bg-muted/20"
            onClick={() => sort("by date ascending")}
          >
            By date ascending
          </DropdownMenuItem>
          <DropdownMenuItem
            className="text-foreground text-xl cursor-pointer hover:bg-muted/20"
            onClick={() => sort("by date descending")}
          >
            By date descending
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

export default Sort;
