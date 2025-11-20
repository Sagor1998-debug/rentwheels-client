import React from "react";
import { Typewriter } from "react-simple-typewriter";
import { Link } from "react-router-dom";

const HeroBanner = () => {
  return (
    <div className="bg-gradient-to-br from-purple-200 via-pink-200 to-orange-50 py-20 px-6 text-center rounded-b-3xl shadow-md text-purple-700">
      <h1 className="text-5xl md:text-6xl font-bold mb-4">
        <Typewriter
          words={[
            "Rent Wheels Easily!",
            "Affordable Cars for Everyone",
            "Drive Your Dreams"
          ]}
          loop={0}
          cursor
          cursorStyle="_"
          typeSpeed={70}
          deleteSpeed={50}
          delaySpeed={1500}
        />
      </h1>

      <p className="text-yellow-900 text-lg md:text-xl mb-8 max-w-2xl mx-auto">
        Choose from a wide range of cars, book instantly, and drive safely!
      </p>

      <Link
        to="/cars"
        className="inline-block bg-white text-blue-700 font-semibold hover:bg-gray-100 py-3 px-8 rounded-full transition duration-300 shadow-lg"
      >
        Browse Cars
      </Link>
    </div>
  );
};

export default HeroBanner;