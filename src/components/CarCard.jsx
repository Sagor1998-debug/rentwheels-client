import React from "react";
import { Link } from "react-router-dom";

const CarCard = ({ car }) => {
  return (
    <div className="bg-white shadow-md rounded-xl overflow-hidden hover:shadow-xl transition">
      <img
        src={car.imageUrl}
        alt={car.name}
        className="w-full h-48 object-cover"
      />
      <div className="p-4 space-y-2">
        <h3 className="text-xl font-semibold text-blue-600">{car.name}</h3>
        <p className="text-gray-600">{car.category}</p>
        <p className="text-gray-700 font-medium">${car.rentPrice} / day</p>
        <p className="text-gray-500 text-sm">Provider: {car.providerName}</p>
        <p>
          Status:{" "}
          <span
            className={`px-2 py-1 rounded-full text-white ${
              car.status === "Available" ? "bg-green-500" : "bg-red-500"
            }`}
          >
            {car.status}
          </span>
        </p>
        <Link
          to={`/cars/${car._id}`}
          className="inline-block mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default CarCard;
