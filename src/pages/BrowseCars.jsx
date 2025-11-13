import React, { useEffect, useState } from "react";
import axiosInstance from "../api/axiosInstance";
import Loader from "../components/Loader";
import CarCard from "../components/CarCard";
import toast from "react-hot-toast";

const BrowseCars = () => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCars = async () => {
    try {
      const res = await axiosInstance.get("/cars");
      setCars(res.data);
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch cars.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCars();
  }, []);

  if (loading) return <Loader />;

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      <h2 className="text-2xl font-bold text-blue-600">Browse Cars</h2>
      {cars.length === 0 ? (
        <p className="text-gray-500">No cars available.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {cars.map((car) => (
            <CarCard key={car._id} car={car} />
          ))}
        </div>
      )}
    </div>
  );
};

export default BrowseCars;
