import React, { useState } from "react";
import { Link } from "react-router-dom";

const Navbar: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleSearch = () => {
    // Redireciona para a página de pesquisa
    window.location.href = `/search?query=${searchQuery}`;
  };

  return (
    <nav className="bg-blue-900 p-4 h-1/6">
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <button className="text-white md:hidden" onClick={toggleMenu}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {menuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
        <div
          className={`${menuOpen ? "block" : "hidden"} md:flex md:items-center`}
        >
          <Link
            to="/"
            className="text-white hover:text-gray-300 py-2 px-4 md:px-2"
          >
            Home
          </Link>
          <div className="text-black">
            <input
              type="text"
              placeholder="Pesquisar filmes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button onClick={handleSearch}>Pesquisar</button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
