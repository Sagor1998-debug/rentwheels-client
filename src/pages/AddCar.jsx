import React, { useState } from "react";
import axiosInstance from "../api/axiosInstance";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";

const AddCar = () => {
  const { user } = useAuth();
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
    if (!user) return toast.error("You must be logged in.");

    const newCar = {
      ...carData,
      providerName: user.displayName,
      providerEmail: user.email,
      status: "Available",
    };

    try {
      setLoading(true);
      await axiosInstance.post("/cars", newCar);
      toast.success("Car added successfully!");
      setCarData({
        name: "",
        description: "",
        category: "Sedan",
        rentPrice: "",
        location: "",
        imageUrl: "",
      });
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Failed to add car.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-xl shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-blue-600">Add New Car</h2>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Car Name"
          value={carData.name}
          onChange={handleChange}
          className="w-full border px-4 py-2 rounded"
          required
        />
        <textarea
          name="description"
          placeholder="Description"
          value={carData.description}
          onChange={handleChange}
          className="w-full border px-4 py-2 rounded"
          required
        />
        <select
          name="category"
          value={carData.category}
          onChange={handleChange}
          className="w-full border px-4 py-2 rounded"
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
          placeholder="Rent Price per day"
          value={carData.rentPrice}
          onChange={handleChange}
          className="w-full border px-4 py-2 rounded"
          required
        />
        <input
          type="text"
          name="location"
          placeholder="Location"
          value={carData.location}
          onChange={handleChange}
          className="w-full border px-4 py-2 rounded"
          required
        />
        <input
          type="text"
          name="imageUrl"
          placeholder="Image URL"
          value={carData.imageUrl}
          onChange={handleChange}
          className="w-full border px-4 py-2 rounded"
          required
        />
        <input
          type="text"
          value={user.displayName}
          readOnly
          className="w-full border px-4 py-2 rounded bg-gray-100"
        />
        <input
          type="email"
          value={user.email}
          readOnly
          className="w-full border px-4 py-2 rounded bg-gray-100"
        />
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          {loading ? "Adding..." : "Add Car"}
        </button>
      </form>
    </div>
  );
};

export default AddCar;
