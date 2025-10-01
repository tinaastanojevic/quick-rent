import React from "react";

function Search({ search, setSearch }) {
  return (
    <div className="flex justify-center w-full p-4">
      <input
        className="w-full max-w-md p-3 rounded-md 
                   bg-gray-100 text-foreground placeholder:text-muted-foreground 
                   border border-border caret-foreground 
                   shadow-sm hover:bg-gray-200 
                   focus:outline-none focus:ring-2 focus:ring-blue-500 
                   focus:shadow-md transition-all"
        type="text"
        value={search}
        placeholder="Search..."
        onChange={(e) => setSearch(e.target.value)}
      />
    </div>
  );
}

export default Search;
