import React from "react";
import { Input } from "@/components/ui/input";

const NavBar = ({ searchQuery, setSearchQuery }) => {
  return (
    <header className="w-full bg-white p-6 place-content-center shadow-md flex justify-between items-center">
      <div>
        <h1 className="text-purple-500 font-bold xs:text-lg md:text-3xl">
          EventCreator
        </h1>
      </div>

      {/* Search Box */}
      <div className="w-1/2">
        <Input
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)} // Update query
          className="w-3/4"
        />
      </div>
    </header>
  );
};

export default NavBar;
