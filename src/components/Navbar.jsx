import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import CarRentWheelsLogo from '../assets/car-rent-logo.jpeg';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  
  const [menuOpen, setMenuOpen] = useState(false); 

  
  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };
  

  // Custom class for inactive NavLink style
  const inactiveLinkStyle = "text-white hover:text-[#ffae00] transition duration-150";

  return (
    
    <nav className="bg-emerald-800 px-4 md:px-12 py-4 flex justify-between items-center h-20 relative"> 
      
      {/* 1. Logo Section */}
      <Link to="/" className="flex items-center space-x-2">
        
        {/* Imported Image */}
        <img 
          src={CarRentWheelsLogo} 
          alt="Car Rent Wheels Logo" 
          className="h-8 w-auto" 
        />
        
        {/* Text Logo */}
        <span className="text-3xl font-bold text-bg-stone-600">
          CarRentWheels
        </span>
      </Link>

      {/* 2. Desktop Navigation Container (Hidden on small, visible on md+) */}
      <div className="hidden md:flex items-center space-x-8"> 

        {/* Primary Navigation Links (Using the links from your original 'RentWheels' code) */}
        <div className="flex items-center space-x-6 text-sm">
          {/* Note: I am keeping YOUR original links but styling them like the GameHub image */}
          <NavLink 
            to="/" 
            className={({ isActive }) => 
              // Style active link with the gold color
              `text-[#ffae00] ${isActive ? 'font-bold' : 'font-normal'}`
            }
          >
            Home
          </NavLink>
          <NavLink 
            to="/add-car" 
            className={inactiveLinkStyle}
          >
            Add Car
          </NavLink>
          <NavLink 
            to="/my-listings" 
            className={inactiveLinkStyle}
          >
            My Listings
          </NavLink>
          <NavLink 
            to="/my-bookings" 
            className={inactiveLinkStyle}
          >
            My Bookings
          </NavLink>
          <NavLink 
            to="/cars" 
            className={inactiveLinkStyle}
          >
            Browse Cars
          </NavLink>
        </div>
        
        {/*  */}
        {user ? (
          
          <div className="relative">
            <img
              
              src={user.photoURL || 'default-avatar.png'} 
              alt={user.displayName}
              className="w-10 h-10 rounded-full cursor-pointer ring-2 ring-[#ffae00]" 
              onClick={() => setDropdownOpen(!dropdownOpen)} 
            />
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white shadow-xl rounded-md py-2 z-10">
                <p className="px-4 py-1 font-semibold">{user.displayName}</p>
                <p className="px-4 py-1 text-sm text-gray-600 truncate">{user.email}</p>
                <button
                  onClick={handleLogout} 
                  className="w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100"
                >
                  Log Out
                </button>
              </div>
            )}
          </div>
        ) : (
          
          <div className="flex space-x-2">
            {/* Login Button (Bright Yellow) */}
            <NavLink
              to="/login" // ORIGINAL ROUTE PRESERVED
              className="px-6 py-3 bg-[#ffae00] text-black font-semibold rounded shadow-lg hover:bg-[#e69c00] transition duration-150"
            >
              Login
            </NavLink>
            
            {/* Register Button (Dark Gray/Black - Assuming you need a Register link) */}
             <NavLink
              to="/register" // Assuming a /register route for the second button
              className="px-6 py-3 bg-[#333333] text-white font-semibold rounded shadow-lg hover:bg-[#222222] transition duration-150"
            >
              Register
            </NavLink>
          </div>
        )}
      </div>

      {/* 3. Mobile Menu Button (Visible only on small screens) */}
      <div className="md:hidden flex items-center">
        <button
          onClick={() => setMenuOpen(!menuOpen)} 
          className="text-white hover:text-[#ffae00] focus:outline-none"
        >
            {/* Close Icon */}
            {menuOpen ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
            ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path></svg>
            )}
        </button>
      </div>

      {/* 4. Mobile Menu Content (Toggled) */}
      <div 
        className={`absolute top-20 left-0 w-full bg-[#4d4d4d] flex flex-col items-center py-4 md:hidden z-20 transition-all duration-300 ease-in-out ${
          menuOpen ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0 pointer-events-none'
        }`}
        onClick={() => setMenuOpen(false)} 
      >
        {/* Navigation Links  */}
        <NavLink 
          to="/" 
          className={({ isActive }) => 
            `text-lg py-2 ${isActive ? 'text-[#ffae00] font-bold' : inactiveLinkStyle}`
          }
        >
          Home
        </NavLink>
        <NavLink 
          to="/add-car" 
          className={`text-lg py-2 ${inactiveLinkStyle}`}
        >
          Add Car
        </NavLink>
        <NavLink 
          to="/my-listings" 
          className={`text-lg py-2 ${inactiveLinkStyle}`}
        >
          My Listings
        </NavLink>
        <NavLink 
          to="/my-bookings" 
          className={`text-lg py-2 ${inactiveLinkStyle}`}
        >
          My Bookings
        </NavLink>
        <NavLink 
          to="/cars" 
          className={`text-lg py-2 ${inactiveLinkStyle}`}
        >
          Browse Cars
        </NavLink>

        {/* Conditional Login / Profile Buttons/ */}
        <div className="flex flex-col space-y-3 mt-4 w-1/2">
            {user ? (
                <div className="flex flex-col items-center">
                    <p className="text-white mb-2">{user.displayName}</p>
                    <button
                        onClick={handleLogout} 
                        className="w-full text-center px-6 py-2 bg-red-600 text-white font-semibold rounded hover:bg-red-700 transition duration-150"
                    >
                        Log Out
                    </button>
                </div>
            ) : (
                <>
                    <NavLink
                        to="/login" 
                        className="w-full text-center px-6 py-3 bg-[#ffae00] text-black font-semibold rounded shadow-lg hover:bg-[#e69c00] transition duration-150"
                    >
                        Login
                    </NavLink>
                    <NavLink
                        to="/register"
                        className="w-full text-center px-6 py-3 bg-[#333333] text-white font-semibold rounded shadow-lg hover:bg-[#222222] transition duration-150"
                    >
                        Register
                    </NavLink>
                </>
            )}
        </div>

      </div>
    </nav>
  );
};

export default Navbar;