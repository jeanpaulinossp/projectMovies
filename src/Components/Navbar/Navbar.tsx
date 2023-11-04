import React, { useState } from "react";

const Navbar: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className="bg-blue-900 p-4">
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <div className="text-white text-2xl font-bold mr-4">Logo</div>
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
          <a
            href="#"
            className="text-white hover:text-gray-300 py-2 px-4 md:px-2"
          >
            Home
          </a>
          <a
            href="#"
            className="text-white hover:text-gray-300 py-2 px-4 md:px-2"
          >
            Filmes
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
