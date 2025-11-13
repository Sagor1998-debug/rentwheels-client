import React, { useEffect, useState } from "react";
import HeroBanner from "../components/HeroBanner";
import ExtraSection from "../components/ExtraSection";
import CarCard from "../components/CarCard";
import axiosInstance from "../api/axiosInstance";
import Loader from "../components/Loader";
import toast from "react-hot-toast";

const Home = () => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const res = await axiosInstance.get("/cars");
        if (res.data && Array.isArray(res.data)) {
          // Sort by newest first
          const sortedCars = res.data.sort(
            (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
          );
          setCars(sortedCars);
        } else {
          toast.error("No car data found from the server.");
        }
      } catch (error) {
        console.error(error);
        toast.error("Failed to fetch cars from backend.");
      } finally {
        setLoading(false);
      }
    };

    fetchCars();
  }, []);

  const filteredCars = cars.filter((car) =>
    car.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <Loader />;

  return (
    <div className="space-y-16">
      {/* Hero Banner */}
      <HeroBanner />

      {/* Search Bar */}
      <div className="max-w-7xl mx-auto px-6">
        <input
          type="text"
          placeholder="Search cars by name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full border px-4 py-2 rounded shadow-md"
        />
      </div>

      {/* Featured Cars (Show only 6) */}
      <section className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-rose-950 mb-6">Featured Cars</h2>
        {filteredCars.length === 0 ? (
          <p className="text-gray-500">No cars found.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {filteredCars.slice(0, 6).map((car) => (
              <CarCard key={car._id} car={car} />
            ))}
          </div>
        )}
      </section>

      {/* Top Rated Cars (Show only 3) */}
      <section className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-red-900 mb-6">Top Rated Cars</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {cars.slice(0, 3).map((car) => (
            <CarCard key={car._id} car={car} />
          ))}
        </div>
      </section>

      {/* Customer Testimonials */}
      <section className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-amber-600 mb-6">Customer Testimonials</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ExtraSection
            title="John Doe"
            description="RentWheels made my trip so easy! Great service and smooth booking."
          />
        </div>
      </section>
    </div>
  );
};

export default Home;
