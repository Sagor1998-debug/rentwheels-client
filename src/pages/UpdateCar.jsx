import React, { useState, useEffect } from "react";
import axiosInstance from "../api/axiosInstance";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";
import { useParams, useNavigate } from "react-router-dom";

const UpdateCar = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  const [carData, setCarData] = useState({
    name: "",
    description: "",
    category: "Sedan",
    rentPrice: "",
    location: "",
    imageUrl: "",
  });

  // Fetch existing car data
  useEffect(() => {
    const fetchCar = async () => {
      try {
        const res = await axiosInstance.get(`/cars/${id}`);
        setCarData({
          name: res.data.name,
          description: res.data.description || "",
          category: res.data.category,
          rentPrice: res.data.rentPrice,
          location: res.data.location,
          imageUrl: res.data.imageUrl,
        });
      } catch (error) {
        toast.error("Failed to load car data");
        navigate("/my-listings");
      } finally {
        setFetching(false);
      }
    };
    fetchCar();
  }, [id, navigate]);

  const handleChange = (e) => {
    setCarData({ ...carData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) return toast.error("Login required");

    try {
      setLoading(true);
      await axiosInstance.put(`/cars/${id}`, {
        ...carData,
        rentPrice: Number(carData.rentPrice),
      });
      toast.success("Car updated successfully!");
      navigate("/my-listings");
    } catch (error) {
      toast.error("Failed to update car");
    } finally {
      setLoading(false);
    }
  };

  if (fetching) return <div className="text-center py-20 text-2xl">Loading car...</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100 py-12">
      <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-2xl p-8">
        <h2 className="text-4xl font-bold text-center text-purple-700 mb-8">Update Car</h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <input
            type="text"
            name="name"
            value={carData.name}
            onChange={handleChange}
            className="w-full px-5 py-4 border border-gray-300 rounded-lg text-lg"
            required
          />
          <textarea
            name="description"
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
            value={carData.rentPrice}
            onChange={handleChange}
            className="w-full px-5 py-4 border border-gray-300 rounded-lg text-lg"
            required
          />
          <input
            type="text"
            name="location"
            value={carData.location}
            onChange={handleChange}
            className="w-full px-5 py-4 border border-gray-300 rounded-lg text-lg"
            required
          />
          <input
            type="text"
            name="imageUrl"
            value={carData.imageUrl}
            onChange={handleChange}
            className="w-full px-5 py-4 border border-gray-300 rounded-lg text-lg"
            required
          />

          <div className="flex gap-4">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-green-600 text-white py-4 rounded-lg text-xl font-bold hover:bg-green-700 disabled:bg-gray-400"
            >
              {loading ? "Updating..." : "Update Car"}
            </button>
            <button
              type="button"
              onClick={() => navigate("/my-listings")}
              className="flex-1 bg-gray-600 text-white py-4 rounded-lg text-xl font-bold hover:bg-gray-700"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateCar;