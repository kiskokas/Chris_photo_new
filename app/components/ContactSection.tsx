"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useState } from "react";

const ContactSection = () => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    packageName: "", // Added photoStyle field
  });
  const [isLoading, setIsLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitted(true);
        setFormData({ name: "", email: "", message: "", packageName: "" }); // Reset photoStyle
      } else {
        const errorData = await response.json();
        alert(errorData.error || "Hiba történt az üzenet küldésekor.");
      }
    } catch (error) {
      console.error("Network error:", error);
      alert("Hálózati hiba. Próbáld újra később.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <div id="contact" className="p-10 bg-header-light dark:bg-header-dark text-black">
        <h2 className="text-3xl font-bold mb-6 text-center">Kapcsolat felvétel</h2>
        <form className="max-w-lg mx-auto" onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Név</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded focus:ring-2 focus:ring-gray-400 focus:outline-none"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded focus:ring-2 focus:ring-gray-400 focus:outline-none"
              required
            />
          </div>

          {/* Photo Style Dropdown */}
          <div className="mb-4">
            <label className="block text-gray-700">Csomag</label>
            <select
              name="packageName"
              value={formData.packageName}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded focus:ring-2 focus:ring-gray-400 focus:outline-none"
            >
              <option value="">Válassz csomagot</option>
              <option value="Mini">Mini csomag</option>
              <option value="Normal">Normál csomag</option>
              <option value="Premium">Prémium csomag</option>
              <option value="Ajandekutalvany">Ajándékutalvány</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Üzenet</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded focus:ring-2 focus:ring-gray-400 focus:outline-none"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-header-dark dark:bg-header-light text-header-light dark:text-header-dark py-2 rounded hover:bg-gray-600 hover:shadow-lg"
            disabled={isLoading}
          >
            {isLoading ? "Küldés..." : "Küldés"}
          </button>
        </form>

        {/* Success Message */}
        {submitted && <p className="text-green-600 dark:text-green-100 text-center mt-4">Üzenet sikeresen elküldve!</p>}
      </div>
    </motion.div>
  );
};

export default ContactSection;