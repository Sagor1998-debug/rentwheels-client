import React from "react";
import { motion } from "framer-motion";

const benefits = [
  { title: "Easy Booking", desc: "Book your car  within minutes with simple steps." },
  { title: "Affordable Rates", desc: "Best prices for every car and category." },
  { title: "Trusted Providers", desc: "All cars listed by verified owners." },
  { title: "24/7 Support", desc: "We are always here to help you." },
];

const ExtraSection = () => {
  return (
    <div className="max-w-7xl mx-auto py-20 px-4 sm:px-6 lg:px-8">
      <h2 className="text-3xl font-bold text-center mb-10 text-lime-950">Why Rent With Us</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-90">
        {benefits.map((item, index) => (
          <motion.div
            key={index}
            className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition"
            whileHover={{ scale: 1.05 }}
          >
            <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
            <p className="text-gray-600 text-base leading-relaxed flex-grow">{item.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ExtraSection;
