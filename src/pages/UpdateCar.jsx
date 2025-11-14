import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosInstance from "../api/axiosInstance";
import toast from "react-hot-toast";

const UpdateCar = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [carData, setCarData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [imageFile, setImageFile] = useState(null);

  // Fetch single car by ID
  useEffect(() => {
    const fetchCar = async () => {
      try {
        setLoading(true);
        const res = await axiosInstance.get(`/cars/${id}`);
        setCarData(res.data);
      } catch (error) {
        console.error("Fetching car failed:", error);
        toast.error(error.response?.data?.message || "Failed to fetch car data.");
      } finally {
        setLoading(false);
      }
    };
    fetchCar();
  }, [id]);

  const handleChange = (e) => {
    setCarData({ ...carData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!carData) return;

    const formData = new FormData();
    formData.append("name", carData.name);
    formData.append("category", carData.category);
    formData.append("rentPrice", carData.rentPrice);
    formData.append("status", carData.status);
    if (imageFile) formData.append("image", imageFile);

    try {
      setUpdating(true);
      await axiosInstance.put(`/cars/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      toast.success("Car updated successfully!");
      navigate("/my-listings"); // go back to listings page
    } catch (error) {
      console.error("Updating car failed:", error);
      toast.error(error.response?.data?.message || "Failed to update car.");
    } finally {
      setUpdating(false);
    }
  };

  if (loading) return <p>Loading car data...</p>;
  if (!carData) return <p>Car not found.</p>;

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4 text-blue-600">Update Car</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1">Car Name</label>
          <input
            type="text"
            name="name"
            value={carData.name}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            required
          />
        </div>

        <div>
          <label className="block mb-1">Category</label>
          <input
            type="text"
            name="category"
            value={carData.category}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            required
          />
        </div>

        <div>
          <label className="block mb-1">Rent Price</label>
          <input
            type="number"
            name="rentPrice"
            value={carData.rentPrice}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            required
          />
        </div>

        <div>
          <label className="block mb-1">Status</label>
          <select
            name="status"
            value={carData.status}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
          >
            <option value="Available">Available</option>
            <option value="Booked">Booked</option>
          </select>
        </div>

        <div>
          <label className="block mb-1">Image (optional)</label>
          <input type="file" accept="image/*" onChange={handleImageChange} />
        </div>

        <div className="flex justify-end space-x-2 mt-4">
          <button
            type="button"
            onClick={() => navigate("/my-listings")}
            className="px-4 py-2 rounded border hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={updating}
            className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
          >
            {updating ? "Updating..." : "Update Car"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateCar;
