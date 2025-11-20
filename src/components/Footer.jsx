import React from "react";

const Footer = () => {
  return (
    <footer className="bg-emerald-950 text-white py-10 mt-20">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <h2 className="text-2xl font-bold mb-3">RentWheels</h2>
          <p className="text-sm text-gray-300">Your trusted car rental partner.</p>
        </div>

        <div>
          <h3 className="font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2 text-gray-300">
            <li><a href="/" className="hover:text-yellow-300 transition">Home</a></li>
            <li><a href="/cars" className="hover:text-yellow-300 transition">Browse Cars</a></li>
            <li><a href="/add-car" className="hover:text-yellow-300 transition">Add Car</a></li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold mb-3">Contact</h3>
          <p className="text-gray-300 text-sm">Email: support@rentwheels.com</p>
          <p className="text-gray-300 text-sm mt-1">Phone: +880 1234-567890</p>
        </div>

        {/* FOLLOW US — NOW VERTICAL */}
        <div>
          <h3 className="font-semibold mb-4">Follow Us</h3>
          <div className="flex flex-col space-y-3">
            <a href="#" className="hover:text-yellow-300 transition flex items-center gap-2">
              <span>Facebook</span>
            </a>
            <a href="#" className="hover:text-yellow-300 transition flex items-center gap-2">
              <span>Instagram</span>
            </a>
            <a href="#" className="hover:text-yellow-300 transition flex items-center gap-2">
              <span>Twitter</span>
            </a>
          </div>
        </div>
      </div>

      <p className="text-center mt-10 text-sm text-gray-400">
        © {new Date().getFullYear()} RentWheels. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;