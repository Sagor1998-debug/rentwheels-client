import React from "react";
import { Typewriter } from "react-simple-typewriter";
import { Link } from "react-router-dom";

const HeroBanner = () => {
  return (
    <div className="bg-blue-50 py-20 px-6 text-center rounded-b-3xl shadow-md">
      <h1 className="text-5xl font-bold mb-4 text-violet-700">
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
        className="bg-transparent hover:bg-orange-500 text-orange-700 font-semibold hover:text-white py-2 px-4 border border-orange-500 hover:border-transparent rounded"
      >
        Browse Cars
      </Link>
    </div>
  );
};

export default HeroBanner;
