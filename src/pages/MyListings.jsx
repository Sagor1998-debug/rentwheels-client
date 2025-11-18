import React, { useEffect, useState, useCallback } from "react";
import axiosInstance from "../api/axiosInstance";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const MyListings = () => {
  const { user } = useAuth();
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchMyCars = useCallback(async () => {
    if (!user?.email) return;
    try {
      setLoading(true);
      const res = await axiosInstance.get("/cars/my-listings");
      setCars(res.data);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to fetch your listings.");
    } finally {
      setLoading(false);
    }
  }, [user?.email]);

  useEffect(() => {
    fetchMyCars();
  }, [fetchMyCars]);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this car?")) return;
    try {
      await axiosInstance.delete(`/cars/${id}`);
      toast.success("Car deleted successfully!");
      setCars((prev) => prev.filter((car) => car._id !== id));
    } catch (error) {
      toast.error("Failed to delete car.");
    }
  };

  if (!user) return <p className="text-center text-red-600 text-2xl mt-20">Please login first</p>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100 py-12">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-4xl font-bold text-center text-purple-700 mb-12">My Listings</h2>

        {loading ? (
          <div className="text-center text-2xl text-gray-600">Loading your cars...</div>
        ) : cars.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl shadow-lg">
            <p className="text-2xl text-gray-600">You haven't listed any car yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {cars.map((car) => (
              <div
                key={car._id}
                className="bg-white rounded-2xl shadow-xl overflow-hidden transform hover:scale-105 transition duration-300"
              >
                <img
                  src={car.imageUrl}
                  alt={car.name}
                  className="w-full h-56 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-gray-800">{car.name}</h3>
                  <p className="text-gray-600 mt-1">{car.category} • {car.location}</p>
                  <p className="text-3xl font-bold text-purple-600 mt-3">${car.rentPrice}/day</p>

                  <div className="mt-4 flex justify-between items-center">
                    <span
                      className={`px-4 py-2 rounded-full font-semibold ${
                        car.status === "available"
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {car.status}
                    </span>
                  </div>

                  <div className="mt-6 flex gap-3">
                    <button
                      onClick={() => navigate(`/update-car/${car._id}`)}
                      className="flex-1 bg-yellow-500 text-white py-2 rounded-lg font-medium hover:bg-yellow-600 transition"
                    >
                      Update
                    </button>
                    <button
                      onClick={() => handleDelete(car._id)}
                      className="flex-1 bg-red-600 text-white py-2 rounded-lg font-medium hover:bg-red-700 transition"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyListings;