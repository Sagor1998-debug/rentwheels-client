import React from "react";

const Footer = () => {
  return (
    <footer className="bg-blue-600 text-white py-10 mt-20">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <h2 className="text-2xl font-bold mb-3">RentWheels</h2>
          <p>Your trusted car rental partner.</p>
        </div>

        <div>
          <h3 className="font-semibold mb-2">Quick Links</h3>
          <ul className="space-y-1">
            <li><a href="/" className="hover:underline">Home</a></li>
            <li><a href="/cars" className="hover:underline">Browse Cars</a></li>
            <li><a href="/add-car" className="hover:underline">Add Car</a></li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold mb-2">Contact</h3>
          <p>Email: support@rentwheels.com</p>
          <p>Phone: +880 1234-567890</p>
        </div>

        <div>
          <h3 className="font-semibold mb-2">Follow Us</h3>
          <div className="flex gap-4">
            <a href="#" className="hover:text-yellow-300">Facebook</a>
            <a href="#" className="hover:text-yellow-300">Instagram</a>
            <a href="#" className="hover:text-yellow-300">Twitter</a>
          </div>
        </div>
      </div>

      <p className="text-center mt-10 text-sm">
        © {new Date().getFullYear()} RentWheels. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
