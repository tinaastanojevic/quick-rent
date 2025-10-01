import React, { useContext, useState, useEffect } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { getAllCategories } from "../services/EquipmentService";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const { isLoggedIn, logout, user, roles } = useContext(AuthContext);
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const data = await getAllCategories();
      setCategories(data);
    };
    fetchData();
  }, []);

  const selectCategory = (category) => {
    navigate(`/category/${category}`);
  };

  const openProfile = (username) => {
    navigate(`/profile/${username}`);
  };

  return (
    <div className="flex items-center justify-between bg-gray-100 p-4 gap-4 border-b border-border shadow-sm">
      <div className="flex items-center gap-4">
        <a
          href="/"
          className="text-foreground text-2xl font-bold cursor-pointer"
        >
          <img
            src="src/assets/rent-logo-transparent.png"
            alt="Quick-Rent Logo"
            className="h-10 w-auto"
          />
        </a>
      </div>

      <div className="flex items-center gap-4">
        {!isLoggedIn ? (
          <a href="/login" className="text-foreground text-xl cursor-pointer">
            Login
          </a>
        ) : (
          <>
            {roles && (roles.includes("Owner") || roles.includes("Admin")) && (
              <a
                href="/addEquipment"
                className="flex items-center gap-1 bg-blue-500 hover:bg-blue-600 text-white text-xl font-semibold py-2 px-4 rounded-lg shadow transition-all"
              >
                <span className="text-xl font-bold">+</span>
                Publish Equipment
              </a>
            )}

            <DropdownMenu>
              <DropdownMenuTrigger className="text-foreground text-xl cursor-pointer pl-3 pr-3 border-none outline-none focus:outline-none focus:ring-0">
                Categories
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-card text-card-foreground shadow-lg rounded-md min-w-[150px]">
                {categories.map((category, index) => (
                  <DropdownMenuItem
                    key={index}
                    className="focus:outline-none text-xl cursor-pointer"
                    onClick={() => selectCategory(category)}
                  >
                    {category}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger
                className="flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-full 
             bg-blue-500 text-white font-bold text-xl cursor-pointer 
             border-2 border-border shadow hover:bg-blue-600 hover:shadow-md transition-all outline-none focus:outline-none focus:ring-0"
              >
                {user.username ? user.username.charAt(0).toUpperCase() : ""}
              </DropdownMenuTrigger>

              <DropdownMenuContent className="bg-card text-card-foreground shadow-lg rounded-md min-w-[150px]">
                {roles && roles.includes("Admin") ? (
                  <DropdownMenuItem
                    onClick={() => navigate("/admin")}
                    className="text-xl cursor-pointer"
                  >
                    Admin page
                  </DropdownMenuItem>
                ) : (
                  <DropdownMenuItem
                    onClick={() => openProfile(user.username)}
                    className="text-xl cursor-pointer"
                  >
                    My profile
                  </DropdownMenuItem>
                )}
                <DropdownMenuItem
                  className="text-xl cursor-pointer"
                  onClick={logout}
                >
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </>
        )}
      </div>
    </div>
  );
}

export default Navbar;
