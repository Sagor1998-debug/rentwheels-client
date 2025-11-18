import React, { useState } from "react";
import axiosInstance from "../api/axiosInstance";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const AddCar = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [carData, setCarData] = useState({
    name: "",
    description: "",
    category: "Sedan",
    rentPrice: "",
    location: "",
    imageUrl: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setCarData({ ...carData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      toast.error("You must be logged in.");
      return;
    }

    const newCar = {
      ...carData,
      providerName: user.displayName || user.email.split("@")[0],
      providerEmail: user.email,
      rentPrice: Number(carData.rentPrice), // ← Number এ কনভার্ট করা জরুরি
      status: "available", // ← ছোট হাতের "available"
    };

    try {
      setLoading(true);
      await axiosInstance.post("/cars", newCar);
      toast.success("Car added successfully!");
      navigate("/my-listings"); // সরাসরি My Listings এ নিয়ে যাক
    } catch (error) {
      console.error("Add car error:", error.response?.data);
      toast.error(error.response?.data?.message || "Failed to add car");
    } finally {
      setLoading(false);
    }
  };

  if (!user) return <p className="text-center text-red-600 text-2xl mt-20">Please login first</p>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12">
      <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-2xl p-8">
        <h2 className="text-4xl font-bold text-center text-indigo-700 mb-8">Add New Car</h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <input
            type="text"
            name="name"
            placeholder="Car Name (e.g. Toyota Corolla)"
            value={carData.name}
            onChange={handleChange}
            className="w-full px-5 py-4 border border-gray-300 rounded-lg text-lg focus:ring-4 focus:ring-indigo-300"
            required
          />
          <textarea
            name="description"
            placeholder="Short description"
            value={carData.description}
            onChange={handleChange}
            rows="3"
            className="w-full px-5 py-4 border border-gray-300 rounded-lg text-lg"
          />
          <select
            name="category"
            value={carData.category}
            onChange={handleChange}
            className="w-full px-5 py-4 border border-gray-300 rounded-lg text-lg"
          >
            <option>Sedan</option>
            <option>SUV</option>
            <option>Hatchback</option>
            <option>Luxury</option>
            <option>Electric</option>
          </select>
          <input
            type="number"
            name="rentPrice"
            placeholder="Rent Price per day (e.g. 80)"
            value={carData.rentPrice}
            onChange={handleChange}
            className="w-full px-5 py-4 border border-gray-300 rounded-lg text-lg"
            required
          />
          <input
            type="text"
            name="location"
            placeholder="Location (e.g. Dhaka)"
            value={carData.location}
            onChange={handleChange}
            className="w-full px-5 py-4 border border-gray-300 rounded-lg text-lg"
            required
          />
          <input
            type="text"
            name="imageUrl"
            placeholder="Image URL (use Unsplash or ImgBB)"
            value={carData.imageUrl}
            onChange={handleChange}
            className="w-full px-5 py-4 border border-gray-300 rounded-lg text-lg"
            required
          />

          <div className="bg-gray-100 p-4 rounded-lg">
            <p className="text-sm text-gray-600">Provider:</p>
            <p className="font-bold">{user.displayName || user.email}</p>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 text-white py-5 rounded-lg text-xl font-bold hover:bg-indigo-700 transition disabled:bg-gray-400"
          >
            {loading ? "Adding Car..." : "Add Car to Listing"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddCar;