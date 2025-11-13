import React, { useEffect, useState } from "react";
import axiosInstance from "../api/axiosInstance";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";

const MyListings = () => {
  const { user } = useAuth();
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch cars posted by the logged-in user
  const fetchMyCars = async () => {
    if (!user) return; // wait until user is loaded
    try {
      setLoading(true);
      const res = await axiosInstance.get("/cars/my-listings"); // no email query needed
      setCars(res.data);
    } catch (error) {
      console.error("Fetching my listings failed:", error);
      toast.error(error.response?.data?.message || "Failed to fetch your listings.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      fetchMyCars(); // only fetch when user exists
    }
  }, [user]);

  // Delete car
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure to delete this car?")) return;
    try {
      await axiosInstance.delete(`/cars/${id}`);
      toast.success("Car deleted successfully!");
      setCars(cars.filter((car) => car._id !== id));
    } catch (error) {
      console.error("Deleting car failed:", error);
      toast.error(error.response?.data?.message || "Failed to delete car.");
    }
  };

  if (!user) {
    return <p className="text-center mt-6">Please login to see your listings.</p>;
  }

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4 text-blue-600">My Listings</h2>
      {loading ? (
        <p>Loading...</p>
      ) : cars.length === 0 ? (
        <p>No cars added yet.</p>
      ) : (
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border px-4 py-2">Name</th>
              <th className="border px-4 py-2">Category</th>
              <th className="border px-4 py-2">Rent Price</th>
              <th className="border px-4 py-2">Status</th>
              <th className="border px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {cars.map((car) => (
              <tr key={car._id}>
                <td className="border px-4 py-2">{car.name}</td>
                <td className="border px-4 py-2">{car.category}</td>
                <td className="border px-4 py-2">${car.rentPrice}</td>
                <td className="border px-4 py-2">{car.status}</td>
                <td className="border px-4 py-2 space-x-2">
                  <button
                    onClick={() => handleDelete(car._id)}
                    className="bg-red-600 text-white px-2 py-1 rounded hover:bg-red-700"
                  >
                    Delete
                  </button>
                  {/* You can add Update button here later */}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default MyListings;
