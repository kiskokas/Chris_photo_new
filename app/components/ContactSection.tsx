"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useState, useRef, useEffect } from "react";
import ReCAPTCHA from "react-google-recaptcha";

const ContactSection = () => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const recaptchaRef = useRef<ReCAPTCHA | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    let token;
    try {
      if (!recaptchaRef.current) throw new Error("reCAPTCHA is not available.");
      
      token = await recaptchaRef.current.executeAsync();
      recaptchaRef.current.reset(); // Reset after getting the token
    } catch (error) {
      console.error("reCAPTCHA Error:", error);
      alert("Failed to verify reCAPTCHA. Please refresh the page and try again.");
      setIsLoading(false);
      return;
    }

    if (!token) {
      alert("reCAPTCHA verification failed. Please try again.");
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, recaptchaToken: token }),
      });

      if (response.ok) {
        setSubmitted(true);
        setFormData({ name: "", email: "", message: "" });
      } else {
        const errorText = await response.text();
        console.error("Server Error:", errorText);
        alert(errorText || "Error sending message.");
      }
    } catch (error) {
      console.error("Network error:", error);
      alert("Network error. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  // Cleanup reCAPTCHA on component unmount to prevent timeout errors
  useEffect(() => {
    return () => recaptchaRef.current?.reset();
  }, []);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <div id="contact" className="p-10 bg-gray-100 text-black">
        <h2 className="text-3xl font-bold mb-6 text-center">Kapcsolat</h2>
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

          {/* reCAPTCHA Component */}
          <ReCAPTCHA
            sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!}
            size="invisible"
            ref={recaptchaRef}
          />

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
