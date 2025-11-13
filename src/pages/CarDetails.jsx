import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import axiosInstance from "../api/axiosInstance";
import toast from "react-hot-toast";
import Loader from "../components/Loader";
import { getAuth } from "firebase/auth";

const CarDetails = () => {
  const { id } = useParams(); // car ID from URL
  const { user } = useAuth();
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [bookingLoading, setBookingLoading] = useState(false);

  // Fetch car details
  useEffect(() => {
    const fetchCar = async () => {
      try {
        const response = await axiosInstance.get(`/cars/${id}`);
        setCar(response.data);
      } catch (error) {
        console.error(error);
        toast.error("Failed to load car details.");
      } finally {
        setLoading(false);
      }
    };
    fetchCar();
  }, [id]);

  // Handle booking
  const handleBooking = async () => {
    if (!user) {
      toast.error("You must be logged in to book a car!");
      return;
    }
    if (car.status === "unavailable") {
      toast.error("This car is already booked.");
      return;
    }

    try {
      setBookingLoading(true);

      // ✅ Get Firebase token
      const auth = getAuth();
      const currentUser = auth.currentUser;
      const token = await currentUser.getIdToken(true); // refresh if expired

      // ✅ Send booking request with Authorization header
      const response = await axiosInstance.post(
        "/bookings",
        {
          carId: car._id,
          startDate: new Date().toISOString(),
          endDate: new Date(new Date().getTime() + 24 * 60 * 60 * 1000).toISOString(), // example +1 day
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success(response.data?.message || "Booking successful!");

      // Update car status locally
      setCar({ ...car, status: "unavailable" });
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Booking failed. Try again.");
    } finally {
      setBookingLoading(false);
    }
  };

  if (loading) return <Loader />;

  if (!car) return <p className="text-center mt-20">Car not found.</p>;

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded shadow">
      <img
        src={car.imageUrl}
        alt={car.name}
        className="w-full h-80 object-cover rounded mb-6"
      />
      <h2 className="text-3xl font-bold mb-2">{car.name}</h2>
      <p className="mb-2">
        <strong>Category:</strong> {car.category}
      </p>
      <p className="mb-2">
        <strong>Rent Price:</strong> ${car.rentPrice}/day
      </p>
      <p className="mb-2">
        <strong>Location:</strong> {car.location}
      </p>
      <p className="mb-2">
        <strong>Status:</strong>{" "}
        <span
          className={`font-semibold ${
            car.status === "unavailable" ? "text-red-600" : "text-green-600"
          }`}
        >
          {car.status === "unavailable" ? "Booked" : "Available"}
        </span>
      </p>
      <p className="mb-4">
        <strong>Description:</strong> {car.description}
      </p>
      <div className="mb-4">
        <h3 className="font-semibold">Provider Info:</h3>
        <p>{car.providerName}</p>
        <p>{car.providerEmail}</p>
      </div>

      <button
        onClick={handleBooking}
        disabled={bookingLoading || car.status === "unavailable"}
        className={`w-full py-2 rounded text-white font-semibold ${
          car.status === "unavailable"
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-blue-600 hover:bg-blue-700"
        }`}
      >
        {bookingLoading
          ? "Booking..."
          : car.status === "unavailable"
          ? "Booked"
          : "Book Now"}
      </button>
    </div>
  );
};

export default CarDetails;
