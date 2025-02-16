import React from "react";

const Header = () => {
  return (
    <header className="bg-red-950 text-white py-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center px-4">
        <h1 className="text-xl font-bold">St. Joseph's College Alumni</h1>
        <nav>
          <ul className="flex space-x-4">
            <li><a href="#about" className="hover:text-gray-300">About</a></li>
            <li><a href="#events" className="hover:text-gray-300">Events</a></li>
            <li><a href="#contact" className="hover:text-gray-300">Contact</a></li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
