import React, { useEffect, useState } from "react";
import HeroBanner from "../components/HeroBanner";
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-indigo-100 relative overflow-hidden">
      {/* Luxury Animated Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-purple-300 rounded-full mix-blend-multiply blur-3xl opacity-40 animate-blob"></div>
        <div className="absolute top-40 -right-40 w-80 h-80 bg-pink-300 rounded-full mix-blend-multiply blur-3xl opacity-40 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-40 left-1/2 w-96 h-96 bg-indigo-300 rounded-full mix-blend-multiply blur-3xl opacity-40 animate-blob animation-delay-4000"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 space-y-20 pb-20">
        <HeroBanner />

        {/* Search Bar */}
        <div className="max-w-7xl mx-auto px-6">
          <input
            type="text"
            placeholder="Search cars by name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-6 py-4 rounded-xl bg-white/80 backdrop-blur-md border border-gray-200 shadow-lg focus:outline-none focus:ring-4 focus:ring-purple-300 transition-all text-gray-800 placeholder-gray-500"
          />
        </div>

        {/* Featured Cars */}
        <section className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-gray-800 mb-8">Featured Cars</h2>
          {filteredCars.length === 0 ? (
            <p className="text-center text-gray-600 py-12 text-lg">No cars found.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
              {filteredCars.slice(0, 6).map((car) => (
                <CarCard key={car._id} car={car} />
              ))}
            </div>
          )}
        </section>

        {/* Top Rated Cars */}
        <section className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-gray-800 mb-8">Top Rated Cars</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {cars.slice(0, 3).map((car) => (
              <CarCard key={car._id} car={car} />
            ))}
          </div>
        </section>

        {/* Why Rent With Us */}
        <section className="relative bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 py-24 overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute top-20 left-20 w-96 h-96 bg-purple-500/30 rounded-full blur-3xl" />
            <div className="absolute bottom-20 right-20 w-96 h-96 bg-pink-500/30 rounded-full blur-3xl" />
          </div>

          <div className="relative max-w-7xl mx-auto px-6 text-center">
            <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">
              Why Rent With Us
            </h2>
            <p className="text-xl text-white/90 mb-16">
              Experience the future of car rental
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {/* Card 1 */}
              <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-10 border border-white/20 min-h-[300px] flex flex-col items-center justify-center hover:bg-white/20 transition-all duration-300">
                <div className="w-20 h-20 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-2xl p-5 mb-6 shadow-2xl">
                  <svg className="w-full h-full text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">Easy Booking</h3>
                <p className="text-white/80 text-lg">Book your car within minutes with simple steps.</p>
              </div>

              {/* Card 2 */}
              <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-10 border border-white/20 min-h-[300px] flex flex-col items-center justify-center hover:bg-white/20 transition-all duration-300">
                <div className="w-20 h-20 bg-gradient-to-br from-emerald-400 to-teal-600 rounded-2xl p-5 mb-6 shadow-2xl">
                  <svg className="w-full h-full text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">Affordable Rates</h3>
                <p className="text-white/80 text-lg">Best prices for every car and category.</p>
              </div>

              {/* Card 3 */}
              <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-10 border border-white/20 min-h-[300px] flex flex-col items-center justify-center hover:bg-white/20 transition-all duration-300">
                <div className="w-20 h-20 bg-gradient-to-br from-purple-400 to-pink-600 rounded-2xl p-5 mb-6 shadow-2xl">
                  <svg className="w-full h-full text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">Trusted Providers</h3>
                <p className="text-white/80 text-lg">All cars listed by verified owners.</p>
              </div>

              {/* Card 4 */}
              <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-10 border border-white/20 min-h-[300px] flex flex-col items-center justify-center hover:bg-white/20 transition-all duration-300">
                <div className="w-20 h-20 bg-gradient-to-br from-orange-400 to-red-600 rounded-2xl p-5 mb-6 shadow-2xl">
                  <svg className="w-full h-full text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">24/7 Support</h3>
                <p className="text-white/80 text-lg">We are always here to help you.</p>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/*  */}
      <style jsx>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob {
          animation: blob 15s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
};

export default Home;