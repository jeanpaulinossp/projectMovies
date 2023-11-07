import React, { FormEvent, useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

const Navbar: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: FormEvent) => {
    e.preventDefault();
    window.location.href = `/search?query=${searchQuery}`;
  };

  return (
    <nav className="bg-blue-900 h-14 flex items-center justify-between fixed top-0 w-full z-50">
      <Link
        to="/"
        className="text-white hover:text-gray-300 py-2 px-4 md:px-2 font-bold text-xl ml-2 sm:ml-28"
      >
        Home
      </Link>

      <form onSubmit={handleSearch} className="flex mr-5 sm:mr-28 ">
        <input
          type="text"
          placeholder="Pesquisar filmes..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="p-2 w-32 md:w-60 rounded-l focus:outline-none focus:ring focus:border-blue-500 flex-grow text-black"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white font-semibold px-4 py-2 rounded-r hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
        >
          <FontAwesomeIcon icon={faSearch} />
        </button>
      </form>
    </nav>
  );
};

export default Navbar;
