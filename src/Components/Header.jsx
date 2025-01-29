import React from "react";
import { useAppContext } from "../Contexts/AppContext";

function Header() {
  const { currentUser, logout } = useAppContext();
  return (
    <div className="w-full min-h-14 bg-white px-5 flex justify-between items-center shadow-lg font-bold fixed">
      <p className="text-xl pl-2">To Do</p>

      <div className="flex flex-row items-center space-x-2 ">
        <p className=" font-normal">{currentUser}</p>
        <button
          className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600"
          onClick={logout}
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default Header;
