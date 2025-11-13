import React from "react";
import { Typewriter } from "react-simple-typewriter";
import { Link } from "react-router-dom";

const HeroBanner = () => {
  return (
    <div className="bg-blue-50 py-20 px-6 text-center rounded-b-3xl shadow-md">
      <h1 className="text-5xl font-bold mb-4 text-blue-700">
        <Typewriter
          words={["Rent Wheels Easily!", "Affordable Cars for Everyone", "Drive Your Dreams"]}
          loop={0}
          cursor
          cursorStyle="_"
          typeSpeed={70}
          deleteSpeed={50}
          delaySpeed={1500}
        />
      </h1>
      <p className="text-gray-700 text-lg mb-6">
        Choose from a wide range of cars, book instantly, and drive safely!
      </p>
      <Link
        to="/cars"
        className="px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700 font-semibold"
      >
        Browse Cars
      </Link>
    </div>
  );
};

export default HeroBanner;
