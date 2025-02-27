"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useState } from "react";

const ContactSection = () => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const formSubmitURL = "https://formsubmit.co/1e91d88ec76cfa5fda70c4d11dced0cc"; // Replace with your FormSubmit endpoint

    const formPayload = new FormData();
    formPayload.append("name", formData.name);
    formPayload.append("email", formData.email);
    formPayload.append("message", formData.message);

    try {
      const response = await fetch(formSubmitURL, {
        method: "POST",
        body: formPayload,
      });

      if (response.ok) {
        setSubmitted(true);
        setFormData({ name: "", email: "", message: "" });
      } else {
        alert("Hiba történt az üzenet küldésekor.");
      }
    } catch (error) {
      console.error("Network error:", error);
      alert("Hálózati hiba. Próbáld újra később.");
    } finally {
      setIsLoading(false);
    }
  };

  const formSubmitURL = "https://formsubmit.co/1e91d88ec76cfa5fda70c4d11dced0cc"; // This is where the FormSubmit URL should be defined

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <div id="contact" className="p-10 bg-gray-100 text-black">
        <h2 className="text-3xl font-bold mb-6 text-center">Kapcsolat</h2>
        <form
          className="max-w-lg mx-auto"
          onSubmit={handleSubmit}
          action={formSubmitURL}  // Now the form can access this variable
          method="POST"
        >
          <div className="mb-4">
            <label className="block text-gray-700">Név</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded"
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
              className="w-full px-3 py-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Üzenet</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-gray-500 text-white py-2 rounded hover:bg-gray-600 hover:shadow-lg"
            disabled={isLoading}
          >
            {isLoading ? "Küldés..." : "Küldés"}
          </button>
        </form>

        {/* Success Message */}
        {submitted && <p className="text-green-600 text-center mt-4">Üzenet sikeresen elküldve!</p>}
      </div>
    </motion.div>
  );
};

export default ContactSection;
