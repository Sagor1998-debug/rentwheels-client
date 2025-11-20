import React from "react";
import { motion } from "framer-motion";
import { Clock, DollarSign, ShieldCheck, Headphones } from "lucide-react";

const benefits = [
  { title: "Easy Booking", desc: "Book your car within minutes with simple steps.", icon: Clock, color: "from-blue-500 to-cyan-500" },
  { title: "Affordable Rates", desc: "Best prices for every car and category.", icon: DollarSign, color: "from-emerald-500 to-teal-500" },
  { title: "Trusted Providers", desc: "All cars listed by verified owners.", icon: ShieldCheck, color: "from-purple-500 to-pink-500" },
  { title: "24/7 Support", desc: "We are always here to help you.", icon: Headphones, color: "from-orange-500 to-red-500" },
];

const ExtraSection = () => {
  return (
    <section className="relative py-32 overflow-hidden min-h-screen flex items-center">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 via-purple-700 to-pink-600" />
      <div className="absolute inset-0 bg-black/40 backdrop-blur-3xl" />

      {/* Floating Orbs */}
      <div className="absolute top-20 left-20 w-96 h-96 bg-purple-400/30 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-20 right-20 w-80 h-80 bg-pink-400/30 rounded-full blur-3xl animate-pulse delay-700" />

      <div className="relative max-w-7xl mx-auto px-6 w-full">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl md:text-7xl font-bold text-white mb-4 tracking-tight">
            Why Rent With Us
          </h2>
          <p className="text-xl md:text-2xl text-white/90">Experience the future of car rental</p>
        </motion.div>

        {/* Full-Height Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
          {benefits.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15, duration: 0.7 }}
              whileHover={{ y: -16, scale: 1.06 }}
              className="group"
            >
              {/* Glass Card - Now Tall & Gorgeous */}
              <div className="h-full min-h-80 bg-white/12 backdrop-blur-2xl rounded-3xl p-10 border border-white/20 shadow-2xl hover:bg-white/20 transition-all duration-500 flex flex-col items-center text-center">
                {/* Icon */}
                <div className={`w-24 h-24 mb-8 rounded-3xl bg-gradient-to-br ${item.color} p-6 shadow-2xl group-hover:scale-110 transition-transform duration-300`}>
                  <item.icon className="w-full h-full text-white" strokeWidth={2.5} />
                </div>

                {/* Title & Description */}
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                  {item.title}
                </h3>
                <p className="text-white/80 text-lg leading-relaxed max-w-xs">
                  {item.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExtraSection;