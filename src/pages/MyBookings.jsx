import React, { useEffect, useState } from "react";
import axiosInstance from "../api/axiosInstance";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";

const MyBookings = () => {
  const { user } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBookings = async () => {
    if (!user) return;
    try {
      setLoading(true);
      const res = await axiosInstance.get(`/bookings/my-bookings?email=${user.email}`);
      setBookings(res.data);
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Failed to fetch bookings.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, [user]);

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4 text-blue-600">My Bookings</h2>
      {loading ? (
        <p>Loading...</p>
      ) : bookings.length === 0 ? (
        <p>No bookings yet.</p>
      ) : (
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border px-4 py-2">Car Name</th>
              <th className="border px-4 py-2">Category</th>
              <th className="border px-4 py-2">Rent Price</th>
              <th className="border px-4 py-2">Status</th>
              <th className="border px-4 py-2">Provider</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking) => (
              <tr key={booking._id}>
                <td className="border px-4 py-2">{booking.name}</td>
                <td className="border px-4 py-2">{booking.category}</td>
                <td className="border px-4 py-2">${booking.rentPrice}</td>
                <td className="border px-4 py-2">{booking.status}</td>
                <td className="border px-4 py-2">{booking.providerName}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default MyBookings;
