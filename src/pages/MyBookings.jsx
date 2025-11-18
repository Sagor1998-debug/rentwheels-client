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
      const res = await axiosInstance.get("/bookings/my-bookings"); // query param লাগবে না, token থেকে নেবে
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

  const handleCancel = async (id) => {
    if (!window.confirm("Cancel this booking?")) return;
    try {
      await axiosInstance.delete(`/bookings/${id}`);
      setBookings(bookings.filter((b) => b._id !== id));
      toast.success("Booking cancelled successfully!");
    } catch (error) {
      toast.error("Failed to cancel booking");
    }
  };

  if (!user) return <p className="text-center text-red-600 text-2xl mt-20">Please login first</p>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-4xl font-bold text-center text-indigo-700 mb-12">My Bookings</h2>

        {loading ? (
          <div className="text-center text-2xl text-gray-600">Loading your bookings...</div>
        ) : bookings.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl shadow-lg">
            <p className="text-2xl text-gray-600">No bookings yet. Go book a car!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {bookings.map((booking) => (
              <div
                key={booking._id}
                className="bg-white rounded-2xl shadow-xl overflow-hidden transform hover:scale-105 transition duration-300"
              >
                <img
                  src={booking.imageUrl || "https://via.placeholder.com/400x250.png?text=No+Image"}
                  alt={booking.name}
                  className="w-full h-56 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-gray-800">{booking.name}</h3>
                  <p className="text-gray-600 mt-1">{booking.category}</p>
                  <p className="text-3xl font-bold text-green-600 mt-3">${booking.rentPrice}/day</p>

                  <div className="mt-4 flex justify-between items-center">
                    <span className="px-4 py-2 bg-green-100 text-green-800 rounded-full font-semibold">
                      {booking.status}
                    </span>
                    <span className="text-sm text-gray-500">by {booking.providerName}</span>
                  </div>

                  <button
                    onClick={() => handleCancel(booking._id)}
                    className="mt-6 w-full bg-red-600 text-white py-3 rounded-lg font-medium hover:bg-red-700 transition"
                  >
                    Cancel Booking
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyBookings;